// 현장 클립: 그 자리에서 찍은 15초 영상(또는 생성 화면)에 공간의 소리를 입혀 숏폼으로 내보낸다.
// 공유되는 건 증거와 티저, 본편은 여전히 그 자리에서만.
const Clip = {
  SECONDS: 15,
  rec: null,
  url: "",
  blob: null,
  cam: null,
  busy: false,

  link(pin) {
    return location.origin + "/#from=clip&pin=" + encodeURIComponent(pin.id);
  },
  open() {
    const box = document.getElementById("clip");
    if (!box) return;
    this.reset();
    const pin = currentPin();
    document.getElementById("clip-alias").textContent = pin.alias;
    box.hidden = false;
  },
  close() {
    this.stopCam();
    if (this.rec && this.rec.state === "recording") this.rec.stop();
    const box = document.getElementById("clip");
    if (box) box.hidden = true;
  },
  reset() {
    if (this.url) URL.revokeObjectURL(this.url);
    this.url = "";
    this.blob = null;
    this.status("");
    const out = document.getElementById("clip-out");
    if (out) out.hidden = true;
    const canvas = document.getElementById("clip-canvas");
    if (canvas) canvas.hidden = false;
    const go = document.getElementById("clip-rec");
    if (go) go.disabled = false;
  },
  status(text) {
    const el = document.getElementById("clip-status");
    if (el) el.textContent = text;
  },
  stopCam() {
    if (this.cam) this.cam.getTracks().forEach((t) => t.stop());
    this.cam = null;
  },
  mime() {
    const list = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
    if (typeof MediaRecorder === "undefined") return "";
    return list.find((m) => MediaRecorder.isTypeSupported(m)) || "";
  },
  start() {
    if (this.busy) return;
    const pin = currentPin();
    if (!inside(pin)) { this.status("현장 클립은 반경 안에서만 만들 수 있어요."); return; }
    const canvas = document.getElementById("clip-canvas");
    if (!canvas || !canvas.captureStream || !this.mime()) { this.status("이 브라우저는 클립 녹화를 지원하지 않아요."); return; }
    const useCam = document.getElementById("clip-cam").checked;
    const begin = () => this.record(pin, canvas);
    if (!useCam) { begin(); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { begin(); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }).then((stream) => {
      this.cam = stream;
      const v = document.getElementById("clip-video");
      v.srcObject = stream;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      begin();
    }).catch(() => begin());
  },
  record(pin, canvas) {
    const ctx = ensureAudio();
    if (!ctx) { this.status("오디오를 열 수 없어요."); return; }
    try { ctx.resume(); } catch (e) {}
    this.busy = true;
    this.reset();
    document.getElementById("clip-rec").disabled = true;
    const dest = ctx.createMediaStreamDestination();
    const src = ctx.createBufferSource();
    src.buffer = makeNoise(ctx);
    src.loop = true;
    const spec = FILTER[pin.id] || ["lowpass", 900, 0.7];
    const f = ctx.createBiquadFilter();
    f.type = spec[0];
    f.frequency.value = spec[1];
    f.Q.value = spec[2];
    const g = ctx.createGain();
    g.gain.value = 0;
    src.connect(f);
    f.connect(g);
    g.connect(dest);
    g.connect(audio.master);
    src.start();
    const tracks = canvas.captureStream(30).getVideoTracks().concat(dest.stream.getAudioTracks());
    const chunks = [];
    const mime = this.mime();
    const rec = new MediaRecorder(new MediaStream(tracks), { mimeType: mime });
    this.rec = rec;
    rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = () => {
      try { src.stop(); } catch (e) {}
      try { g.disconnect(); } catch (e) {}
      this.stopCam();
      this.busy = false;
      this.blob = new Blob(chunks, { type: mime.split(";")[0] });
      this.url = URL.createObjectURL(this.blob);
      const out = document.getElementById("clip-out");
      const v = document.getElementById("clip-preview");
      v.src = this.url;
      const dl = document.getElementById("clip-save");
      dl.href = this.url;
      dl.download = "janhyang-" + pin.id + ".webm";
      out.hidden = false;
      canvas.hidden = true;
      document.getElementById("clip-rec").disabled = false;
      this.status("완성 · 링크를 받은 사람은 티저만 듣고, 본편은 이 자리에서만 열려요.");
      Metrics.log("share", pin.id, { kind: "clip" });
    };
    const g2 = canvas.getContext("2d");
    const cam = document.getElementById("clip-video");
    const t0 = performance.now();
    const label = Context.label(pin);
    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      const lvl = aLevel(pin.id, t, state.phase === "night");
      try { g.gain.value = 0.25 * lvl; } catch (e) {}
      this.frame(g2, canvas.width, canvas.height, pin, t, lvl, this.cam ? cam : null, label);
      if (t < this.SECONDS && rec.state === "recording") requestAnimationFrame(draw);
      else if (rec.state === "recording") rec.stop();
      this.status("녹화 중 · " + Math.max(0, Math.ceil(this.SECONDS - t)) + "초");
    };
    rec.start(250);
    requestAnimationFrame(draw);
  },
  // 9:16 브랜드 프레임: 그 시간의 하늘색, 테두리, '잔향' 표기, 그리고 시그니처인 '여기서만' 잠금 표시.
  frame(g, w, h, pin, t, lvl, cam, label) {
    const c = Sky.colors(Sky.phase(pin), Context.weatherNow(), true);
    if (cam && cam.readyState >= 2) {
      const s = Math.max(w / cam.videoWidth, h / cam.videoHeight);
      const vw = cam.videoWidth * s;
      const vh = cam.videoHeight * s;
      g.drawImage(cam, (w - vw) / 2, (h - vh) / 2, vw, vh);
      const shade = g.createLinearGradient(0, h * 0.45, 0, h);
      shade.addColorStop(0, "rgba(7,10,14,0)");
      shade.addColorStop(1, "rgba(7,10,14,.85)");
      g.fillStyle = shade;
      g.fillRect(0, 0, w, h);
    } else {
      const grad = g.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, c.top);
      grad.addColorStop(1, c.bottom);
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 6; i++) {
        const r = ((t * 40 + i * 70) % 420) + 20;
        g.strokeStyle = c.accent;
        g.globalAlpha = Math.max(0, 0.55 * (1 - r / 440) * (0.4 + lvl));
        g.lineWidth = 2;
        g.beginPath();
        g.arc(w / 2, h * 0.4, r, 0, Math.PI * 2);
        g.stroke();
      }
      g.globalAlpha = 1;
    }
    g.strokeStyle = "rgba(244,247,251,.35)";
    g.lineWidth = 2;
    this.round(g, 18, 18, w - 36, h - 36, 28);
    g.stroke();
    g.fillStyle = "#F4F7FB";
    g.font = "600 26px Pretendard, sans-serif";
    g.fillText("잔향", 44, 66);
    g.font = "18px Pretendard, sans-serif";
    g.fillStyle = "rgba(244,247,251,.75)";
    const region = Content.region(Content.regionOf(pin));
    const rn = region ? region.name : "";
    g.fillText(rn, w - 44 - g.measureText(rn).width, 64);
    g.fillStyle = "#F4F7FB";
    g.font = "700 48px Pretendard, sans-serif";
    g.fillText(pin.alias, 44, h - 250);
    g.font = "26px Pretendard, sans-serif";
    this.wrap(g, workOf(pin).afterglow, 44, h - 200, w - 88, 34);
    g.font = "18px Pretendard, sans-serif";
    g.fillStyle = "rgba(244,247,251,.75)";
    g.fillText(label, 44, h - 110);
    this.lockMark(g, 44, h - 86, c.accent);
    g.fillStyle = c.accent;
    g.fillRect(44, h - 40, (w - 88) * Math.min(1, t / this.SECONDS), 3);
  },
  round(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  },
  // 시그니처: 자물쇠 + '여기서만'. 공유물은 모두 이 표시를 단다.
  lockMark(g, x, y, color) {
    g.save();
    g.strokeStyle = color;
    g.fillStyle = color;
    g.lineWidth = 3;
    this.round(g, x, y + 10, 22, 18, 4);
    g.fill();
    g.beginPath();
    g.arc(x + 11, y + 10, 7, Math.PI, 0);
    g.stroke();
    g.font = "600 22px Pretendard, sans-serif";
    g.fillText("여기서만 · 전체는 이 자리에서", x + 34, y + 27);
    g.restore();
  },
  // 단서 스티커: 정확한 위치 대신 단서 문장만. 투명 배경 PNG.
  sticker() {
    const pin = currentPin();
    const cv = document.createElement("canvas");
    cv.width = 900;
    cv.height = 360;
    const g = cv.getContext("2d");
    const c = Sky.colors(Sky.phase(pin), Context.weatherNow(), true);
    this.round(g, 10, 10, 880, 340, 48);
    g.fillStyle = c.top;
    g.globalAlpha = 0.94;
    g.fill();
    g.globalAlpha = 1;
    g.strokeStyle = c.accent;
    g.lineWidth = 4;
    g.stroke();
    g.fillStyle = c.accent;
    g.font = "600 30px Pretendard, sans-serif";
    g.fillText("단서", 64, 84);
    g.fillStyle = "#F4F7FB";
    g.font = "600 40px Pretendard, sans-serif";
    this.wrap(g, pin.find_hint || "이름 없는 자리", 64, 150, 772, 52);
    this.lockMark(g, 64, 262, c.accent);
    g.fillStyle = "rgba(244,247,251,.8)";
    g.font = "26px Pretendard, sans-serif";
    g.fillText("잔향", 780, 290);
    cv.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "janhyang-clue-" + pin.id + ".png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], text: "단서: " + (pin.find_hint || "") }).catch(() => {});
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
      Metrics.log("share", pin.id, { kind: "sticker" });
      this.status("단서 스티커를 만들었어요 · 정확한 위치는 담기지 않아요.");
    }, "image/png");
  },
  wrap(g, text, x, y, max, lh) {
    let line = "";
    let yy = y;
    text.split("").forEach((ch) => {
      if (g.measureText(line + ch).width > max) {
        g.fillText(line, x, yy);
        line = ch;
        yy += lh;
      } else line += ch;
    });
    if (line) g.fillText(line, x, yy);
  },
  share() {
    const pin = currentPin();
    const text = pin.alias + " · " + workOf(pin).afterglow + "\n전체는 이 자리에서만.";
    const url = this.link(pin);
    const file = this.blob ? new File([this.blob], "janhyang-" + pin.id + ".webm", { type: this.blob.type }) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], text: text, url: url }).catch(() => {});
      return;
    }
    const done = () => this.status("링크를 복사했어요 · " + url);
    if (navigator.clipboard) navigator.clipboard.writeText(text + "\n" + url).then(done).catch(() => this.status(url));
    else this.status(url);
  }
};
