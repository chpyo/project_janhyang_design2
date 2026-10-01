// 맥락 감지: 날씨, 해 질 녘, 계절, 움직임, 시선 방향, 주변 소음, 동행·붐빔.
// 실제 센서 값이 없으면 리허설 패널의 시뮬 값(override)을 쓴다.
const Context = {
  WEATHER: { clear: "맑음", cloudy: "흐림", rain: "비", snow: "눈" },
  SEASON: { spring: "봄", summer: "여름", autumn: "가을", winter: "겨울" },
  weather: { kind: "", tempC: null, at: 0, regionId: "" },
  override: { weather: "", motion: "", heading: null, group: null, occupancy: null, accuracy: 0, golden: "" },
  motion: "",
  heading: null,
  sensorsOn: false,
  samples: [],
  noise: { on: false, level: null, analyser: null, stream: null, buf: null },

  weatherKind(code) {
    if (code == null) return "";
    if (code <= 1) return "clear";
    if (code <= 48) return "cloudy";
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
    return "rain";
  },
  fetchWeather(region) {
    if (!region || !region.center) return;
    const fresh = this.weather.regionId === region.id && Date.now() - this.weather.at < 20 * 60 * 1000;
    if (fresh) return;
    this.weather.regionId = region.id;
    this.weather.at = Date.now();
    // 사용자 위치가 아니라 지역 중심 좌표만 보낸다.
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + region.center[0].toFixed(3) +
      "&longitude=" + region.center[1].toFixed(3) + "&current=temperature_2m,weather_code&hourly=weather_code&forecast_days=7&timezone=auto";
    fetch(url).then((res) => res.json()).then((data) => {
      const cur = data && data.current;
      if (!cur) return;
      this.weather.kind = this.weatherKind(cur.weather_code);
      this.weather.tempC = typeof cur.temperature_2m === "number" ? Math.round(cur.temperature_2m) : null;
      const hourly = data.hourly || {};
      this.forecast = (hourly.time || []).map((t, i) => ({ t: new Date(t), kind: this.weatherKind(hourly.weather_code[i]) }));
    }).catch(() => {});
  },
  forecast: [],
  // 잠긴 날씨 콘텐츠가 '다음에 언제 열리는지' 말할 수 있게 예보에서 찾는다.
  nextWeather(kinds, from) {
    const now = from || new Date();
    const hit = this.forecast.find((f) => f.t > now && kinds.indexOf(f.kind) !== -1);
    return hit ? hit.t : null;
  },
  whenWord(date, from) {
    const now = from || new Date();
    const h = date.getHours();
    const part = h < 6 ? "새벽" : h < 12 ? "오전" : h < 18 ? "오후" : "밤";
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const that = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = Math.round((that - day) / 86400000);
    if (diff === 0) return "오늘 " + part;
    if (diff === 1) return "내일 " + part;
    const names = ["일", "월", "화", "수", "목", "금", "토"];
    return (date.getMonth() + 1) + "월 " + date.getDate() + "일(" + names[date.getDay()] + ") " + part;
  },
  hm(mins) {
    const m = ((Math.round(mins) % 1440) + 1440) % 1440;
    return Math.floor(m / 60) + ":" + String(m % 60).padStart(2, "0");
  },
  // 해 질 녘 창: 일몰 60분 전부터 10분 뒤까지. 오늘 창이 지났으면 내일 창.
  goldenWindow(pin, from) {
    const p = pin || currentPin();
    const now = from || new Date();
    const t = now.getHours() * 60 + now.getMinutes();
    const today = this.sunTimes(now, p.lat, p.lng);
    if (t < today.set + 10) return { day: "오늘", from: this.hm(today.set - 60), to: this.hm(today.set + 10) };
    const next = this.sunTimes(new Date(now.getTime() + 86400000), p.lat, p.lng);
    return { day: "내일", from: this.hm(next.set - 60), to: this.hm(next.set + 10) };
  },
  weatherNow() {
    return this.override.weather || this.weather.kind || "clear";
  },
  sunTimes(date, lat, lng) {
    const rad = Math.PI / 180;
    const start = new Date(date.getFullYear(), 0, 0);
    const n = Math.floor((date - start) / 86400000);
    const g = 2 * Math.PI / 365 * (n - 1);
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
      0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    const cosHa = Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl);
    const ha = Math.acos(Math.max(-1, Math.min(1, cosHa))) / rad;
    const tz = -date.getTimezoneOffset();
    return { rise: 720 - 4 * (lng + ha) - eq + tz, set: 720 - 4 * (lng - ha) - eq + tz };
  },
  golden(pin) {
    if (this.override.golden) return this.override.golden === "on";
    if (Sky.override) return Sky.override === "golden";
    const p = pin || currentPin();
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    const sun = this.sunTimes(now, p.lat, p.lng);
    return mins >= sun.set - 60 && mins <= sun.set + 10;
  },
  sunsetLabel(pin) {
    const p = pin || currentPin();
    const set = Math.round(this.sunTimes(new Date(), p.lat, p.lng).set);
    return Math.floor(set / 60) + ":" + String(set % 60).padStart(2, "0");
  },
  season(date) {
    const m = (date || new Date()).getMonth() + 1;
    if (m >= 3 && m <= 5) return "spring";
    if (m >= 6 && m <= 8) return "summer";
    if (m >= 9 && m <= 11) return "autumn";
    return "winter";
  },
  motionNow() {
    return this.override.motion || this.motion || "still";
  },
  headingNow() {
    if (this.override.heading != null) return this.override.heading;
    return this.heading;
  },
  group() {
    if (this.override.group != null) return this.override.group;
    return 1 + Play.peerCount();
  },
  occupancy(pin) {
    if (this.override.occupancy != null) return this.override.occupancy;
    const base = (Content.occupancy && Content.occupancy[pin.id]) || 0;
    const h = new Date().getHours();
    const wave = h >= 11 && h <= 20 ? 1 : 0.4;
    return Math.round(base * wave);
  },
  enableSensors() {
    if (this.sensorsOn) return Promise.resolve(true);
    const ask = (Ev) => (Ev && typeof Ev.requestPermission === "function") ? Ev.requestPermission().catch(() => "denied") : Promise.resolve("granted");
    return Promise.all([ask(window.DeviceOrientationEvent), ask(window.DeviceMotionEvent)]).then(([o, m]) => {
      if (o === "granted") {
        const onOrient = (e) => {
          if (typeof e.webkitCompassHeading === "number") this.heading = e.webkitCompassHeading;
          else if (e.absolute && typeof e.alpha === "number") this.heading = (360 - e.alpha) % 360;
        };
        window.addEventListener("deviceorientationabsolute", onOrient);
        window.addEventListener("deviceorientation", onOrient);
      }
      if (m === "granted") {
        window.addEventListener("devicemotion", (e) => {
          const a = e.accelerationIncludingGravity;
          if (!a || a.x == null) return;
          const now = performance.now();
          this.samples.push({ t: now, v: Math.hypot(a.x, a.y, a.z) });
          this.samples = this.samples.filter((s) => now - s.t < 2000);
          if (this.samples.length < 10) return;
          const mean = this.samples.reduce((s, x) => s + x.v, 0) / this.samples.length;
          const sd = Math.sqrt(this.samples.reduce((s, x) => s + (x.v - mean) * (x.v - mean), 0) / this.samples.length);
          this.motion = sd > 1.1 ? "walking" : "still";
        });
      }
      this.sensorsOn = o === "granted" || m === "granted";
      return this.sensorsOn;
    });
  },
  // 녹음하지 않는다. 음량(RMS)만 읽어 재생 볼륨을 맞춘다.
  enableNoise() {
    if (this.noise.on) return Promise.resolve(true);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.resolve(false);
    return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } }).then((stream) => {
      const ctx = ensureAudio();
      if (!ctx) return false;
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 1024;
      src.connect(an);
      this.noise = { on: true, level: null, analyser: an, stream: stream, buf: new Float32Array(an.fftSize) };
      return true;
    }).catch(() => false);
  },
  disableNoise() {
    if (this.noise.stream) this.noise.stream.getTracks().forEach((t) => t.stop());
    this.noise = { on: false, level: null, analyser: null, stream: null, buf: null };
  },
  readNoise() {
    const n = this.noise;
    if (!n.on || !n.analyser) return null;
    n.analyser.getFloatTimeDomainData(n.buf);
    let sum = 0;
    for (let i = 0; i < n.buf.length; i++) sum += n.buf[i] * n.buf[i];
    const rms = Math.sqrt(sum / n.buf.length);
    const level = Math.max(0, Math.min(100, 20 * Math.log10(rms + 1e-6) + 100));
    n.level = n.level == null ? level : n.level * 0.9 + level * 0.1;
    return n.level;
  },
  noiseGain() {
    const level = this.noise.level;
    if (level == null) return 1;
    if (level > 70) return 1.5;
    if (level > 58) return 1.2;
    if (level < 40) return 0.8;
    return 1;
  },
  snapshot(pin) {
    const p = pin || currentPin();
    return {
      weather: this.weatherNow(),
      tempC: this.override.weather ? null : this.weather.tempC,
      phase: state.phase,
      sky: Sky.phase(p),
      golden: this.golden(p),
      season: this.season(),
      motion: this.motionNow()
    };
  },
  label(pin) {
    const s = this.snapshot(pin);
    const parts = [this.WEATHER[s.weather] || s.weather];
    if (s.tempC != null) parts[0] += " " + s.tempC + "°";
    parts.push(s.golden ? "해 질 녘" : (Sky.NAMES[s.sky] || (s.phase === "night" ? "밤" : "낮")));
    parts.push(this.SEASON[s.season]);
    return parts.join(" · ");
  }
};
