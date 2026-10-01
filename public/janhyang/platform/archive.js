// 서랍: 감각을 남기는 앨범. 방문마다 그 순간의 하늘색·날씨·소리 파형으로 카드를 만든다.
// 목록 / 지도 / 달력 보기와 '올해의 잔향' 결산.
const Archive = {
  stamp: "",
  view: "list",
  month: 0,
  recapUrl: "",
  WEATHER_GLYPH: {
    clear: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
    cloudy: '<path d="M7 18a4 4 0 1 1 1-7.9A5 5 0 0 1 17.5 11 3.5 3.5 0 0 1 17 18H7z"/>',
    rain: '<path d="M7 14a4 4 0 1 1 1-7.9A5 5 0 0 1 17.5 7 3.5 3.5 0 0 1 17 14H7z"/><path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2"/>',
    snow: '<path d="M7 14a4 4 0 1 1 1-7.9A5 5 0 0 1 17.5 7 3.5 3.5 0 0 1 17 14H7z"/><path d="M9 19h.01M13 19h.01M17 19h.01"/>'
  },

  ctxOf(keep, pin) {
    return (keep && keep.ctx) || (Presence.lastVisit(pin.id) || {}).ctx || null;
  },
  chips(keep, pin) {
    const out = [];
    const ctx = this.ctxOf(keep, pin);
    if (ctx) {
      out.push((Context.WEATHER[ctx.weather] || "") + (ctx.tempC != null ? " " + ctx.tempC + "°" : ""));
      out.push(Sky.NAMES[ctx.sky] || (ctx.golden ? "해 질 녘" : (ctx.phase === "night" ? "밤" : "낮")));
    }
    const dwell = (keep && keep.dwell) || ((Presence.lastVisit(pin.id) || {}).dwell);
    if (dwell) out.push(fmt(dwell) + " 머묾");
    const n = Presence.visitCount(pin.id);
    if (n > 1) out.push(n + "번째");
    if (readNote(pin.id)) out.push("흔적 남김");
    return out.filter(Boolean);
  },
  // 그 자리 소리의 첫 12초를 막대 48개로.
  wave(pin, night) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 96 16");
    svg.setAttribute("class", "keep-wave");
    svg.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 48; i++) {
      const v = Math.max(0.08, aLevel(pin.id, i * 0.25, night));
      const r = document.createElementNS(ns, "rect");
      r.setAttribute("x", String(i * 2));
      r.setAttribute("width", "1.2");
      r.setAttribute("y", String(8 - v * 7));
      r.setAttribute("height", String(Math.max(1, v * 14)));
      r.setAttribute("rx", "0.6");
      svg.appendChild(r);
    }
    return svg;
  },
  art(ctx) {
    const c = Sky.colorsFor(ctx);
    const box = document.createElement("span");
    box.className = "keep-art";
    box.style.background = "linear-gradient(160deg," + c.top + "," + c.bottom + ")";
    box.style.color = c.accent;
    box.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (this.WEATHER_GLYPH[(ctx && ctx.weather) || "clear"] || this.WEATHER_GLYPH.clear) + "</svg>";
    return box;
  },
  card(pin, keep, playing) {
    const on = playing === pin.id;
    const ctx = this.ctxOf(keep, pin);
    const card = document.createElement("article");
    card.className = on ? "keep playing" : "keep";
    const copy = document.createElement("div");
    copy.className = "keep-copy";
    const kicker = document.createElement("p");
    kicker.className = "keep-kicker";
    kicker.textContent = pin.alias + " · " + fmtDay(keep && keep.at);
    const h = document.createElement("h2");
    h.textContent = workOf(pin).afterglow;
    const chips = document.createElement("div");
    chips.className = "keep-chips";
    this.chips(keep, pin).forEach((c) => {
      const s = document.createElement("span");
      s.textContent = c;
      chips.appendChild(s);
    });
    copy.append(kicker, h, this.wave(pin, ctx && (ctx.phase === "night")), chips);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.echo = pin.id;
    btn.textContent = on ? "정지" : "30초";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", pin.alias + " 잔향 30초 " + (on ? "정지" : "듣기"));
    card.append(this.art(ctx), copy, btn);
    return card;
  },
  collection() {
    const zones = {};
    Content.allPins().forEach((p) => {
      if (p.drop || p.status === "STUDIO") return;
      const region = Content.region(Content.regionOf(p));
      const key = (region ? region.name + " · " : "") + (p.zone || "기타");
      const z = zones[key] || (zones[key] = { have: 0, all: 0 });
      z.all += 1;
      if (state.visited.includes(p.id)) z.have += 1;
    });
    return Object.keys(zones).map((k) => ({ name: k, have: zones[k].have, all: zones[k].all }));
  },
  sessions() {
    const out = [];
    Object.keys(Presence.visits).forEach((id) => (Presence.visits[id] || []).forEach((v) => out.push(Object.assign({ pin: id }, v))));
    (state.keeps || []).forEach((k) => {
      if (!k.at) return;
      if (out.some((v) => v.pin === k.pinId && Math.abs(new Date(v.at) - new Date(k.at)) < 120000)) return;
      out.push({ pin: k.pinId, at: k.at, dwell: k.dwell || 0, ctx: k.ctx });
    });
    return out.filter((v) => v.at && !Number.isNaN(new Date(v.at).getTime()));
  },
  recap() {
    const year = new Date().getFullYear();
    const list = this.sessions().filter((v) => new Date(v.at).getFullYear() === year);
    if (!list.length && !state.visited.length) return null;
    const sum = {};
    const weather = {};
    const sky = {};
    let total = 0;
    list.forEach((v) => {
      sum[v.pin] = (sum[v.pin] || 0) + (v.dwell || 0);
      total += v.dwell || 0;
      if (v.ctx && v.ctx.weather) weather[v.ctx.weather] = (weather[v.ctx.weather] || 0) + 1;
      if (v.ctx && v.ctx.sky) sky[v.ctx.sky] = (sky[v.ctx.sky] || 0) + 1;
    });
    const top = (o) => Object.keys(o).sort((a, b) => o[b] - o[a])[0];
    const longest = top(sum);
    return {
      year: year,
      places: state.visited.length,
      total: total,
      longest: longest ? pinById(longest) : null,
      longestSec: longest ? sum[longest] : 0,
      weather: top(weather),
      sky: top(sky)
    };
  },
  paintRecap(box) {
    const r = this.recap();
    box.replaceChildren();
    if (!r) return;
    const c = Sky.colors(r.sky || "golden", r.weather, true);
    const card = document.createElement("section");
    card.className = "recap";
    card.style.background = "linear-gradient(160deg," + c.top + "," + c.bottom + ")";
    const h = document.createElement("h2");
    h.textContent = r.year + "년의 잔향";
    const rows = [
      ["다녀간 자리", r.places + "곳"],
      ["머문 시간", fmt(r.total)],
      ["가장 오래 머문 곳", r.longest ? r.longest.alias + " · " + fmt(r.longestSec) : "—"],
      ["가장 자주 만난 날씨", Context.WEATHER[r.weather] || "—"],
      ["가장 많이 걸은 하늘", Sky.NAMES[r.sky] || "—"]
    ];
    const dl = document.createElement("dl");
    rows.forEach((row) => {
      const dt = document.createElement("dt");
      dt.textContent = row[0];
      const dd = document.createElement("dd");
      dd.textContent = row[1];
      dl.append(dt, dd);
    });
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "recap-save";
    btn.textContent = "이미지로 저장";
    card.append(h, dl, btn);
    box.appendChild(card);
  },
  // 1080×1350 결산 이미지. 공유 시트가 있으면 바로 공유, 없으면 내려받기.
  saveRecap() {
    const r = this.recap();
    if (!r) return;
    const cv = document.createElement("canvas");
    cv.width = 1080;
    cv.height = 1350;
    const g = cv.getContext("2d");
    const c = Sky.colors(r.sky || "golden", r.weather, true);
    const grad = g.createLinearGradient(0, 0, 0, 1350);
    grad.addColorStop(0, c.top);
    grad.addColorStop(1, c.bottom);
    g.fillStyle = grad;
    g.fillRect(0, 0, 1080, 1350);
    for (let i = 1; i <= 6; i++) {
      g.strokeStyle = c.accent;
      g.globalAlpha = 0.5 / i;
      g.lineWidth = 4;
      g.beginPath();
      g.arc(540, 420, 60 * i, 0, Math.PI * 2);
      g.stroke();
    }
    g.globalAlpha = 1;
    g.fillStyle = "#F4F7FB";
    g.font = "600 44px Pretendard, sans-serif";
    g.fillText("잔향", 80, 120);
    g.font = "700 88px Pretendard, sans-serif";
    g.fillText(r.year + "년의 잔향", 80, 800);
    g.font = "40px Pretendard, sans-serif";
    const lines = [
      r.places + "곳에 다녀갔고, " + fmt(r.total) + " 머물렀다.",
      r.longest ? "가장 오래 머문 곳: " + r.longest.alias : "",
      "자주 만난 날씨: " + (Context.WEATHER[r.weather] || "—") + " · 하늘: " + (Sky.NAMES[r.sky] || "—")
    ].filter(Boolean);
    lines.forEach((l, i) => g.fillText(l, 80, 900 + i * 64));
    g.fillStyle = c.accent;
    g.font = "600 34px Pretendard, sans-serif";
    g.fillText("소리는 그 자리에서만 · 잔향", 80, 1260);
    cv.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "janhyang-" + r.year + ".png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], text: r.year + "년의 잔향" }).catch(() => {});
        return;
      }
      if (this.recapUrl) URL.revokeObjectURL(this.recapUrl);
      this.recapUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = this.recapUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, "image/png");
  },
  paintMap(box) {
    box.replaceChildren();
    const ns = "http://www.w3.org/2000/svg";
    Content.regions.forEach((region) => {
      const pins = Content.allPins().filter((p) => Content.regionOf(p) === region.id && !p.drop);
      const seen = pins.filter((p) => state.visited.includes(p.id));
      const sec = document.createElement("section");
      sec.className = "keep-map";
      const h = document.createElement("h3");
      h.textContent = region.name + " · " + seen.length + "/" + pins.length;
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("viewBox", "0 0 320 180");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", region.name + "에서 다녀간 자리 " + seen.length + "곳");
      const b = region.bounds;
      const x0 = mercX(b.minLng);
      const x1 = mercX(b.maxLng);
      const y0 = mercY(b.maxLat);
      const y1 = mercY(b.minLat);
      const pt = (p) => [(mercX(p.lng) - x0) / (x1 - x0) * 320, (mercY(p.lat) - y0) / (y1 - y0) * 180];
      pins.forEach((p) => {
        const q = pt(p);
        const on = state.visited.includes(p.id);
        if (on) {
          const halo = document.createElementNS(ns, "circle");
          halo.setAttribute("cx", q[0].toFixed(1));
          halo.setAttribute("cy", q[1].toFixed(1));
          halo.setAttribute("r", "14");
          halo.setAttribute("class", "halo");
          svg.appendChild(halo);
        }
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", q[0].toFixed(1));
        dot.setAttribute("cy", q[1].toFixed(1));
        dot.setAttribute("r", on ? "4" : "2.5");
        dot.setAttribute("class", on ? "on" : "off");
        svg.appendChild(dot);
      });
      sec.append(h, svg);
      box.appendChild(sec);
    });
  },
  paintCalendar(box) {
    box.replaceChildren();
    const base = new Date();
    const first = new Date(base.getFullYear(), base.getMonth() + this.month, 1);
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const byDay = {};
    this.sessions().forEach((v) => {
      const d = new Date(v.at);
      if (d.getFullYear() !== first.getFullYear() || d.getMonth() !== first.getMonth()) return;
      (byDay[d.getDate()] = byDay[d.getDate()] || []).push(v);
    });
    const head = document.createElement("div");
    head.className = "cal-head";
    const prev = document.createElement("button");
    prev.type = "button";
    prev.dataset.month = "-1";
    prev.textContent = "‹";
    prev.setAttribute("aria-label", "이전 달");
    const title = document.createElement("b");
    title.textContent = first.getFullYear() + "년 " + (first.getMonth() + 1) + "월";
    const next = document.createElement("button");
    next.type = "button";
    next.dataset.month = "1";
    next.textContent = "›";
    next.setAttribute("aria-label", "다음 달");
    head.append(prev, title, next);
    const grid = document.createElement("div");
    grid.className = "cal-grid";
    ["일", "월", "화", "수", "목", "금", "토"].forEach((d) => {
      const s = document.createElement("span");
      s.className = "cal-dow";
      s.textContent = d;
      grid.appendChild(s);
    });
    for (let i = 0; i < first.getDay(); i++) grid.appendChild(document.createElement("span"));
    for (let d = 1; d <= days; d++) {
      const cell = document.createElement("span");
      cell.className = "cal-day";
      cell.textContent = String(d);
      const list = byDay[d];
      if (list) {
        cell.classList.add("has");
        const c = Sky.colorsFor(list[list.length - 1].ctx);
        cell.style.setProperty("--dot", c.accent);
        cell.setAttribute("aria-label", d + "일 · " + list.map((v) => pinById(v.pin).alias).join(", "));
        cell.title = list.map((v) => pinById(v.pin).alias).join(", ");
      }
      grid.appendChild(cell);
    }
    box.append(head, grid);
  },
  paint() {
    const vault = document.getElementById("vault");
    if (!vault || vault.hidden) return;
    const tab = document.querySelector('#tabs [data-tab="keeps"]');
    if (tab) tab.classList.remove("has-new");
    const count = document.getElementById("vault-count");
    const list = document.getElementById("vault-list");
    const stats = document.getElementById("vault-stats");
    if (!count || !list) return;
    const byId = {};
    (state.keeps || []).forEach((k) => { if (!byId[k.pinId]) byId[k.pinId] = k; });
    const playing = state.mode === "echo" ? state.pinId : "";
    const real = [];
    const rehearsal = [];
    state.visited.forEach((id) => {
      const pin = pinById(id);
      if (!pin || pin.id !== id) return;
      const keep = byId[id];
      if (keep && keep.rehearsal) rehearsal.push(pin);
      else real.push(pin);
    });
    const sig = [real.map((p) => p.id).join(","), rehearsal.map((p) => p.id).join(","), playing, Content.ready, this.view, this.month, JSON.stringify(Discover.progress)].join("|");
    if (sig === this.stamp && (list.childElementCount || !(real.length + rehearsal.length))) return;
    this.stamp = sig;
    document.querySelectorAll("#vault-views button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === this.view ? "true" : "false"));
    count.textContent = real.length || rehearsal.length ? (real.length + rehearsal.length) + "곳의 잔향" : "아직 없어요";
    const recap = document.getElementById("vault-recap");
    if (recap) this.paintRecap(recap);
    if (stats) {
      stats.replaceChildren();
      this.collection().forEach((z) => {
        if (!z.have && z.all < 2) return;
        const row = document.createElement("div");
        row.className = "zone";
        const name = document.createElement("span");
        name.textContent = z.name;
        const meter = document.createElement("i");
        const fill = document.createElement("b");
        fill.style.width = (z.have / z.all * 100) + "%";
        meter.appendChild(fill);
        const n = document.createElement("small");
        n.textContent = z.have + "/" + z.all;
        row.append(name, meter, n);
        stats.appendChild(row);
      });
      const done = Content.courses.filter((c) => Discover.courseStep(c) >= c.pins.length);
      if (done.length) {
        const badge = document.createElement("p");
        badge.className = "keep-label";
        badge.textContent = "완주한 코스 · " + done.map((c) => c.title).join(", ");
        stats.appendChild(badge);
      }
    }
    list.replaceChildren();
    if (this.view === "map") { this.paintMap(list); return; }
    if (this.view === "calendar") { this.paintCalendar(list); return; }
    if (!real.length && !rehearsal.length) {
      const empty = document.createElement("p");
      empty.className = "keep-empty";
      empty.textContent = "자리에 도착해 15초 이상 들으면, 그날의 하늘색으로 여기에 남아요.";
      list.appendChild(empty);
    }
    real.forEach((p) => list.appendChild(this.card(p, byId[p.id], playing)));
    if (rehearsal.length) {
      const label = document.createElement("p");
      label.className = "keep-label";
      label.textContent = "리허설";
      list.appendChild(label);
      rehearsal.forEach((p) => list.appendChild(this.card(p, byId[p.id], playing)));
    }
  }
};
