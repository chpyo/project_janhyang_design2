// 권한은 처음 그 기능이 필요한 순간에, 이유와 약속을 먼저 보여 준 뒤 묻는다.
const Permit = {
  KEY: "janhyang-permit",
  COPY: {
    location: {
      title: "내 위치로 찾아갈까요?",
      why: "단서까지의 방향과 가까워지는 정도를 실제 위치로 안내해요.",
      promise: "위치는 기기 안에서만 판정해요. 서버로 보내지 않아요.",
      allow: "위치 사용"
    },
    motion: {
      title: "방향 센서를 켤까요?",
      why: "도슨트의 화살표와 '그때와 지금' 화면이 실제로 보는 방향을 가리켜요. 걷는 중에는 소리를 줄여 안전을 지켜요.",
      promise: "방향과 움직임은 이 화면 안에서만 쓰고 기록하지 않아요.",
      allow: "센서 켜기"
    },
    mic: {
      title: "주변 소음에 맞출까요?",
      why: "시끄러운 길에서는 조금 크게, 조용한 골목에서는 작게 들려줘요.",
      promise: "녹음하지 않아요. 음량 숫자만 읽고 바로 버려요.",
      allow: "마이크 사용"
    },
    camera: {
      title: "카메라로 겹쳐 볼까요?",
      why: "예전 장면을 지금 풍경 위에 겹쳐 보여 줘요.",
      promise: "화면은 저장하지 않아요. 클립 녹화를 누를 때만 기록돼요.",
      allow: "카메라 사용"
    }
  },
  granted: {},
  later: {},
  pending: null,

  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      if (d && typeof d === "object") this.granted = d;
    } catch (e) {}
  },
  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.granted)); } catch (e) {}
  },
  // run은 '허용'을 누른 그 클릭 안에서 바로 호출된다 (iOS 센서 권한은 사용자 동작 안에서만 열림).
  ask(kind, run) {
    if (this.granted[kind]) return Promise.resolve(run());
    if (this.later[kind]) return Promise.resolve(false);
    const copy = this.COPY[kind];
    const sheet = document.getElementById("permit");
    if (!copy || !sheet) return Promise.resolve(run());
    document.getElementById("permit-title").textContent = copy.title;
    document.getElementById("permit-why").textContent = copy.why;
    document.getElementById("permit-promise").textContent = copy.promise;
    document.getElementById("permit-allow").textContent = copy.allow;
    sheet.dataset.kind = kind;
    sheet.hidden = false;
    document.getElementById("permit-allow").focus();
    return new Promise((resolve) => { this.pending = { kind: kind, run: run, resolve: resolve }; });
  },
  answer(allow) {
    const p = this.pending;
    this.pending = null;
    document.getElementById("permit").hidden = true;
    if (!p) return;
    if (!allow) {
      this.later[p.kind] = true;
      p.resolve(false);
      return;
    }
    this.granted[p.kind] = true;
    this.save();
    p.resolve(p.run());
  },
  bind() {
    const allow = document.getElementById("permit-allow");
    const later = document.getElementById("permit-later");
    if (allow) allow.addEventListener("click", () => this.answer(true));
    if (later) later.addEventListener("click", () => this.answer(false));
    const sheet = document.getElementById("permit");
    if (sheet) sheet.addEventListener("click", (e) => { if (e.target.id === "permit") this.answer(false); });
  }
};
