// 아이템 재생: 입체 사운드스케이프, 장소 한정 음원, 시선 방향 도슨트, 게임(소리 찾기·동시 청취·술래잡기), 소리 레이더.
// 한 번에 하나만 재생한다. 본편(Player)과도 서로 끈다.
const Play = {
  cur: null,
  radarOn: false,
  radarT: 0,
  channel: null,
  peers: {},
  peerId: Math.random().toString(36).slice(2, 8),
  announceT: 0,

  active() { return !!this.cur; },
  isPlaying(id) { return !!(this.cur && this.cur.item.id === id); },
  // 시선 방향 기준 상대 각도(도). 방향 정보가 없으면 북쪽을 본다고 가정한다.
  relBearing(abs) {
    const h = Context.headingNow();
    return ((abs - (h == null ? 0 : h)) % 360 + 540) % 360 - 180;
  },
  bearingTo(from, to) {
    const dLng = (to.lng - from.lng) * Math.cos(from.lat * Math.PI / 180);
    const dLat = to.lat - from.lat;
    return (Math.atan2(dLng, dLat) * 180 / Math.PI + 360) % 360;
  },
  offset(pin, north, east) {
    return {
      lat: pin.lat + north / M_PER_DEG,
      lng: pin.lng + east / (M_PER_DEG * Math.cos(pin.lat * Math.PI / 180))
    };
  },
  level() {
    return Safety.duck() * Context.noiseGain();
  },
  stop() {
    const c = this.cur;
    this.cur = null;
    if (!c) return;
    (c.nodes || []).forEach((n) => {
      try { n.stop(); } catch (e) {}
      try { n.disconnect(); } catch (e) {}
    });
    if (c.el) {
      try { c.el.pause(); } catch (e) {}
      try { c.el.removeAttribute("src"); } catch (e) {}
    }
    if (c.kind === "docent") safeCancelSpeech();
    Feed.stamp = "";
  },
  begin(item, kind, dur) {
    if (state.mode !== "idle") quietStop();
    this.stop();
    const ctx = ensureAudio();
    if (ctx) { try { ctx.resume(); } catch (e) {} }
    this.cur = { item: item, kind: kind, t: 0, dur: dur, nodes: [], out: null, pan: null, done: "", line: -1 };
    Metrics.log("item_open", item.pin, { item: item.id, type: item.type });
    Native.metadata(pinById(item.pin), item.title || Feed.TYPE[item.type]);
    Feed.stamp = "";
    return ctx;
  },
  panner(ctx) {
    const p = ctx.createPanner();
    p.panningModel = "HRTF";
    p.distanceModel = "inverse";
    p.refDistance = 1;
    p.rolloffFactor = 0.6;
    return p;
  },
  place(p, relDeg, meters) {
    if (!p) return;
    const r = relDeg * Math.PI / 180;
    const m = Math.max(1, meters || 3);
    try {
      p.positionX.value = Math.sin(r) * m;
      p.positionZ.value = -Math.cos(r) * m;
      p.positionY.value = 0;
    } catch (e) {
      try { p.setPosition(Math.sin(r) * m, 0, -Math.cos(r) * m); } catch (err) {}
    }
  },
  noiseSource(ctx) {
    const src = ctx.createBufferSource();
    src.buffer = makeNoise(ctx);
    src.loop = true;
    return src;
  },
  // 필터 노이즈 + 박동으로 만든 합성 사운드스케이프. 소리는 bearing 방향에 고정된다.
  playScape(item, dest) {
    const body = item.body || {};
    const ctx = this.begin(item, "scape", body.duration_sec || 45);
    if (!ctx) return;
    const spec = body.filter || ["lowpass", 800, 0.7];
    const src = this.noiseSource(ctx);
    const f = ctx.createBiquadFilter();
    f.type = spec[0];
    f.frequency.value = spec[1];
    f.Q.value = spec[2];
    const g = ctx.createGain();
    g.gain.value = 0;
    const pan = this.panner(ctx);
    src.connect(f);
    f.connect(g);
    g.connect(pan);
    pan.connect(dest || audio.master);
    src.start();
    this.cur.nodes.push(src);
    if (body.rain) {
      const drops = this.noiseSource(ctx);
      const hf = ctx.createBiquadFilter();
      hf.type = "highpass";
      hf.frequency.value = 3500;
      const dg = ctx.createGain();
      dg.gain.value = 0.05;
      drops.connect(hf);
      hf.connect(dg);
      dg.connect(dest || audio.master);
      drops.start();
      this.cur.nodes.push(drops);
    }
    this.cur.out = g;
    this.cur.pan = pan;
    this.cur.bearing = body.bearing || 0;
  },
  playFile(item) {
    const body = item.body || {};
    this.begin(item, "file", body.duration_sec || 90);
    try {
      const el = new Audio(body.audio_url);
      el.loop = true;
      el.volume = 0.5;
      const started = el.play();
      if (started && started.catch) started.catch(() => {});
      this.cur.el = el;
    } catch (e) {}
  },
  docentLines(item) {
    const body = item.sealed ? Content.unsealed[item.id] : item.body;
    const lines = body && body.lines;
    if (!lines) return [];
    return lines[state.lang] || lines.ko || [];
  },
  playDocent(item) {
    const lines = this.docentLines(item);
    if (!lines.length) {
      if (item.body && item.body.audio_url) { this.playFile(item); return; }
      return;
    }
    const last = lines[lines.length - 1];
    this.begin(item, "docent", last.t + Math.max(8, Math.ceil(last.text.length / 7)));
  },
  speak(text) {
    unlockSpeech();
    state.speechWatch = { t0: performance.now(), beeped: false, ok: false };
    try {
      if (!window.speechSynthesis) throw new Error("no-speech");
      const u = new SpeechSynthesisUtterance(text);
      u.lang = state.lang === "en" ? "en-US" : "ko-KR";
      u.rate = 0.95;
      const voice = speechSynthesis.getVoices().find((v) => (state.lang === "en" ? /^en/i : /^ko/i).test(v.lang));
      if (voice) u.voice = voice;
      speechSynthesis.speak(u);
    } catch (e) {
      beep();
    }
  },
  currentLine() {
    const c = this.cur;
    if (!c || c.kind !== "docent") return null;
    const lines = this.docentLines(c.item);
    let idx = -1;
    lines.forEach((l, i) => { if (c.t >= l.t) idx = i; });
    return idx >= 0 ? Object.assign({ index: idx }, lines[idx]) : null;
  },
  // 소리 찾기: 숨은 소리의 실제 좌표를 향해 입체 음향이 움직인다.
  startHunt(item) {
    const body = item.body;
    const ctx = this.begin(item, "hunt", 600);
    if (!ctx) return;
    const pin = pinById(item.pin);
    this.cur.target = this.offset(pin, body.target.north, body.target.east);
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = body.freq || 110;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 420;
    const g = ctx.createGain();
    g.gain.value = 0;
    const pan = this.panner(ctx);
    o.connect(f);
    f.connect(g);
    g.connect(pan);
    pan.connect(audio.master);
    o.start();
    this.cur.nodes.push(o);
    this.cur.out = g;
    this.cur.pan = pan;
  },
  // 동시 청취: 벽시계 기준이라 같은 자리의 모든 사람이 같은 순간을 듣는다.
  discoPos(item) {
    const b = item.body;
    return ((Date.now() / 1000 - (b.epoch || 0)) % b.duration_sec + b.duration_sec) % b.duration_sec;
  },
  startDisco(item) {
    const ctx = this.begin(item, "disco", 99999);
    if (!ctx) return;
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = 220;
    const g = ctx.createGain();
    g.gain.value = 0;
    o.connect(g);
    g.connect(audio.master);
    o.start();
    const k = this.noiseSource(ctx);
    const kf = ctx.createBiquadFilter();
    kf.type = "lowpass";
    kf.frequency.value = 160;
    const kg = ctx.createGain();
    kg.gain.value = 0;
    k.connect(kf);
    kf.connect(kg);
    kg.connect(audio.master);
    k.start();
    this.cur.nodes.push(o, k);
    this.cur.out = g;
    this.cur.kick = kg;
    this.cur.osc = o;
  },
  // 술래잡기: 술래는 소리(심장 박동 간격)로만 알 수 있다. 실서비스에선 다른 참가자의 위치가 술래가 된다.
  startTag(item) {
    const body = item.body;
    if (Safety.quiet(pinById(item.pin))) return;
    const ctx = this.begin(item, "tag", body.survive_sec || 90);
    if (!ctx) return;
    const me = listenerPos();
    const ang = Math.random() * Math.PI * 2;
    this.cur.seeker = {
      lat: me.lat + Math.cos(ang) * body.start_m / M_PER_DEG,
      lng: me.lng + Math.sin(ang) * body.start_m / (M_PER_DEG * Math.cos(me.lat * Math.PI / 180))
    };
    this.cur.beatT = 0;
  },
  thump(freq, gain, dest) {
    const ctx = audio.ctx;
    if (!ctx) return;
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      g.gain.setValueAtTime(gain * this.level(), ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      o.connect(g);
      g.connect(dest || audio.master);
      o.start();
      o.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  },
  tick(real, scaled) {
    this.tickPeers(real);
    this.tickRadar(real);
    const c = this.cur;
    if (!c) return;
    const pin = pinById(c.item.pin);
    // 현장 콘텐츠는 반경을 벗어나면 멈춘다.
    if (!Access.evaluate(c.item, pin).open) {
      if (c.item.type === "game") { c.done = "out"; this.finish(); } else this.stop();
      return;
    }
    c.t += scaled;
    if (c.t >= c.dur) {
      if (c.kind === "tag") { c.done = "win"; Metrics.log("game_win", c.item.pin, { item: c.item.id }); }
      this.finish();
      return;
    }
    const lv = this.level();
    if (c.kind === "scape" && c.out) {
      const swell = 0.5 + 0.5 * Math.sin(c.t * 0.7);
      c.out.gain.value = (0.08 + 0.1 * swell) * lv * Math.min(1, c.t / 2) * Math.min(1, (c.dur - c.t) / 3);
      this.place(c.pan, this.relBearing(c.bearing), 3);
    } else if (c.kind === "file" && c.el) {
      try { c.el.volume = Math.min(1, 0.5 * lv); } catch (e) {}
    } else if (c.kind === "docent") {
      const line = this.currentLine();
      if (line && line.index !== c.line) {
        c.line = line.index;
        safeCancelSpeech();
        this.speak(line.text);
      }
    } else if (c.kind === "hunt" && c.out) {
      const me = listenerPos();
      const d = haversine(me, c.target);
      c.dist = d;
      const near = Math.max(0, 1 - d / 80);
      c.out.gain.value = (0.04 + 0.22 * near) * lv;
      this.place(c.pan, this.relBearing(this.bearingTo(me, c.target)), Math.max(1, d / 8));
      if (d <= (c.item.body.found_m || 7)) {
        c.done = "found";
        Metrics.log("game_win", c.item.pin, { item: c.item.id });
        this.finish();
      }
    } else if (c.kind === "disco" && c.out) {
      const b = c.item.body;
      const pos = this.discoPos(c.item);
      const beat = 60 / b.bpm;
      const ph = (pos % beat) / beat;
      const bar = Math.floor(pos / (beat * 4)) % 4;
      c.osc.frequency.value = [220, 247, 196, 175][bar];
      c.out.gain.value = (ph < 0.5 ? 0.06 : 0.03) * lv;
      c.kick.gain.value = (ph < 0.08 ? 0.5 : 0) * lv;
      c.pos = pos;
    } else if (c.kind === "tag") {
      const me = listenerPos();
      const b = c.item.body;
      const d = haversine(me, c.seeker);
      const step = Math.min(d, b.speed * scaled);
      if (d > 0.01) {
        c.seeker.lat += (me.lat - c.seeker.lat) * step / d;
        c.seeker.lng += (me.lng - c.seeker.lng) * step / d;
      }
      c.dist = d;
      c.beatT += real;
      const gap = Math.max(0.25, Math.min(1.6, d / 25));
      if (c.beatT >= gap) {
        c.beatT = 0;
        this.thump(55, 0.5);
        Haptics.play("tick");
      }
      if (d <= b.caught_m) { c.done = "caught"; this.finish(); }
    }
  },
  finish() {
    const c = this.cur;
    this.stop();
    if (c && c.done) Feed.result[c.item.id] = c.done;
    Feed.stamp = "";
  },
  // 같은 기기의 다른 탭을 '같은 자리의 다른 사람'으로 센다. 실서비스에서는 서버 presence 채널로 바꾼다.
  initPeers() {
    if (this.channel || typeof BroadcastChannel === "undefined") return;
    this.channel = new BroadcastChannel("janhyang-presence");
    this.channel.onmessage = (e) => {
      const m = e.data || {};
      if (!m.id || m.id === this.peerId) return;
      this.peers[m.id] = { pin: m.pin, inside: m.inside, at: Date.now() };
    };
  },
  tickPeers(real) {
    this.announceT += real;
    if (this.announceT < 2 || !this.channel) return;
    this.announceT = 0;
    try { this.channel.postMessage({ id: this.peerId, pin: state.pinId, inside: inside(currentPin()) }); } catch (e) {}
  },
  peerCount() {
    const now = Date.now();
    return Object.keys(this.peers).filter((id) => {
      const p = this.peers[id];
      return now - p.at < 6000 && p.pin === state.pinId && p.inside;
    }).length;
  },
  // 소리 레이더: 반경 밖에서 가까운 자리가 있으면 짧은 신호를 낸다. 가까울수록 자주.
  nearest() {
    const here = listenerPos();
    if (!here) return null;
    let best = null;
    Content.pinsIn(state.region).forEach((p) => {
      if (Safety.blockReason(p)) return;
      const d = haversine(here, p) - p.radius;
      if (d > 0 && (!best || d < best.d)) best = { pin: p, d: d };
    });
    return best;
  },
  tickRadar(real) {
    if (!this.radarOn || this.cur || state.mode !== "idle" || inside(currentPin())) return;
    const n = this.nearest();
    if (!n || n.d > 150) return;
    this.radarT += real;
    const gap = 0.6 + (n.d / 150) * 2.6;
    if (this.radarT < gap) return;
    this.radarT = 0;
    this.thump(660 + (150 - n.d) * 2, 0.04);
  }
};
