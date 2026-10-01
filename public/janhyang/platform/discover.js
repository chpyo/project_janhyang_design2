// 발견: 안개 지도, 드롭(기간 한정 핀), 코스, 단서, 지역 전환(로컬 탐색 / 관광 안내).
const Discover = {
  KEY: "janhyang-discover",
  progress: {},
  channelOverride: "",
  stamp: "",

  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      if (d.progress && typeof d.progress === "object") this.progress = d.progress;
      if (d.channel === "local" || d.channel === "tour") this.channelOverride = d.channel;
      if (d.lang === "en" || d.lang === "ko") state.lang = d.lang;
      Play.radarOn = d.radar === true;
    } catch (e) {}
  },
  save() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify({ progress: this.progress, channel: this.channelOverride, lang: state.lang, radar: Play.radarOn }));
    } catch (e) {}
  },
  hash(s) {
    let h = 7;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  },
  // 로컬 탐색에서는 가 보지 않은 자리의 정확한 위치를 숨기고 단서 원만 보여 준다.
  fogged(pin) {
    if (state.channel !== "local") return false;
    if (state.visited.includes(pin.id) || Presence.visitCount(pin.id) > 0) return false;
    return !inside(pin);
  },
  fogCenter(pin) {
    const h = this.hash(pin.id);
    const ang = (h % 360) * Math.PI / 180;
    const m = 18 + (h >> 9) % 15;
    return {
      lat: pin.lat + Math.cos(ang) * m / M_PER_DEG,
      lng: pin.lng + Math.sin(ang) * m / (M_PER_DEG * Math.cos(pin.lat * Math.PI / 180))
    };
  },
  fogRadius(pin) { return pin.radius + 20; },
  mins(s) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(s || "");
    return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
  },
  dropState(pin, date) {
    const d = pin && pin.drop;
    if (!d) return { open: true };
    const now = date || new Date();
    const t = now.getHours() * 60 + now.getMinutes();
    const from = this.mins(d.from);
    const to = this.mins(d.to);
    if (d.days.indexOf(now.getDay()) !== -1 && t >= from && t < to) return { open: true, endsIn: to - t };
    for (let k = 0; k < 8; k++) {
      const day = (now.getDay() + k) % 7;
      if (d.days.indexOf(day) === -1) continue;
      if (k === 0 && t >= from) continue;
      return { open: false, startsIn: k * 1440 + from - t };
    }
    return { open: false, startsIn: null };
  },
  span(mins) {
    if (mins == null) return "";
    if (mins >= 1440) return Math.floor(mins / 1440) + "일 " + Math.floor((mins % 1440) / 60) + "시간";
    if (mins >= 60) return Math.floor(mins / 60) + "시간 " + (mins % 60) + "분";
    return mins + "분";
  },
  dropText(pin) {
    const s = this.dropState(pin);
    if (s.open) return "열림 · " + this.span(s.endsIn) + " 남음";
    return s.startsIn == null ? "일정 없음" : this.span(s.startsIn) + " 뒤 열림";
  },
  course(id) { return Content.courses.find((c) => c.id === id) || null; },
  courseStep(course) { return Math.min(course.pins.length, this.progress[course.id] || 0); },
  onVisit(pinId) {
    Content.courses.forEach((c) => {
      const step = this.courseStep(c);
      if (step >= c.pins.length || c.pins[step] !== pinId) return;
      this.progress[c.id] = step + 1;
      Metrics.log("course_step", pinId, { course: c.id, step: step + 1 });
      if (step + 1 === c.pins.length) Metrics.log("course_done", pinId, { course: c.id });
    });
    this.save();
  },
  setRegion(id) {
    const r = Content.region(id);
    if (!r) return;
    state.region = r.id;
    state.channel = this.channelOverride || r.channel;
    setView(r.bounds);
    Context.fetchWeather(r);
    const sel = document.getElementById("region");
    if (sel) sel.value = r.id;
    if (currentPin() && Content.regionOf(currentPin()) !== r.id) {
      selectPin(r.first_pin);
      state.distanceM = pinById(r.first_pin).radius + 80;
      onPositionChanged();
    }
    if (nmap.map && window.naver) nmap.map.panTo(new naver.maps.LatLng(r.center[0], r.center[1]));
    syncPlatformMarkers();
    this.stamp = "";
    Feed.stamp = "";
    Metrics.log("region", state.pinId, { region: r.id });
  },
  setChannel(ch) {
    this.channelOverride = ch === "local" || ch === "tour" ? ch : "";
    const r = Content.region(state.region);
    state.channel = this.channelOverride || (r ? r.channel : "local");
    this.save();
    this.stamp = "";
    Feed.stamp = "";
  },
  distBand(pin) {
    const here = listenerPos();
    if (!here) return "";
    const d = haversine(here, pin);
    if (d < 100) return "100m 안";
    if (d < 300) return "300m 안";
    if (d < 1000) return Math.round(d / 100) * 100 + "m";
    return (d / 1000).toFixed(1) + "km";
  },
  go(pinId) {
    if (pinId !== state.pinId) selectPin(pinId);
    state.sheetOpen = true;
    showTab("map");
  },
  row(title, sub, meta, pinId) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "disc-row";
    if (pinId) btn.dataset.go = pinId;
    const copy = document.createElement("div");
    const h = document.createElement("b");
    h.textContent = title;
    const p = document.createElement("span");
    p.textContent = sub;
    copy.append(h, p);
    const m = document.createElement("small");
    m.textContent = meta || "";
    btn.append(copy, m);
    return btn;
  },
  paint() {
    const root = document.getElementById("discover");
    if (!root || root.hidden || !Content.ready) return;
    const minute = Math.floor(Date.now() / 60000);
    const sig = [state.region, state.channel, state.lang, Play.radarOn, state.visited.join(","), JSON.stringify(this.progress), minute, Context.sensorsOn].join("|");
    if (sig === this.stamp) return;
    this.stamp = sig;
    const ch = document.getElementById("disc-channel");
    if (ch) ch.value = this.channelOverride || "";
    const lang = document.getElementById("disc-lang");
    if (lang) lang.value = state.lang;
    const radar = document.getElementById("disc-radar");
    if (radar) radar.checked = Play.radarOn;
    const region = Content.region(state.region);
    const all = Content.allPins().filter((p) => Content.regionOf(p) === state.region);

    const drops = document.getElementById("disc-drops");
    drops.replaceChildren();
    const dropPins = all.filter((p) => p.drop);
    if (!dropPins.length) drops.appendChild(this.empty("이 지역에는 지금 드롭이 없어요."));
    dropPins.forEach((p) => {
      const st = this.dropState(p);
      const row = this.row(p.drop.title + " · " + (this.fogged(p) ? "단서: " + p.find_hint : p.alias), p.drop.from + "–" + p.drop.to + " · " + this.days(p.drop.days), this.dropText(p), st.open ? p.id : "");
      row.classList.toggle("live", st.open);
      row.disabled = !st.open;
      drops.appendChild(row);
    });

    const courses = document.getElementById("disc-courses");
    courses.replaceChildren();
    const list = Content.courses.filter((c) => c.region === state.region);
    if (!list.length) courses.appendChild(this.empty("이 지역에는 코스가 없어요."));
    list.forEach((c) => {
      const step = this.courseStep(c);
      const box = document.createElement("article");
      box.className = "course";
      const h = document.createElement("h3");
      h.textContent = c.title;
      const dek = document.createElement("p");
      dek.textContent = c.dek;
      const meter = document.createElement("div");
      meter.className = "course-meter";
      const fill = document.createElement("i");
      fill.style.width = (step / c.pins.length * 100) + "%";
      meter.appendChild(fill);
      const ol = document.createElement("ol");
      c.pins.forEach((id, i) => {
        const p = pinById(id);
        const li = document.createElement("li");
        const b = document.createElement("button");
        b.type = "button";
        b.dataset.go = id;
        b.textContent = (i < step ? "✓ " : (i === step ? "→ " : "")) + (this.fogged(p) ? "단서: " + p.find_hint : p.alias);
        b.className = i < step ? "done" : (i === step ? "next" : "");
        li.appendChild(b);
        ol.appendChild(li);
      });
      const st = document.createElement("small");
      st.textContent = step >= c.pins.length ? "완주 · 보상 콘텐츠가 열렸어요" : step + "/" + c.pins.length + " · 다음 자리로";
      box.append(h, dek, meter, ol, st);
      courses.appendChild(box);
    });

    const hints = document.getElementById("disc-hints");
    hints.replaceChildren();
    const fog = all.filter((p) => !p.drop && this.fogged(p));
    const open = all.filter((p) => !p.drop && !this.fogged(p));
    if (state.channel === "local") {
      fog.slice(0, 12).forEach((p) => hints.appendChild(this.row(p.find_hint || "이름 없는 자리", (p.zone || "") + " · " + approachWord(p), this.distBand(p), p.id)));
      if (!fog.length) hints.appendChild(this.empty("이 지역의 단서를 모두 풀었어요."));
    } else {
      open.forEach((p) => hints.appendChild(this.row(p.alias, p.zone + " · " + p.find_hint, this.distBand(p), p.id)));
    }
    const label = document.getElementById("disc-hints-label");
    if (label) label.textContent = state.channel === "local" ? "단서 · " + fog.length + "곳 남음" : "안내 지점";
    const where = document.getElementById("disc-where");
    if (where) where.textContent = (region ? region.name : "") + " · " + (state.channel === "local" ? "로컬 탐색" : "관광 안내") + " · " + Context.label();
  },
  days(days) {
    const names = ["일", "월", "화", "수", "목", "금", "토"];
    return days.length === 7 ? "매일" : days.map((d) => names[d]).join("·");
  },
  empty(text) {
    const p = document.createElement("p");
    p.className = "disc-empty";
    p.textContent = text;
    return p;
  },
  // 로컬 탐색의 안개: 지도 전체에 옅은 안개를 깔고, 다녀간 자리만 영구히 걷어 낸다.
  mistCanvas: null,
  drawMist(g, w, h, night) {
    if (state.channel !== "local") return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const m = this.mistCanvas || (this.mistCanvas = document.createElement("canvas"));
    if (m.width !== Math.floor(w * dpr) || m.height !== Math.floor(h * dpr)) {
      m.width = Math.floor(w * dpr);
      m.height = Math.floor(h * dpr);
    }
    const mg = m.getContext("2d");
    mg.setTransform(dpr, 0, 0, dpr, 0, 0);
    mg.globalCompositeOperation = "source-over";
    mg.clearRect(0, 0, w, h);
    mg.fillStyle = night ? "rgba(7,10,14,.42)" : "rgba(244,247,251,.5)";
    mg.fillRect(0, 0, w, h);
    mg.globalCompositeOperation = "destination-out";
    const clear = (lat, lng, meters) => {
      const q = project(lat, lng);
      const r = Math.max(10, radiusPx(lat, lng, meters));
      const grad = mg.createRadialGradient(q[0], q[1], r * 0.35, q[0], q[1], r);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      mg.fillStyle = grad;
      mg.beginPath();
      mg.arc(q[0], q[1], r, 0, Math.PI * 2);
      mg.fill();
    };
    mapPins().forEach((p) => {
      if (state.visited.includes(p.id) || Presence.visitCount(p.id) > 0) clear(p.lat, p.lng, p.radius + 70);
    });
    const here = listenerPos();
    if (here) clear(here.lat, here.lng, 45);
    mg.globalCompositeOperation = "source-over";
    g.drawImage(m, 0, 0, w, h);
  },
  drawRegionSketch(g, region, w, h, night) {
    const sk = region.sketch || {};
    g.fillStyle = night ? "rgba(244, 244, 241, .05)" : "rgba(20, 20, 20, .04)";
    (sk.areas || []).forEach((a) => {
      const q = project(a[0], a[1]);
      g.beginPath();
      g.ellipse(q[0], q[1], w * a[2], h * a[3], 0, 0, Math.PI * 2);
      g.fill();
    });
    g.strokeStyle = night ? "rgba(244, 244, 241, .6)" : "rgba(20, 20, 20, .5)";
    g.lineWidth = 3;
    g.lineCap = "round";
    (sk.lines || []).forEach((line) => strokeRoad(g, line));
    g.fillStyle = night ? "rgba(244, 244, 241, .7)" : "rgba(20, 20, 20, .62)";
    g.font = "12px ui-sans-serif, sans-serif";
    (sk.labels || []).forEach((lb) => {
      const q = project(lb[1], lb[2]);
      g.fillText(lb[0], q[0], q[1]);
    });
  }
};
