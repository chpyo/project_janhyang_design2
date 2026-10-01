// 지켜야 할 원칙: 밤에 닫히는 자리, 관람 시간, 주거지 조용한 시간, 붐빔 상한, 걷는 중 볼륨 낮춤, 개인정보 기본값.
const Safety = {
  KEY: "janhyang-privacy",
  privacy: { shareVisits: false, noise: false },

  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      this.privacy.shareVisits = d.shareVisits === true;
      this.privacy.noise = d.noise === true;
    } catch (e) {}
  },
  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.privacy)); } catch (e) {}
  },
  policy(pin) {
    const all = Content.policies || {};
    return Object.assign({ capacity: 20 }, all.default || {}, (pin && all[pin.id]) || {});
  },
  inWindow(range, date) {
    const m = /^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/.exec(range || "");
    if (!m) return false;
    const now = date || new Date();
    const t = now.getHours() * 60 + now.getMinutes();
    const a = Number(m[1]) * 60 + Number(m[2]);
    const b = Number(m[3]) * 60 + Number(m[4]);
    return a <= b ? t >= a && t < b : t >= a || t < b;
  },
  blockReason(pin) {
    const p = this.policy(pin);
    if (p.night_closed && state.phase === "night") return "밤에는 닫힌 자리예요 · " + (p.reason || "안전 확인 전");
    if (p.hours && !this.inWindow(p.hours)) return "운영 시간(" + p.hours + ") 밖이에요";
    return "";
  },
  quiet(pin) {
    const p = this.policy(pin);
    return !!(p.quiet && this.inWindow(p.quiet));
  },
  crowded(pin) {
    return Context.occupancy(pin) >= this.policy(pin).capacity;
  },
  alternative(pin) {
    let best = null;
    let bestD = Infinity;
    Content.pinsIn(Content.regionOf(pin)).forEach((p) => {
      if (p.id === pin.id || this.blockReason(p) || this.crowded(p)) return;
      const d = haversine(pin, p);
      if (d < bestD) { bestD = d; best = p; }
    });
    return best;
  },
  walkingWhilePlaying() {
    return Context.motionNow() === "walking" && (state.mode !== "idle" || Play.active());
  },
  duck() {
    return this.walkingWhilePlaying() ? 0.5 : 1;
  },
  notices(pin) {
    const list = [];
    const p = this.policy(pin);
    const block = this.blockReason(pin);
    if (block) list.push({ kind: "block", text: block });
    if (this.walkingWhilePlaying()) {
      list.push({ kind: "warn", text: p.traffic ? "걷는 중 · 차도 가까운 자리예요. 소리를 절반으로 줄였어요." : "걷는 중 · 주변을 살피세요. 소리를 절반으로 줄였어요." });
    }
    if (this.quiet(pin)) list.push({ kind: "quiet", text: "주민이 쉬는 시간(" + p.quiet + ") · 대화와 스피커는 삼가고, 함께하는 게임은 쉬어요." });
    else if (p.residential) list.push({ kind: "quiet", text: "사람이 사는 골목이에요 · 이어폰으로만, 목소리는 낮게." });
    if (this.crowded(pin)) {
      const alt = this.alternative(pin);
      list.push({ kind: "crowd", text: "지금 붐벼요 (" + Context.occupancy(pin) + "/" + p.capacity + "명)" + (alt ? " · 가까운 다른 자리: " + (Discover.fogged(alt) ? "단서 " + alt.id : alt.alias) : ""), alt: alt ? alt.id : "" });
    }
    if (!Presence.trusted()) list.push({ kind: "block", text: Presence.trust.reason });
    return list;
  }
};
