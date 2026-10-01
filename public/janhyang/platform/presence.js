// 현장 판정: GPS 정확도를 반영한 진입·이탈, 체류 시간, 방문 횟수, 위치 조작 의심, QR 체크인.
const Presence = {
  KEY: "janhyang-presence",
  SESSION_GAP: 45,
  VISIT_MIN: 15,
  dwell: {},
  away: {},
  visits: {},
  held: {},
  confirm: {},
  checkins: {},
  trust: { ok: true, until: 0, reason: "" },
  lastFix: null,
  jitter: { n: 0, e: 0, t: 0 },

  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      if (d.visits && typeof d.visits === "object") this.visits = d.visits;
      if (d.checkins && typeof d.checkins === "object") this.checkins = d.checkins;
    } catch (e) {}
  },
  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify({ visits: this.visits, checkins: this.checkins })); } catch (e) {}
  },
  accuracy() {
    if (LocationSource.kind === "gps") return state.gpsAcc || 0;
    return Context.override.accuracy || 0;
  },
  trusted() {
    if (!this.trust.ok && Date.now() > this.trust.until) this.trust = { ok: true, until: 0, reason: "" };
    return this.trust.ok;
  },
  checkedIn(pinId) {
    return (this.checkins[pinId] || 0) > Date.now();
  },
  inside(pin, d) {
    if (!this.trusted()) return false;
    if (this.checkedIn(pin.id)) return true;
    if (!isFinite(d)) return false;
    const acc = this.accuracy();
    if (!acc || pin.id !== state.pinId) return d <= pin.radius;
    return !!this.held[pin.id];
  },
  // 오차가 크면 반경 안에서 몇 초 연속 확인한 뒤에 열고, 반경 + 여유를 벗어나야 닫는다.
  settle(pin, d, real) {
    const acc = this.accuracy();
    if (!acc) { this.held[pin.id] = d <= pin.radius; return; }
    if (this.held[pin.id]) {
      if (d > pin.radius + Math.min(25, acc * 0.6)) {
        this.held[pin.id] = false;
        this.confirm[pin.id] = 0;
      }
      return;
    }
    if (d > pin.radius) { this.confirm[pin.id] = 0; return; }
    const need = acc >= pin.radius * 0.5 ? 6 : 2;
    this.confirm[pin.id] = (this.confirm[pin.id] || 0) + real;
    if (this.confirm[pin.id] >= need) this.held[pin.id] = true;
  },
  confirming(pin) {
    const acc = this.accuracy();
    if (!acc || this.held[pin.id]) return 0;
    return this.confirm[pin.id] || 0;
  },
  tick(real, scaled) {
    const pin = currentPin();
    if (LocationSource.kind !== "gps" && Context.override.accuracy) {
      this.jitter.t += real;
      if (this.jitter.t >= 1) {
        this.jitter.t = 0;
        const r = Context.override.accuracy * 0.7 * Math.sqrt(Math.random());
        const a = Math.random() * Math.PI * 2;
        this.jitter.n = Math.cos(a) * r;
        this.jitter.e = Math.sin(a) * r;
      }
    } else {
      this.jitter.n = 0;
      this.jitter.e = 0;
    }
    const d = distanceToPin(pin);
    const before = !!this.held[pin.id];
    this.settle(pin, d, real);
    if (before !== !!this.held[pin.id] && this.accuracy()) LocationSource.onDistance(d, pin);
    const inNow = inside(pin);
    if (inNow) {
      this.dwell[pin.id] = (this.dwell[pin.id] || 0) + scaled;
      this.away[pin.id] = 0;
    }
    Object.keys(this.dwell).forEach((id) => {
      if (id === pin.id && inNow) return;
      this.away[id] = (this.away[id] || 0) + real;
      if (this.away[id] > this.SESSION_GAP) this.closeSession(id);
    });
  },
  closeSession(id) {
    const sec = this.dwell[id] || 0;
    delete this.dwell[id];
    delete this.away[id];
    if (sec < this.VISIT_MIN) return;
    this.recordVisit(id, sec);
  },
  recordVisit(id, sec) {
    const list = this.visits[id] || [];
    list.push({ at: new Date().toISOString(), dwell: Math.round(sec), ctx: Context.snapshot(pinById(id)) });
    this.visits[id] = list.slice(-20);
    this.save();
    Metrics.log("dwell", id, { sec: Math.round(sec) });
    if (this.visits[id].length >= 2) Metrics.log("revisit", id);
  },
  dwellOf(id) { return this.dwell[id] || 0; },
  visitCount(id) {
    return (this.visits[id] || []).length + ((this.dwell[id] || 0) >= this.VISIT_MIN ? 1 : 0);
  },
  lastVisit(id) {
    const list = this.visits[id] || [];
    return list[list.length - 1] || null;
  },
  // 실제 GPS 좌표가 들어올 때마다 이동 속도로 조작 여부를 가늠한다.
  observeFix(fix) {
    const prev = this.lastFix;
    this.lastFix = fix;
    if (!prev) return true;
    const dt = Math.max(0.001, (fix.t - prev.t) / 1000);
    const dist = haversine(prev, fix);
    if (dist > 300 && dist / dt > 60) {
      this.trust = { ok: false, until: Date.now() + 60000, reason: "비정상 이동 감지 · 1분간 현장 잠금 유지" };
      Metrics.log("spoof", state.pinId, { meters: Math.round(dist), sec: Math.round(dt) });
      return false;
    }
    return true;
  },
  checkin(pinId, code) {
    const policy = Safety.policy(pinById(pinId));
    if (!policy.checkin_code || String(code || "").trim().toUpperCase() !== policy.checkin_code) return false;
    this.checkins[pinId] = Date.now() + 10 * 60 * 1000;
    this.save();
    Metrics.log("checkin", pinId);
    return true;
  },
  addPastVisit(id) {
    const list = this.visits[id] || [];
    list.push({ at: new Date(Date.now() - 86400000 * (list.length + 1)).toISOString(), dwell: 120, ctx: Context.snapshot(pinById(id)), rehearsal: true });
    this.visits[id] = list.slice(-20);
    this.save();
  },
  reset() {
    this.dwell = {};
    this.away = {};
    this.visits = {};
    this.held = {};
    this.confirm = {};
    this.checkins = {};
    this.save();
  }
};
