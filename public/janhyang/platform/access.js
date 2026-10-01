// 현장 잠금(Presence Lock): 콘텐츠마다 어떤 레이어에서 열리는지 판정한다.
// 티저 → 현장 → 체류 → 조건 → 잔향 → 재방문 (+ 코스, 타임캡슐)
const Access = {
  LAYERS: {
    teaser: "티저",
    onsite: "현장",
    dwell: "체류",
    condition: "조건",
    afterglow: "잔향",
    revisit: "재방문",
    course: "코스",
    capsule: "타임캡슐"
  },
  lockOf(item) {
    return (item && item.lock) || { layer: "onsite" };
  },
  label(item) {
    const lock = this.lockOf(item);
    if (lock.layer === "dwell") return "체류 " + Math.round((lock.dwell_sec || 0) / 60) + "분";
    if (lock.layer === "revisit") return (lock.visits || 2) + "번째 방문";
    if (lock.layer === "condition") return this.whenText(lock.when);
    if (lock.layer === "capsule") return "타임캡슐";
    return this.LAYERS[lock.layer] || "현장";
  },
  whenText(when) {
    if (!when) return "조건";
    const parts = [];
    if (when.weather) parts.push(when.weather.map((w) => Context.WEATHER[w] || w).join("·") + " 오는 날");
    if (when.golden) parts.push("해 질 녘");
    if (when.phase) parts.push(when.phase === "night" ? "밤" : "낮");
    if (when.season) parts.push(when.season.map((s) => Context.SEASON[s] || s).join("·"));
    if (when.min_group) parts.push(when.min_group + "명 이상");
    return parts.join(" · ") || "조건";
  },
  whenMet(when, pin) {
    if (!when) return { ok: true, miss: "" };
    if (when.weather && when.weather.indexOf(Context.weatherNow()) === -1) return { ok: false, miss: this.weatherHint(when.weather) };
    if (when.golden && !Context.golden(pin)) {
      const w = Context.goldenWindow(pin);
      return { ok: false, miss: w.day + " " + w.from + "–" + w.to + "에 열려요" };
    }
    if (when.phase && when.phase !== state.phase) return { ok: false, miss: when.phase === "night" ? "오늘 17:30부터 열려요" : "내일 아침 7시부터 열려요" };
    if (when.season && when.season.indexOf(Context.season()) === -1) return { ok: false, miss: this.whenText({ season: when.season }) + "에만 열려요" };
    if (when.min_group && Context.group() < when.min_group) return { ok: false, miss: when.min_group + "명 이상 함께 있을 때 열려요 (지금 " + Context.group() + "명)" };
    return { ok: true, miss: "" };
  },
  // 거절 대신 다시 올 이유: 다음 비 예보를 알려 준다.
  weatherHint(kinds) {
    const name = kinds.map((w) => Context.WEATHER[w] || w).join("·");
    const next = Context.nextWeather(kinds);
    if (next) return "다음 " + name + " 예보: " + Context.whenWord(next);
    if (Context.forecast.length) return "이번 주엔 " + name + " 소식이 없어요 · " + name + " 오는 날 다시";
    return name + " 오는 날에만 열려요";
  },
  capsuleDate(lock) {
    const d = new Date(lock.unlock_at + "T00:00:00");
    return Number.isNaN(d.getTime()) ? null : d;
  },
  // { open, teaser, layer, reason, progress }
  evaluate(item, pin) {
    const lock = this.lockOf(item);
    const p = pin || pinById(item.pin);
    const out = (open, reason, progress) => ({ open: open, teaser: !open, layer: lock.layer, reason: reason || "", progress: progress == null ? (open ? 1 : 0) : progress });
    const block = Safety.blockReason(p);
    if (block) return out(false, block);
    if (!Presence.trusted()) return out(false, Presence.trust.reason);
    const here = inside(p);
    const visited = state.visited.includes(p.id) || Presence.visitCount(p.id) > 0;
    if (lock.layer === "capsule") {
      const at = this.capsuleDate(lock);
      if (at && Date.now() < at.getTime()) return out(false, fmtDay(at.toISOString()) + "에 이 자리에서 열려요");
      if (!here) return out(false, "열릴 날이 지났어요 · 이 자리에 오면 열려요");
      return out(true);
    }
    if (!here) {
      if (lock.layer === "afterglow" && visited) return out(true, "잔향 · 멀리서도 열림");
      return out(false, visited ? "다녀간 자리 · 본편은 이 자리에서" : "이 자리에 오면 열려요");
    }
    if (lock.layer === "dwell") {
      const need = lock.dwell_sec || 180;
      const have = Presence.dwellOf(p.id);
      if (have < need) return out(false, fmt(need - have) + " 더 머물면 열려요", have / need);
      return out(true);
    }
    if (lock.layer === "condition") {
      const met = this.whenMet(lock.when, p);
      return met.ok ? out(true) : out(false, met.miss);
    }
    if (lock.layer === "revisit") {
      const need = lock.visits || 2;
      const have = Presence.visitCount(p.id) + (Presence.dwellOf(p.id) < Presence.VISIT_MIN ? 1 : 0);
      if (have < need) return out(false, need === 2 ? "두 번째로 오면 열려요" : need + "번째로 오면 열려요", have / need);
      return out(true);
    }
    if (lock.layer === "course") {
      const course = Discover.course(lock.course);
      if (!course) return out(false, "코스 정보 없음");
      const done = Discover.courseStep(course);
      const need = course.pins.length;
      const last = course.pins[need - 1] === p.id;
      if (done < need - (last ? 1 : 0)) return out(false, josa(course.title, "을", "를") + " 순서대로 걸으면 열려요 · " + done + "/" + need, done / need);
      return out(true);
    }
    return out(true);
  },
  describe(item) {
    const lock = this.lockOf(item);
    const base = "밖: 티저만 · ";
    if (lock.layer === "dwell") return base + "반경 안에서 " + Math.round((lock.dwell_sec || 0) / 60) + "분 머물면 열림";
    if (lock.layer === "condition") return base + this.whenText(lock.when) + "에만 열림";
    if (lock.layer === "revisit") return base + (lock.visits || 2) + "번째 방문부터 열림";
    if (lock.layer === "course") return base + "코스를 순서대로 걸으면 열림";
    if (lock.layer === "capsule") return base + (lock.unlock_at || "지정일") + " 이후 현장에서 열림";
    if (lock.layer === "afterglow") return "방문 뒤 어디서나 잔향으로 열림";
    return base + "반경 안에서 열림";
  }
};
