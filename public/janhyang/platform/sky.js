// 살아 있는 색: 실제 해의 위치와 날씨로 앱 전체의 색을 정한다.
// 새벽 → 낮 → 해 질 녘 → 블루 아워 → 밤. 비·눈·흐림이면 채도를 낮춘다.
const Sky = {
  NAMES: { dawn: "새벽", day: "낮", golden: "해 질 녘", blue: "블루 아워", night: "밤" },
  // 포인트 색은 모두 명도 대비 4.5:1 이상 (밝은 테마는 흰 글자, 어두운 테마는 짙은 글자)
  PALETTE: {
    dawn: { light: ["#DCE1EE", "#F3E9E4", "#4A5A8C"], dark: ["#1B2133", "#2A2630", "#A9B6E8"] },
    day: { light: ["#E3ECF2", "#F4F7FB", "#2D6A8A"], dark: ["#121A22", "#0E141B", "#8CC3DE"] },
    golden: { light: ["#F5D6AE", "#FAEFE2", "#A8521C"], dark: ["#2A1B12", "#15100D", "#F2A766"] },
    blue: { light: ["#C7D0EA", "#E6EAF5", "#3E4FA8"], dark: ["#121A3A", "#0B1024", "#9AACFF"] },
    night: { light: ["#DDE1EA", "#F1F3F7", "#3E4FA8"], dark: ["#0B0F14", "#070A0E", "#9AB0FF"] }
  },
  override: "",
  stamp: "",
  now: null,

  phase(pin, date) {
    if (this.override) return this.override;
    const p = pin || currentPin();
    const now = date || new Date();
    const t = now.getHours() * 60 + now.getMinutes();
    const sun = Context.sunTimes(now, p.lat, p.lng);
    if (t >= sun.rise - 40 && t < sun.rise + 30) return "dawn";
    if (t >= sun.set - 60 && t < sun.set + 5) return "golden";
    if (t >= sun.set + 5 && t < sun.set + 40) return "blue";
    if (t >= sun.rise + 30 && t < sun.set - 60) return "day";
    return "night";
  },
  rgb(hex) {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  },
  hex(rgb) {
    return "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  },
  mix(a, b, t) {
    const x = this.rgb(a);
    const y = this.rgb(b);
    return this.hex(x.map((v, i) => v + (y[i] - v) * t));
  },
  // 같은 밝기의 회색 쪽으로 당겨 채도만 낮춘다.
  desat(hex, amt) {
    const c = this.rgb(hex);
    const g = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
    return this.hex(c.map((v) => v + (g - v) * amt));
  },
  colors(phase, weather, dark) {
    const set = (this.PALETTE[phase] || this.PALETTE.day)[dark ? "dark" : "light"];
    const dull = weather === "rain" || weather === "snow" ? 0.45 : weather === "cloudy" ? 0.25 : 0;
    const top = this.desat(set[0], dull);
    const bottom = this.desat(set[1], dull);
    const accent = this.desat(set[2], dull * 0.5);
    const paper = dark ? "#141A22" : "#FFFFFF";
    return {
      top: top,
      bottom: bottom,
      accent: accent,
      press: dark ? this.mix(accent, "#FFFFFF", 0.15) : this.mix(accent, "#000000", 0.15),
      fg: dark ? "#0B0F14" : "#FFFFFF",
      tint: this.mix(paper, accent, dark ? 0.16 : 0.1)
    };
  },
  accentRgba(alpha) {
    const c = this.rgb(this.now ? this.now.accent : "#3E4FA8");
    return "rgba(" + c.join(",") + "," + alpha + ")";
  },
  // 방문 당시의 맥락으로 그날의 하늘색을 되살린다 (서랍 카드).
  colorsFor(ctx) {
    const phase = (ctx && ctx.sky) || (ctx && ctx.golden ? "golden" : (ctx && ctx.phase === "night" ? "night" : "day"));
    return this.colors(phase, ctx && ctx.weather, phase === "night" || phase === "blue");
  },
  apply(pin) {
    const dark = document.body.classList.contains("night");
    const phase = this.phase(pin);
    const weather = Context.weatherNow();
    const sig = phase + "|" + weather + "|" + dark;
    if (sig === this.stamp) return;
    this.stamp = sig;
    const c = this.colors(phase, weather, dark);
    this.now = c;
    const s = document.body.style;
    s.setProperty("--sky-top", c.top);
    s.setProperty("--sky-bottom", c.bottom);
    s.setProperty("--accent", c.accent);
    s.setProperty("--accent-press", c.press);
    s.setProperty("--accent-fg", c.fg);
    s.setProperty("--tint", c.tint);
    document.body.dataset.sky = phase;
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", c.top);
  }
};
