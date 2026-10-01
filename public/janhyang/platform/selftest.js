// 자가점검(리허설 > 자가점검)에 붙는 플랫폼 규칙 검사. 실행 전후로 플랫폼 상태를 저장·복원한다.
const PlatformTest = {
  snapshot() {
    const snap = {
      override: Object.assign({}, Context.override),
      presence: JSON.stringify({ dwell: Presence.dwell, away: Presence.away, visits: Presence.visits, held: Presence.held, confirm: Presence.confirm, checkins: Presence.checkins, trust: Presence.trust }),
      jitter: Object.assign({}, Presence.jitter),
      lastFix: Presence.lastFix,
      progress: JSON.stringify(Discover.progress),
      courses: Content.courses,
      policies: Content.policies,
      events: Metrics.all().length,
      channel: state.channel,
      simEast: state.simEast
    };
    Play.stop();
    Stage.mute = true;
    snap.sky = Sky.override;
    Context.override = { weather: "clear", motion: "still", heading: null, group: 1, occupancy: 0, accuracy: 0, golden: "off" };
    Presence.dwell = {};
    Presence.away = {};
    Presence.visits = {};
    Presence.held = {};
    Presence.confirm = {};
    Presence.checkins = {};
    Presence.trust = { ok: true, until: 0, reason: "" };
    Presence.jitter = { n: 0, e: 0, t: 0 };
    state.channel = "local";
    state.simEast = 0;
    return snap;
  },
  restore(snap) {
    Context.override = snap.override;
    const p = JSON.parse(snap.presence);
    Presence.dwell = p.dwell;
    Presence.away = p.away;
    Presence.visits = p.visits;
    Presence.held = p.held;
    Presence.confirm = p.confirm;
    Presence.checkins = p.checkins;
    Presence.trust = p.trust;
    Presence.jitter = snap.jitter;
    Presence.lastFix = snap.lastFix;
    Presence.save();
    Discover.progress = JSON.parse(snap.progress);
    Discover.save();
    Content.courses = snap.courses;
    Content.policies = snap.policies;
    const events = Metrics.all();
    events.length = Math.min(events.length, snap.events);
    try { localStorage.setItem(Metrics.KEY, JSON.stringify(events)); } catch (e) {}
    state.channel = snap.channel;
    state.simEast = snap.simEast;
    Sky.override = snap.sky;
    Sky.stamp = "";
    Stage.mute = false;
    Stage.wasPin = "";
    Feed.stamp = "";
    Archive.stamp = "";
    Discover.stamp = "";
  },
  run(check) {
    const pin = pinById("SS-01");
    const far = pin.radius + 80;
    const near = Math.round(pin.radius * 0.4);
    const mk = (lock) => ({ id: "t-" + Math.random().toString(36).slice(2), pin: "SS-01", type: "note", lock: lock, body: { text: "t" } });
    Play.stop();
    state.mode = "idle";
    state.pinId = "SS-01";
    state.phase = "day";
    state.visited = state.visited.filter((id) => id !== "SS-01");
    Presence.visits["SS-01"] = [];

    state.distanceM = far;
    check(!Access.evaluate(mk({ layer: "onsite" })).open, "p onsite far");
    state.distanceM = near;
    check(Access.evaluate(mk({ layer: "onsite" })).open, "p onsite near");

    const dwell = mk({ layer: "dwell", dwell_sec: 180 });
    Presence.dwell["SS-01"] = 60;
    const half = Access.evaluate(dwell);
    check(!half.open && Math.abs(half.progress - 1 / 3) < 0.01, "p dwell partial");
    Presence.dwell["SS-01"] = 180;
    check(Access.evaluate(dwell).open, "p dwell open");
    Presence.dwell["SS-01"] = 0;

    const rain = mk({ layer: "condition", when: { weather: ["rain"] } });
    check(!Access.evaluate(rain).open, "p rain locked");
    Context.override.weather = "rain";
    check(Access.evaluate(rain).open, "p rain open");
    Context.override.weather = "clear";
    const golden = mk({ layer: "condition", when: { golden: true } });
    check(!Access.evaluate(golden).open, "p golden locked");
    Context.override.golden = "on";
    check(Access.evaluate(golden).open, "p golden open");
    Context.override.golden = "off";
    const group = mk({ layer: "condition", when: { min_group: 2 } });
    check(!Access.evaluate(group).open, "p group locked");
    Context.override.group = 2;
    check(Access.evaluate(group).open, "p group open");
    Context.override.group = 1;

    const revisit = mk({ layer: "revisit", visits: 2 });
    check(!Access.evaluate(revisit).open, "p revisit first");
    Presence.visits["SS-01"] = [{ at: "2026-09-01T00:00:00Z", dwell: 60 }];
    check(Access.evaluate(revisit).open, "p revisit second");
    Presence.visits["SS-01"] = [];

    const capsule = mk({ layer: "capsule", unlock_at: "2999-01-01" });
    check(!Access.evaluate(capsule).open, "p capsule future");
    capsule.lock.unlock_at = "2000-01-01";
    check(Access.evaluate(capsule).open, "p capsule past");

    const glow = mk({ layer: "afterglow" });
    state.distanceM = far;
    check(!Access.evaluate(glow).open, "p afterglow unvisited");
    state.visited.unshift("SS-01");
    check(Access.evaluate(glow).open, "p afterglow visited");
    state.visited.shift();

    Content.courses = [{ id: "CO-T", region: "seongsu", title: "T", pins: ["SS-01", "SS-03", "SS-09"] }];
    Discover.progress = {};
    Discover.onVisit("SS-03");
    check(Discover.courseStep(Content.courses[0]) === 0, "p course order");
    Discover.onVisit("SS-01");
    Discover.onVisit("SS-03");
    check(Discover.courseStep(Content.courses[0]) === 2, "p course step");
    state.pinId = "SS-09";
    state.distanceM = 5;
    const reward = { id: "t-reward", pin: "SS-09", type: "note", lock: { layer: "course", course: "CO-T" }, body: {} };
    check(Access.evaluate(reward).open, "p course reward");
    Discover.progress = {};
    check(!Access.evaluate(reward).open, "p course reward locked");
    state.pinId = "SS-01";

    const drop = { drop: { days: [4], from: "11:00", to: "22:00" } };
    check(Discover.dropState(drop, new Date(2026, 9, 1, 12, 0)).open, "p drop open");
    check(Discover.dropState(drop, new Date(2026, 9, 1, 23, 0)).startsIn === 9360, "p drop next week");
    check(Discover.dropState(drop, new Date(2026, 9, 2, 10, 0)).startsIn === 8700, "p drop countdown");

    Context.override.accuracy = 35;
    state.distanceM = near;
    Presence.held = {};
    Presence.confirm = {};
    Presence.settle(pin, near, 1);
    check(!inside(pin), "p acc wait");
    Presence.settle(pin, near, 6);
    check(inside(pin), "p acc confirmed");
    Presence.settle(pin, pin.radius + 10, 1);
    check(!!Presence.held["SS-01"], "p acc hysteresis");
    Presence.settle(pin, pin.radius + 30, 1);
    check(!Presence.held["SS-01"], "p acc release");
    Context.override.accuracy = 0;

    state.distanceM = near;
    Presence.lastFix = null;
    Presence.observeFix({ lat: 37.54, lng: 127.05, t: 0 });
    check(!Presence.observeFix({ lat: 37.59, lng: 127.05, t: 1000 }) && !Presence.trusted(), "p spoof");
    check(!Access.evaluate(mk({ layer: "onsite" })).open, "p spoof locks");
    Presence.trust = { ok: true, until: 0, reason: "" };
    Presence.lastFix = null;

    Content.policies = { default: { capacity: 20 }, "SS-01": { night_closed: true, quiet: "00:00-23:59", capacity: 2 }, "SS-06": { checkin_code: "T-1" } };
    state.phase = "night";
    check(!!Safety.blockReason(pin) && !Access.evaluate(mk({ layer: "onsite" })).open, "p night closed");
    state.phase = "day";
    check(Safety.quiet(pin), "p quiet");
    Context.override.occupancy = 5;
    check(Safety.crowded(pin), "p crowded");
    Context.override.occupancy = 0;
    check(Safety.inWindow("21:00-09:00", new Date(2026, 9, 1, 23, 0)) && !Safety.inWindow("21:00-09:00", new Date(2026, 9, 1, 12, 0)), "p window wrap");
    Context.override.motion = "walking";
    state.mode = "main";
    check(Safety.duck() === 0.5, "p walking duck");
    state.mode = "idle";
    Context.override.motion = "still";
    check(Safety.duck() === 1, "p still duck");
    check(!Presence.checkin("SS-06", "bad") && Presence.checkin("SS-06", "t-1"), "p checkin code");
    state.pinId = "SS-06";
    state.distanceM = 300;
    check(inside(pinById("SS-06")), "p checkin inside");
    Presence.checkins = {};
    state.pinId = "SS-01";

    const legacy = Content.normalize({ id: "x", type: "track_link", title: "t", curator: "c" }, "SS-01");
    check(legacy.type === "music" && legacy.lock.layer === "onsite", "p normalize");

    Presence.visits["SS-02"] = [];
    Presence.dwell["SS-02"] = 20;
    Presence.closeSession("SS-02");
    Presence.dwell["SS-03"] = 5;
    Presence.closeSession("SS-03");
    check(Presence.visits["SS-02"].length === 1 && !(Presence.visits["SS-03"] || []).length, "p session");

    Sky.override = "";
    const seoul = { lat: 37.5665, lng: 126.978 };
    check(Sky.phase(seoul, new Date(2026, 9, 1, 13, 0)) === "day" && Sky.phase(seoul, new Date(2026, 9, 1, 2, 0)) === "night", "p sky phase");
    const sun = Context.sunTimes(new Date(2026, 9, 1, 12, 0), seoul.lat, seoul.lng);
    const at = (m) => new Date(2026, 9, 1, Math.floor(m / 60), Math.floor(m % 60));
    check(Sky.phase(seoul, at(sun.set - 30)) === "golden" && Sky.phase(seoul, at(sun.set + 20)) === "blue", "p sky golden blue");
    const rgb = Sky.rgb(Sky.colors("golden", "rain", false).accent);
    const dry = Sky.rgb(Sky.colors("golden", "clear", false).accent);
    check(Math.max(...rgb) - Math.min(...rgb) < Math.max(...dry) - Math.min(...dry), "p sky rain desat");
    const savedForecast = Context.forecast;
    Context.forecast = [{ t: new Date(Date.now() + 2 * 86400000), kind: "rain" }];
    check(/^다음 비 예보: /.test(Access.weatherHint(["rain"])), "p forecast hint");
    Context.forecast = savedForecast;
    check(/^(오늘|내일) \d+:\d\d–\d+:\d\d$/.test((() => { const w = Context.goldenWindow(pin); return w.day + " " + w.from + "–" + w.to; })()), "p golden window");
    check(Stage.stageOf(pin, false, "far") === "far" && Stage.stageOf(pin, false, "edge") === "near" && Stage.stageOf(pin, true, "in") === "arrive", "p stage");
    Presence.dwell["SS-01"] = 5;
    const ring = Stage.ringSpan(pin);
    check(ring && ring.visit && Math.abs(ring.ratio - 5 / 15) < 0.01, "p ring visit");
    Presence.dwell["SS-01"] = 0;

    if (new Date().getTimezoneOffset() === -540) {
      const sun = Context.sunTimes(new Date(2026, 5, 21, 12, 0), 37.5665, 126.978);
      check(Math.abs(sun.set - 1196) < 8, "p sunset");
    }
  }
};
