// 플랫폼 계층을 기존 엔진(engine.js)에 잇는다. engine.js의 init / render / tick / bind가 여기를 부른다.
const Platform = {
  REF_KEY: "janhyang-ref",
  CREATOR_KEY: "janhyang-creator",
  pendingPin: "",
  pendingCheckin: null,
  simLine: 0,

  init() {
    Presence.load();
    Safety.load();
    Discover.load();
    Stage.load();
    Permit.load();
    let creator = false;
    try { creator = localStorage.getItem(this.CREATOR_KEY) === "1"; } catch (e) {}
    this.setCreator(creator || /(^|[#&])dev(&|$)/.test((location.hash || "").replace(/^#/, "")));
    state.region = "seongsu";
    state.channel = Discover.channelOverride || "local";
    Play.initPeers();
    this.readHash();
    Content.onReady = () => this.ready();
    Content.load();
  },
  // 공유 클립 링크로 들어오면 출처를 기억해 두었다가, 그 자리를 실제로 방문하면 '공유 → 방문'으로 센다.
  readHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    const params = new URLSearchParams(hash);
    const pin = params.get("pin");
    if (params.get("from") === "clip" && pin) {
      try { localStorage.setItem(this.REF_KEY, JSON.stringify({ pin: pin, at: Date.now() })); } catch (e) {}
      Metrics.log("share_open", pin);
      this.pendingPin = pin;
    }
    const checkin = params.get("checkin");
    if (checkin && checkin.indexOf(":") !== -1) {
      const parts = checkin.split(":");
      this.pendingCheckin = { pin: parts[0], code: parts[1] };
      this.pendingPin = parts[0];
    }
  },
  ready() {
    const region = document.getElementById("region");
    if (region) {
      region.replaceChildren();
      Content.regions.forEach((r) => {
        const o = document.createElement("option");
        o.value = r.id;
        o.textContent = r.name;
        region.appendChild(o);
      });
    }
    const pinSel = document.getElementById("pin");
    if (pinSel) {
      Content.pins.forEach((p) => {
        if ([...pinSel.options].some((o) => o.value === p.id)) return;
        const o = document.createElement("option");
        o.value = p.id;
        o.textContent = p.id + " " + p.alias;
        pinSel.appendChild(o);
      });
    }
    const target = this.pendingPin && pinById(this.pendingPin).id === this.pendingPin ? this.pendingPin : "";
    Discover.setRegion(target ? Content.regionOf(pinById(target)) : state.region);
    if (target) {
      selectPin(target);
      state.sheetOpen = true;
    }
    if (this.pendingCheckin) {
      Presence.checkin(this.pendingCheckin.pin, this.pendingCheckin.code);
      onPositionChanged();
    }
    this.pendingPin = "";
    this.pendingCheckin = null;
    syncPlatformMarkers();
    Feed.stamp = "";
    Archive.stamp = "";
    render();
    drawMap();
  },
  // 리허설·스튜디오·지표·화면 밖 미리보기는 사용자 기능이 아니라 만드는 사람의 도구.
  setCreator(on) {
    document.documentElement.classList.toggle("creator", !!on);
    try { localStorage.setItem(this.CREATOR_KEY, on ? "1" : "0"); } catch (e) {}
    const box = document.getElementById("set-creator");
    if (box) box.checked = !!on;
    if (!on && activeTab === "work") showTab("map");
  },
  openSettings() {
    const sheet = document.getElementById("settings");
    if (!sheet) return;
    const set = (id, v) => { const el = document.getElementById(id); if (el) { if (el.type === "checkbox") el.checked = v; else el.value = v; } };
    set("disc-channel", Discover.channelOverride || "");
    set("disc-lang", state.lang);
    set("disc-radar", Play.radarOn);
    set("set-approach", Stage.approachOn);
    set("vault-share", Safety.privacy.shareVisits);
    set("set-creator", document.documentElement.classList.contains("creator"));
    sheet.hidden = false;
    const close = document.getElementById("settings-close");
    if (close) close.focus();
  },
  closeSettings() {
    const sheet = document.getElementById("settings");
    if (sheet) sheet.hidden = true;
    const menu = document.getElementById("menu");
    if (menu) menu.focus();
  },
  onVisit(pinId) {
    Stage.fly(pinById(pinId));
    Metrics.log("visit", pinId);
    Discover.onVisit(pinId);
    try {
      const ref = JSON.parse(localStorage.getItem(this.REF_KEY) || "null");
      if (ref && ref.pin === pinId) {
        Metrics.log("share_visit", pinId);
        localStorage.removeItem(this.REF_KEY);
      }
    } catch (e) {}
  },
  tick(real, scaled) {
    Presence.tick(real, scaled);
    Play.tick(real, scaled);
    Stage.tick(real);
    Context.readNoise();
  },
  render(pin, insideNow) {
    const ctxLine = document.getElementById("ctx-line");
    if (ctxLine) {
      const parts = [Context.label(pin)];
      if (insideNow) parts.push("머문 시간 " + fmt(Presence.dwellOf(pin.id)));
      const n = Presence.visitCount(pin.id);
      if (n) parts.push(n + "번째 방문");
      const conf = Presence.confirming(pin);
      if (conf) parts.push("위치 확인 중 " + Math.ceil(conf) + "초");
      if (Presence.checkedIn(pin.id)) parts.push("QR 체크인");
      if (pin.drop) parts.push("드롭 · " + Discover.dropText(pin));
      ctxLine.textContent = parts.join(" · ");
    }
    const box = document.getElementById("notices");
    if (box) {
      const list = Safety.notices(pin);
      const sig = list.map((n) => n.kind + n.text).join("|");
      if (box.dataset.sig !== sig) {
        box.dataset.sig = sig;
        box.replaceChildren();
        list.forEach((n) => {
          const p = document.createElement("p");
          p.className = "notice " + n.kind;
          p.textContent = n.text;
          if (n.alt) {
            const b = document.createElement("button");
            b.type = "button";
            b.dataset.go = n.alt;
            b.textContent = "그쪽으로";
            p.appendChild(b);
          }
          box.appendChild(p);
        });
      }
    }
    // 밤에 닫힌 자리는 본편 버튼도 잠근다.
    const action = document.getElementById("action");
    if (action) action.disabled = !!Safety.blockReason(pin) && state.mode === "idle";
    Discover.paint();
    Native.paint();
    // 본편 원고: 들을 수 있는 자리(반경 안이거나 다녀간 자리)에서만.
    const tToggle = document.getElementById("transcript-toggle");
    const tList = document.getElementById("transcript");
    if (tToggle && tList) {
      const can = showScript(pin);
      tToggle.hidden = !can;
      if (!can && !tList.hidden) { tList.hidden = true; tToggle.setAttribute("aria-expanded", "false"); }
      if (!tList.hidden && tList.dataset.key !== keyOf()) this.fillTranscript(pin);
    }
    const noise = document.getElementById("noise-hint");
    if (noise) noise.hidden = !(insideNow && (state.mode === "main" || Play.active()) && !Context.noise.on && !Permit.later.mic);
    const metrics = document.getElementById("metrics");
    if (metrics && !metrics.hidden && Math.floor(performance.now() / 1000) !== this.simLine) {
      this.simLine = Math.floor(performance.now() / 1000);
      Metrics.paint();
    }
    const read = document.getElementById("sim-readout");
    if (read && activeTab === "work") {
      read.textContent = "지역 " + state.region + " · " + state.channel + " · 오차 " + Presence.accuracy() + "m · 체류 " + fmt(Presence.dwellOf(pin.id)) +
        " · 방문 " + Presence.visitCount(pin.id) + " · 인원 " + Context.group() + " · 붐빔 " + Context.occupancy(pin) + "/" + Safety.policy(pin).capacity +
        " · 시선 " + (Context.headingNow() == null ? "—" : Math.round(Context.headingNow()) + "°") + " · " + Context.motionNow() +
        (Context.noise.level != null ? " · 소음 " + Math.round(Context.noise.level) : "") + (Presence.trusted() ? "" : " · 위치 신뢰 낮음");
    }
  },
  fillTranscript(pin) {
    const list = document.getElementById("transcript");
    if (!list) return;
    list.dataset.key = keyOf();
    list.replaceChildren();
    pieceOf(pin).B.forEach((row) => {
      const li = document.createElement("li");
      const t = document.createElement("span");
      t.textContent = fmt(row.start);
      li.append(t, document.createTextNode(row.text));
      list.appendChild(li);
    });
  },
  bind() {
    const on = (id, ev, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(ev, fn);
    };
    Permit.bind();
    // 첫 터치에서 오디오를 깨워 둔다. 그래야 다가갈 때 소리가 저절로 커질 수 있다.
    const wake = () => {
      const ctx = ensureAudio();
      if (ctx) { try { ctx.resume(); } catch (err) {} }
      window.removeEventListener("pointerdown", wake);
    };
    window.addEventListener("pointerdown", wake);
    on("menu", "click", () => this.openSettings());
    on("settings-close", "click", () => this.closeSettings());
    on("settings", "click", (e) => { if (e.target.id === "settings") this.closeSettings(); });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!document.getElementById("permit").hidden) Permit.answer(false);
      else if (!document.getElementById("settings").hidden) this.closeSettings();
    });
    on("set-approach", "change", (e) => {
      Stage.approachOn = !!e.target.checked;
      if (!Stage.approachOn) Stage.stopAmbience();
      Stage.save();
    });
    on("set-creator", "change", (e) => this.setCreator(e.target.checked));
    on("transcript-toggle", "click", (e) => {
      const list = document.getElementById("transcript");
      const open = list.hidden;
      if (open) this.fillTranscript(currentPin());
      list.hidden = !open;
      e.currentTarget.setAttribute("aria-expanded", open ? "true" : "false");
      e.currentTarget.textContent = open ? "원고 닫기" : "원고";
    });
    on("arrival", "click", () => Stage.endArrival());
    on("follow-me", "click", () => {
      Permit.ask("location", () => { LocationSource.useForeground(); return true; });
    });
    on("noise-hint", "click", () => {
      Permit.ask("mic", () => Context.enableNoise().then((ok) => {
        Safety.privacy.noise = ok;
        Safety.save();
        return ok;
      }));
    });
    on("tabs", "click", (e) => {
      const b = e.target.closest('[data-tab="keeps"]');
      if (b) b.classList.remove("has-new");
    });
    on("vault-views", "click", (e) => {
      const b = e.target.closest("button[data-view]");
      if (!b) return;
      Archive.view = b.dataset.view;
      Archive.stamp = "";
      Archive.paint();
    });
    on("vault", "click", (e) => {
      const m = e.target.closest("button[data-month]");
      if (m) {
        Archive.month += Number(m.dataset.month);
        Archive.stamp = "";
        Archive.paint();
        return;
      }
      if (e.target.closest("#recap-save")) Archive.saveRecap();
    });
    on("clip-cam", "change", (e) => {
      if (!e.target.checked) return;
      const box = e.target;
      Permit.ask("camera", () => true).then((ok) => { if (!ok) box.checked = false; });
    });
    on("clip-sticker", "click", () => Clip.sticker());
    on("fog-sticker", "click", () => Clip.sticker());
    on("sim-sky", "change", (e) => {
      Sky.override = e.target.value;
      Sky.stamp = "";
    });
    on("region", "change", (e) => Discover.setRegion(e.target.value));
    on("disc-channel", "change", (e) => Discover.setChannel(e.target.value));
    on("disc-lang", "change", (e) => {
      state.lang = e.target.value === "en" ? "en" : "ko";
      Discover.save();
      Feed.stamp = "";
      if (Play.cur && Play.cur.kind === "docent") Play.stop();
    });
    on("disc-radar", "change", (e) => {
      Play.radarOn = !!e.target.checked;
      if (Play.radarOn) { const ctx = ensureAudio(); if (ctx) { try { ctx.resume(); } catch (err) {} } }
      Discover.save();
    });
    on("disc-sensors", "click", (e) => {
      const b = e.currentTarget;
      Context.enableSensors().then((ok) => { b.textContent = ok ? "센서 켜짐" : "센서를 쓸 수 없어요"; });
    });
    const goTo = (e) => {
      const b = e.target.closest("[data-go]");
      if (!b || b.disabled) return;
      Discover.go(b.dataset.go);
    };
    on("discover", "click", goTo);
    on("notices", "click", goTo);
    on("pfeed", "click", (e) => Feed.onClick(e));
    on("pfeed", "input", (e) => Feed.onInput(e));
    on("pfeed", "submit", (e) => Feed.onSubmit(e));
    on("vault-share", "change", (e) => {
      Safety.privacy.shareVisits = !!e.target.checked;
      Safety.save();
    });
    on("clip-open", "click", () => {
      document.getElementById("fog").hidden = true;
      Clip.open();
    });
    on("clip-rec", "click", () => Clip.start());
    on("clip-close", "click", () => Clip.close());
    on("clip-share", "click", () => Clip.share());
    on("clip", "click", (e) => { if (e.target.id === "clip") Clip.close(); });
    const sim = (id, key, parse) => on(id, "change", (e) => {
      state.rehearsalArmed = true;
      Context.override[key] = parse(e.target.value);
      Feed.stamp = "";
      onPositionChanged();
    });
    sim("sim-weather", "weather", (v) => v);
    sim("sim-golden", "golden", (v) => v);
    sim("sim-motion", "motion", (v) => v);
    sim("sim-group", "group", (v) => (v === "" ? null : Number(v)));
    sim("sim-occ", "occupancy", (v) => (v === "" ? null : Number(v)));
    sim("sim-acc", "accuracy", (v) => Number(v) || 0);
    on("sim-heading", "input", (e) => {
      const v = Number(e.target.value);
      Context.override.heading = v < 0 ? null : v;
      const read = document.getElementById("sim-heading-read");
      if (read) read.textContent = v < 0 ? "센서" : v + "° " + approachWordDeg(v);
    });
    document.querySelectorAll("[data-move]").forEach((b) => b.addEventListener("click", () => {
      if (state.useGps) return;
      state.rehearsalArmed = true;
      clearLayoutHold();
      const k = b.dataset.move;
      if (k === "n") state.distanceM += 5;
      if (k === "s") state.distanceM -= 5;
      if (k === "e") state.simEast += 5;
      if (k === "w") state.simEast -= 5;
      state.distanceM = clamp(state.distanceM, -400, 400);
      const read = document.getElementById("sim-east");
      if (read) read.textContent = "동서 " + state.simEast + "m";
      onPositionChanged();
    }));
    on("sim-visit", "click", () => {
      Presence.addPastVisit(state.pinId);
      if (!state.visited.includes(state.pinId)) state.visited.unshift(state.pinId);
      Feed.stamp = "";
      Archive.stamp = "";
      render();
    });
    on("sim-spoof", "click", () => {
      const here = listenerPos() || currentPin();
      const t = Date.now();
      Presence.lastFix = null;
      Presence.observeFix({ lat: here.lat, lng: here.lng, t: t });
      Presence.observeFix({ lat: here.lat + 0.05, lng: here.lng, t: t + 1000 });
      Feed.stamp = "";
      onPositionChanged();
    });
    on("sim-prefetch", "click", (e) => {
      const b = e.currentTarget;
      b.textContent = "받는 중";
      Content.prefetch(state.region).then((n) => { b.textContent = n + "개 받음 · 키는 현장에서"; }).catch(() => { b.textContent = "받기 실패"; });
    });
    on("sim-noise", "click", (e) => {
      const b = e.currentTarget;
      if (Context.noise.on) {
        Context.disableNoise();
        Safety.privacy.noise = false;
        Safety.save();
        b.textContent = "주변 소음 맞춤";
        return;
      }
      Permit.ask("mic", () => Context.enableNoise().then((ok) => {
        Safety.privacy.noise = ok;
        Safety.save();
        b.textContent = ok ? "소음 맞춤 끄기" : "마이크를 쓸 수 없어요";
        return ok;
      }));
    });
    on("sim-reset", "click", () => {
      if (!confirm("이 기기의 체류·방문·코스·지표 기록을 지웁니다.")) return;
      Presence.reset();
      Discover.progress = {};
      Discover.save();
      Metrics.clear();
      state.visited = [];
      state.keeps = [];
      save();
      Feed.stamp = "";
      Archive.stamp = "";
      Discover.stamp = "";
      render();
    });
    const pressed = (sample) => {
      Metrics.sample = sample;
      document.getElementById("metrics-local").setAttribute("aria-pressed", sample ? "false" : "true");
      document.getElementById("metrics-sample").setAttribute("aria-pressed", sample ? "true" : "false");
      Metrics.paint();
    };
    on("metrics-local", "click", () => pressed(false));
    on("metrics-sample", "click", () => pressed(true));
    on("metrics-clear", "click", () => {
      if (!confirm("이 기기의 지표 기록을 지웁니다.")) return;
      Metrics.clear();
      Metrics.paint();
    });
  }
};
