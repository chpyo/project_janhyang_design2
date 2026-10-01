// 콘텐츠 저장소: 지역·핀·콘텐츠 아이템·코스·정책을 한 모델로 묶는다.
// 기존 Firestore 카탈로그 피드(field_note/track_link/story)도 같은 아이템 모델로 정규화한다.
const Content = {
  URL: "/janhyang/platform/content.json",
  CACHE: "janhyang-content-v1",
  USER_KEY: "janhyang-ugc",
  ready: false,
  regions: [],
  pins: [],
  items: [],
  courses: [],
  policies: {},
  occupancy: {},
  traces: {},
  sample: null,
  user: { capsules: [], reports: {} },
  unsealed: {},
  onReady: null,

  load() {
    this.loadUser();
    return fetch(this.URL).then((res) => res.json()).then((data) => {
      this.adopt(data);
      this.ready = true;
      if (this.onReady) this.onReady();
    }).catch(() => {
      this.ready = true;
      if (this.onReady) this.onReady();
    });
  },
  adopt(data) {
    this.regions = data.regions || [];
    this.pins = (data.pins || []).map((raw) => this.makePin(raw));
    this.items = data.items || [];
    this.courses = data.courses || [];
    this.policies = data.policies || {};
    this.occupancy = data.occupancy || {};
    this.traces = data.traces || {};
    this.sample = data.metrics_sample || null;
  },
  makePin(raw) {
    const blank = { enter_at_sec: 9999, preview_sec: 0, bed_db: -60, youtube_query: "", url_dummy: null };
    const piece = (lines, hours) => ({
      hours: hours,
      duration_sec: raw.duration_sec || 60,
      A: "",
      B: lines || [],
      C: Object.assign({}, blank)
    });
    return {
      id: raw.id,
      region: raw.region || "seongsu",
      alias: raw.alias,
      lat: raw.lat,
      lng: raw.lng,
      radius: raw.radius || 40,
      zone: raw.zone || "",
      place_type: raw.place_type || "",
      landmark_quota: false,
      status: "PLATFORM_DUMMY",
      find_hint: raw.find_hint || "",
      safety: raw.safety || "",
      drop: raw.drop || null,
      works: [{
        id: "W-" + String(raw.id).replace("-", "") + "-01",
        kind: "audio",
        creator: "공식",
        aggro: raw.aggro || raw.alias,
        afterglow: raw.afterglow || raw.alias,
        body_day: piece(raw.day, "07:00-17:30"),
        body_night: piece(raw.night || raw.day, "17:30-24:00")
      }]
    };
  },
  region(id) {
    return this.regions.find((r) => r.id === id) || this.regions[0] || null;
  },
  regionOf(pin) {
    if (!pin) return "seongsu";
    if (pin.region) return pin.region;
    const hit = this.regions.find((r) => r.bounds && pin.lat >= r.bounds.minLat && pin.lat <= r.bounds.maxLat && pin.lng >= r.bounds.minLng && pin.lng <= r.bounds.maxLng);
    return hit ? hit.id : "seongsu";
  },
  allPins() {
    const seen = {};
    return DATA.pins.concat(this.pins, studioPins).filter((p) => {
      if (seen[p.id]) return false;
      seen[p.id] = true;
      return true;
    });
  },
  // 지도·탐색에 보이는 핀. 닫힌 드롭은 빠진다.
  pinsIn(regionId) {
    return this.allPins().filter((p) => this.regionOf(p) === regionId && (!p.drop || Discover.dropState(p).open));
  },
  normalize(raw, pinId) {
    if (!raw) return null;
    const t = raw.type;
    if (raw.lock || raw.body) return Object.assign({ pin: pinId, tier: "creator" }, raw);
    if (t === "field_note" || t === "note") {
      return { id: raw.id, pin: pinId, type: "note", tier: "curated", creator: raw.author || "현장 노트", lock: { layer: "onsite" }, body: { text: raw.text || "" }, legacy: true };
    }
    if (t === "track_link" || t === "music") {
      return { id: raw.id, pin: pinId, type: "music", tier: raw.curator === "스튜디오" ? "creator" : "curated", title: raw.title, creator: raw.curator || "", lock: { layer: "onsite" }, body: { artist: raw.artist, note: raw.note, url: raw.url }, legacy: true };
    }
    if (t === "story") {
      return { id: raw.id, pin: pinId, type: "docent", tier: "creator", title: raw.title, creator: "스튜디오", lock: { layer: "onsite" }, body: { audio_url: raw.audio_url, duration_sec: raw.duration_sec }, legacy: true };
    }
    return null;
  },
  itemsFor(pinId) {
    const space = spaceById[pinId];
    const legacy = ((space && space.feed) || []).map((raw) => this.normalize(raw, pinId)).filter(Boolean);
    const own = this.items.filter((it) => it.pin === pinId);
    const capsules = this.user.capsules.filter((c) => c.pin === pinId);
    return legacy.concat(own, capsules);
  },
  item(id) {
    return this.items.find((it) => it.id === id) || this.user.capsules.find((it) => it.id === id) || null;
  },
  loadUser() {
    try {
      const d = JSON.parse(localStorage.getItem(this.USER_KEY) || "{}");
      if (Array.isArray(d.capsules)) this.user.capsules = d.capsules;
      if (d.reports && typeof d.reports === "object") this.user.reports = d.reports;
    } catch (e) {}
  },
  saveUser() {
    try { localStorage.setItem(this.USER_KEY, JSON.stringify(this.user)); } catch (e) {}
  },
  tracesFor(pinId) {
    const seed = (this.traces[pinId] || []).filter((t) => !this.user.reports[t.id]);
    const mine = readNote(pinId);
    return mine ? [{ id: "mine-" + pinId, text: mine, at: "", mine: true, tier: "ugc" }].concat(seed) : seed;
  },
  report(traceId) {
    this.user.reports[traceId] = new Date().toISOString();
    this.saveUser();
    Metrics.log("report", state.pinId, { trace: traceId });
  },
  addCapsule(pinId, text, date) {
    const item = {
      id: "cap-" + Date.now(),
      pin: pinId,
      type: "capsule",
      tier: "ugc",
      title: "내가 묻은 타임캡슐",
      creator: "나",
      teaser: "날짜가 지나면 이 자리에서 열린다.",
      lock: { layer: "capsule", unlock_at: date },
      body: { text: text.slice(0, 200), from: "나 · " + fmtDay(new Date().toISOString()) }
    };
    this.user.capsules.push(item);
    this.saveUser();
    Metrics.log("capsule", pinId);
    return item;
  },
  // 암호화된 본문은 기기에 받아 두고, 현장에서만 키를 받아 푼다.
  unseal(item) {
    if (this.unsealed[item.id]) return Promise.resolve(this.unsealed[item.id]);
    if (!item.sealed || !window.crypto || !crypto.subtle) return Promise.reject(new Error("no-crypto"));
    if (!Access.evaluate(item).open) return Promise.reject(new Error("locked"));
    const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
    return fetch("/janhyang/platform/keys/" + item.pin + ".json", { cache: "no-store" })
      .then((res) => res.json())
      .then((k) => crypto.subtle.importKey("raw", b64(k.key), "AES-GCM", false, ["decrypt"]))
      .then((key) => crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(item.sealed.iv) }, key, b64(item.sealed.data)))
      .then((buf) => {
        const body = JSON.parse(new TextDecoder().decode(buf));
        this.unsealed[item.id] = body;
        return body;
      });
  },
  forgetUnsealed(pinId) {
    this.items.forEach((it) => { if (it.pin === pinId) delete this.unsealed[it.id]; });
  },
  prefetch(regionId) {
    if (!window.caches) return Promise.resolve(0);
    const ids = this.pinsIn(regionId).map((p) => p.id);
    const media = {};
    this.items.forEach((it) => {
      if (ids.indexOf(it.pin) === -1 || !it.body) return;
      if (it.body.audio_url) media[it.body.audio_url] = true;
      if (it.body.src) media[it.body.src] = true;
    });
    const urls = [this.URL].concat(Object.keys(media));
    return caches.open(this.CACHE).then((cache) => cache.addAll(urls)).then(() => urls.length);
  }
};
