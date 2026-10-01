// 거리에 따라 바뀌는 화면: 멀리 → 다가가는 중 → 도착 → 머무는 중 → 떠남.
// 도착 의식, 시트 높이(살짝/절반/전체), 나침반, 체류 링, 다가가면 들리는 소리, 진동·효과음 어휘.

// 받침에 맞는 조사: josa("그늘 벤치", "을", "를") → "그늘 벤치를"
function josa(word, withFinal, withoutFinal) {
  const w = String(word || "");
  const code = w.charCodeAt(w.length - 1) - 0xac00;
  const final = code >= 0 && code <= 11171 && code % 28 !== 0;
  return w + (final ? withFinal : withoutFinal);
}

const Haptics = {
  PATTERNS: {
    tick: [6],
    approach: [10],
    arrive: [18, 60, 30, 60, 60],
    unlock: [12, 40, 12],
    leave: [40],
    left: [30, 90, 30],
    right: [30, 90, 30, 90, 30]
  },
  play(name) {
    if (Stage.mute || !navigator.vibrate) return;
    // 브라우저는 첫 터치 전에는 진동을 막는다.
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
    try { navigator.vibrate(this.PATTERNS[name] || [10]); } catch (e) {}
  }
};

// 앱의 시그니처 사운드. 도착은 위로 열리는 두 음, 떠남은 내려가는 두 음.
const Earcon = {
  NOTES: { arrive: [523.25, 783.99], unlock: [880, 1174.66], leave: [659.25, 440] },
  play(name) {
    if (Stage.mute) return;
    const ctx = audio.ctx;
    const notes = this.NOTES[name];
    if (!ctx || ctx.state !== "running" || !notes) return;
    notes.forEach((f, i) => {
      try {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        const t = ctx.currentTime + i * 0.16;
        o.type = "sine";
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.06 * Safety.duck(), t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        o.connect(g);
        g.connect(audio.master || ctx.destination);
        o.start(t);
        o.stop(t + 0.75);
      } catch (e) {}
    });
  }
};

const Stage = {
  KEY: "janhyang-stage",
  DETENTS: ["peek", "half", "full"],
  mute: false,
  approachOn: true,
  was: null,
  wasPin: "",
  detent: "peek",
  manualAt: 0,
  dragY: null,
  dragged: false,
  trail: [],
  amb: null,
  guideT: 0,
  arriveT: 0,
  leaveT: 0,

  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      if (d.approach === false) this.approachOn = false;
    } catch (e) {}
  },
  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify({ approach: this.approachOn })); } catch (e) {}
  },
  reduced() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  },
  announce(text) {
    if (this.mute) return;
    const el = document.getElementById("announce");
    if (el) el.textContent = text;
  },
  stageOf(pin, insideNow, band) {
    if (insideNow) return Presence.dwellOf(pin.id) >= 60 ? "stay" : "arrive";
    return band === "edge" ? "near" : "far";
  },
  update(pin, insideNow, band) {
    if (this.wasPin !== pin.id) {
      this.wasPin = pin.id;
      this.was = insideNow;
      this.trail = [];
      this.stopAmbience();
    } else if (this.was === false && insideNow) this.arrive(pin);
    else if (this.was === true && !insideNow) this.leave(pin);
    this.was = insideNow;
    const st = this.stageOf(pin, insideNow, band);
    const root = document.querySelector(".stage");
    if (root && root.dataset.stage !== st) root.dataset.stage = st;
    this.autoDetent(st);
    this.paintCompass(pin, insideNow);
    this.paintRing(pin, insideNow);
  },
  arrive(pin) {
    if (this.mute) return;
    Haptics.play("arrive");
    Earcon.play("arrive");
    this.stopAmbience();
    this.announce(pin.alias + "에 도착했어요");
    const el = document.getElementById("arrival");
    const root = document.querySelector(".stage");
    if (!el) return;
    document.getElementById("arrival-alias").textContent = pin.alias;
    document.getElementById("arrival-sub").textContent = (pin.zone ? pin.zone + " · " : "") + Context.label(pin);
    el.hidden = false;
    el.classList.remove("go");
    void el.offsetWidth;
    el.classList.add("go");
    if (root) root.classList.add("arrived");
    clearTimeout(this.arriveT);
    this.arriveT = setTimeout(() => this.endArrival(), this.reduced() ? 1600 : 2800);
    this.setDetent("half", false);
  },
  endArrival() {
    const el = document.getElementById("arrival");
    const root = document.querySelector(".stage");
    if (el) { el.hidden = true; el.classList.remove("go"); }
    if (root) root.classList.remove("arrived");
  },
  // 떠날 때는 이름이 4초 동안 옅어지며 잔향으로 남는다 (본편의 4초 페이드와 같은 길이).
  leave(pin) {
    if (this.mute) return;
    Haptics.play("leave");
    Earcon.play("leave");
    this.endArrival();
    this.announce(josa(pin.alias, "을", "를") + " 떠났어요. 잔향만 남아요");
    const el = document.getElementById("leaving");
    if (!el) return;
    el.textContent = pin.alias;
    el.hidden = false;
    el.classList.remove("go");
    void el.offsetWidth;
    el.classList.add("go");
    clearTimeout(this.leaveT);
    this.leaveT = setTimeout(() => { el.hidden = true; el.classList.remove("go"); }, 4000);
  },
  // 방문이 기록되면 잔향 문장이 서랍 탭으로 날아 들어간다.
  fly(pin) {
    if (this.mute) return;
    const tab = document.querySelector('#tabs [data-tab="keeps"]');
    const from = document.getElementById("action");
    if (!tab || !from) return;
    tab.classList.add("has-new");
    if (this.reduced() || !from.animate) return;
    const a = from.getBoundingClientRect();
    const b = tab.getBoundingClientRect();
    const chip = document.createElement("div");
    chip.className = "fly";
    chip.textContent = workOf(pin).afterglow;
    chip.style.left = a.left + "px";
    chip.style.top = a.top + "px";
    document.body.appendChild(chip);
    const dx = b.left + b.width / 2 - a.left - 40;
    const dy = b.top - a.top;
    chip.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: "translate(" + dx * 0.4 + "px," + (dy * 0.2 - 60) + "px) scale(.9)", opacity: 1, offset: 0.4 },
      { transform: "translate(" + dx + "px," + dy + "px) scale(.2)", opacity: 0 }
    ], { duration: 1100, easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = () => chip.remove();
  },
  setDetent(d, manual) {
    if (this.DETENTS.indexOf(d) === -1) return;
    this.detent = d;
    if (manual) this.manualAt = performance.now();
    const dock = document.getElementById("dock");
    if (dock && dock.dataset.detent !== d) dock.dataset.detent = d;
    const grip = document.getElementById("grip");
    if (grip) grip.setAttribute("aria-expanded", d === "peek" ? "false" : "true");
  },
  // 멀리서는 한 줄, 다가가거나 도착하면 절반. 걷는 중에는 한 줄로 접는다.
  autoDetent(st) {
    if (state.sheetOpen) {
      state.sheetOpen = false;
      this.setDetent(this.detent === "peek" ? "half" : this.detent, true);
      return;
    }
    if (performance.now() - this.manualAt < 12000) return;
    let d = st === "far" ? "peek" : "half";
    if (this.detent === "full" && st !== "far") d = "full";
    if (Context.motionNow() === "walking") d = "peek";
    if (d !== this.detent) this.setDetent(d, false);
  },
  cycle() {
    const i = this.DETENTS.indexOf(this.detent);
    this.setDetent(this.DETENTS[(i + 1) % this.DETENTS.length], true);
  },
  bindGrip() {
    const grip = document.getElementById("grip");
    if (!grip) return;
    grip.addEventListener("pointerdown", (e) => { this.dragY = e.clientY; this.dragged = false; });
    window.addEventListener("pointerup", (e) => {
      if (this.dragY == null) return;
      const dy = e.clientY - this.dragY;
      this.dragY = null;
      if (Math.abs(dy) < 30) return;
      this.dragged = true;
      const i = this.DETENTS.indexOf(this.detent);
      this.setDetent(this.DETENTS[clamp(i + (dy < 0 ? 1 : -1), 0, 2)], true);
    });
    grip.addEventListener("click", () => {
      if (this.dragged) { this.dragged = false; return; }
      this.cycle();
    });
  },
  target(pin) {
    return Discover.fogged(pin) ? Discover.fogCenter(pin) : pin;
  },
  proximity(pin) {
    const d = distanceToPin(pin) - pin.radius;
    if (d < 30) return 5;
    if (d < 70) return 4;
    if (d < 150) return 3;
    if (d < 300) return 2;
    return 1;
  },
  clockWord(rel) {
    const h = Math.round((((rel % 360) + 360) % 360) / 30) % 12;
    return (h === 0 ? 12 : h) + "시 방향";
  },
  paintCompass(pin, insideNow) {
    const box = document.getElementById("compass");
    if (!box) return;
    box.hidden = insideNow;
    if (insideNow) return;
    const here = listenerPos();
    if (!here) return;
    const t = this.target(pin);
    const abs = Play.bearingTo(here, t);
    const heading = Context.headingNow();
    const rel = heading == null ? abs : Play.relBearing(abs);
    const needle = document.getElementById("needle");
    if (needle) needle.setAttribute("transform", "rotate(" + Math.round(rel) + " 32 32)");
    const north = document.getElementById("dial-north");
    if (north) north.setAttribute("transform", "rotate(" + Math.round(heading == null ? 0 : -heading) + " 32 32)");
    const now = performance.now();
    const d = distanceToPin(pin);
    this.trail.push({ t: now, d: d });
    this.trail = this.trail.filter((x) => now - x.t < 3000);
    const delta = this.trail.length > 1 ? d - this.trail[0].d : 0;
    const trend = delta < -3 ? "가까워지는 중" : delta > 3 ? "멀어지는 중" : "";
    const dir = heading == null ? approachWordDeg(abs) : this.clockWord(rel);
    const dirEl = document.getElementById("compass-dir");
    if (dirEl && dirEl.textContent !== dir) dirEl.textContent = dir;
    const trendEl = document.getElementById("compass-trend");
    const sub = trend || (Discover.fogged(pin) ? "단서: " + (pin.find_hint || "이름 없는 자리") : pin.alias);
    if (trendEl && trendEl.textContent !== sub) trendEl.textContent = sub;
    const level = this.proximity(pin);
    document.querySelectorAll("#prox i").forEach((dot, i) => dot.classList.toggle("on", i < level));
    box.setAttribute("aria-label", dir + ", " + ["아주 멀어요", "멀어요", "가까워지고 있어요", "가까워요", "거의 다 왔어요"][level - 1] + (trend ? ", " + trend : ""));
    const follow = document.getElementById("follow-me");
    if (follow) follow.hidden = LocationSource.kind === "gps" || document.documentElement.classList.contains("creator");
  },
  // 재생 버튼 둘레의 링: 방문 인정(15초) → 다음 체류 잠금까지 차오른다.
  ringSpan(pin) {
    const targets = [Presence.VISIT_MIN];
    Content.itemsFor(pin.id).forEach((it) => {
      if (it.lock && it.lock.layer === "dwell") targets.push(it.lock.dwell_sec || 180);
    });
    targets.sort((a, b) => a - b);
    const d = Presence.dwellOf(pin.id);
    const next = targets.find((t) => t > d);
    if (!next) return null;
    const prev = targets.filter((t) => t <= d).pop() || 0;
    return { ratio: (d - prev) / (next - prev), left: next - d, visit: next === Presence.VISIT_MIN };
  },
  paintRing(pin, insideNow) {
    const ring = document.getElementById("ring");
    if (!ring) return;
    const span = insideNow ? this.ringSpan(pin) : null;
    ring.classList.toggle("on", !!span);
    const arc = document.getElementById("ring-arc");
    if (!arc) return;
    const c = 2 * Math.PI * 38;
    arc.setAttribute("stroke-dasharray", c.toFixed(1));
    arc.setAttribute("stroke-dashoffset", (c * (1 - (span ? span.ratio : 0))).toFixed(1));
    const label = span ? (span.visit ? "방문으로 남기까지 " : "다음 콘텐츠가 열리기까지 ") + fmt(span.left) : "";
    if (ring.getAttribute("aria-label") !== label) ring.setAttribute("aria-label", label);
  },
  // 다가가면 그 자리의 소리가 거리에 따라 서서히 커진다. 소리가 곧 길 안내.
  stopAmbience() {
    const a = this.amb;
    this.amb = null;
    if (!a) return;
    a.nodes.forEach((n) => {
      try { n.stop(); } catch (e) {}
      try { n.disconnect(); } catch (e) {}
    });
  },
  tick(real) {
    const pin = currentPin();
    const d = distanceToPin(pin) - pin.radius;
    const ctx = audio.ctx;
    const want = this.approachOn && !this.mute && !inside(pin) && state.mode === "idle" && !Play.cur &&
      ctx && ctx.state === "running" && !Safety.blockReason(pin) && isFinite(d);
    const level = want && d < 70 ? Math.max(0, 1 - Math.max(0, d) / 70) : 0;
    if (level > 0 && (!this.amb || this.amb.pin !== pin.id)) {
      this.stopAmbience();
      try {
        const src = Play.noiseSource(ctx);
        const spec = FILTER[pin.id] || ["lowpass", 900, 0.7];
        const f = ctx.createBiquadFilter();
        f.type = spec[0];
        f.frequency.value = spec[1];
        f.Q.value = spec[2];
        const g = ctx.createGain();
        g.gain.value = 0;
        const pan = Play.panner(ctx);
        src.connect(f);
        f.connect(g);
        g.connect(pan);
        pan.connect(audio.master);
        src.start();
        this.amb = { pin: pin.id, nodes: [src], gain: g, pan: pan, level: 0 };
        Haptics.play("approach");
      } catch (e) {}
    }
    if (this.amb) {
      const a = this.amb;
      a.level += (level - a.level) * Math.min(1, real * 2);
      a.gain.gain.value = a.level * 0.09 * Safety.duck();
      const here = listenerPos();
      if (here) Play.place(a.pan, Play.relBearing(Play.bearingTo(here, this.target(pin))), 2 + Math.max(0, d) / 10);
      if (level === 0 && a.level < 0.01) this.stopAmbience();
    }
    // 손목 진동 길 안내 (Watch 설계와 같은 어휘): 왼쪽 두 번, 오른쪽 세 번.
    this.guideT += real;
    if (this.guideT >= 15) {
      this.guideT = 0;
      const here = listenerPos();
      if (here && this.approachOn && !inside(pin) && Context.headingNow() != null) {
        const rel = Play.relBearing(Play.bearingTo(here, this.target(pin)));
        Haptics.play(rel < -30 ? "left" : rel > 30 ? "right" : "tick");
      }
    }
  }
};
