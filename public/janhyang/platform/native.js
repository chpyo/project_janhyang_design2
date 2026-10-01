// 화면 밖 경험.
// 웹에서 실제로 되는 것: 잠금 화면·알림 센터의 미디어 정보(하늘색 아트워크 포함), 진동 패턴(Haptics).
// 네이티브에서만 되는 것(Live Activity, 다이내믹 아일랜드, Watch, 위젯, App Clip, SharePlay)은
// 실제 앱 상태로 움직이는 설계 미리보기로 그린다. 작업 > 화면 밖.
const Native = {
  art: {},
  paintAt: 0,

  artwork(pin) {
    const phase = Sky.phase(pin);
    const key = pin.id + "|" + phase;
    if (this.art[key]) return this.art[key];
    try {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 256;
      const g = c.getContext("2d");
      const col = Sky.colors(phase, Context.weatherNow(), true);
      const grad = g.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, col.top);
      grad.addColorStop(1, col.bottom);
      g.fillStyle = grad;
      g.fillRect(0, 0, 256, 256);
      for (let i = 1; i <= 4; i++) {
        g.strokeStyle = col.accent;
        g.globalAlpha = 0.6 / i;
        g.lineWidth = 3;
        g.beginPath();
        g.arc(128, 128, 22 * i + 10, 0, Math.PI * 2);
        g.stroke();
      }
      g.globalAlpha = 1;
      g.fillStyle = col.accent;
      g.beginPath();
      g.arc(128, 128, 9, 0, Math.PI * 2);
      g.fill();
      this.art[key] = c.toDataURL("image/png");
    } catch (e) {
      this.art[key] = "";
    }
    return this.art[key];
  },
  metadata(pin, title) {
    if (typeof MediaMetadata === "undefined" || !navigator.mediaSession) return;
    const region = Content.region(Content.regionOf(pin));
    const art = this.artwork(pin);
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || (inside(pin) ? pin.alias : "이름 없는 자리"),
        artist: "잔향 · " + (region ? region.name : ""),
        album: Context.label(pin),
        artwork: art ? [{ src: art, sizes: "256x256", type: "image/png" }] : []
      });
    } catch (e) {}
  },
  h(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  },
  arrow(rel) {
    const a = this.h("span", "nv-arrow", "↑");
    a.style.transform = "rotate(" + Math.round(rel) + "deg)";
    return a;
  },
  ring(ratio) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 36 36");
    svg.setAttribute("class", "nv-ring");
    const bg = document.createElementNS(ns, "circle");
    const fg = document.createElementNS(ns, "circle");
    [bg, fg].forEach((c) => {
      c.setAttribute("cx", "18");
      c.setAttribute("cy", "18");
      c.setAttribute("r", "15");
      c.setAttribute("fill", "none");
      c.setAttribute("stroke-width", "4");
    });
    bg.setAttribute("stroke", "rgba(255,255,255,.18)");
    fg.setAttribute("stroke", "var(--accent)");
    fg.setAttribute("stroke-linecap", "round");
    fg.setAttribute("stroke-dasharray", "94.2");
    fg.setAttribute("stroke-dashoffset", String(94.2 * (1 - Math.max(0, Math.min(1, ratio)))));
    fg.setAttribute("transform", "rotate(-90 18 18)");
    svg.append(bg, fg);
    return svg;
  },
  frame(title, note, body) {
    const box = this.h("section", "nv-frame");
    box.appendChild(this.h("p", "nv-title", title));
    box.appendChild(body);
    if (note) box.appendChild(this.h("p", "nv-note", note));
    return box;
  },
  paint() {
    const root = document.getElementById("native-list");
    if (!root || document.getElementById("native").hidden) return;
    const now = performance.now();
    if (now - this.paintAt < 1000) return;
    this.paintAt = now;
    const pin = currentPin();
    const here = inside(pin);
    const pos = listenerPos();
    const target = Stage.target(pin);
    const rel = pos ? (Context.headingNow() == null ? Play.bearingTo(pos, target) : Play.relBearing(Play.bearingTo(pos, target))) : 0;
    const name = here || !Discover.fogged(pin) ? pin.alias : "단서 · " + (pin.find_hint || "이름 없는 자리");
    const span = here ? Stage.ringSpan(pin) : null;
    const prox = ["아주 멀어요", "멀어요", "가까워지고 있어요", "가까워요", "거의 다 왔어요"][Stage.proximity(pin) - 1];
    const playing = state.mode !== "idle" || Play.active();
    const clock = new Date().toTimeString().slice(0, 5);
    root.replaceChildren();

    const lock = this.h("div", "nv-lock");
    lock.appendChild(this.h("p", "nv-clock", clock));
    const la = this.h("div", "nv-activity");
    la.appendChild(here ? this.ring(span ? span.ratio : 1) : this.arrow(rel));
    const copy = this.h("div", "nv-copy");
    copy.appendChild(this.h("b", "", name));
    copy.appendChild(this.h("span", "", here ? "머문 시간 " + fmt(Presence.dwellOf(pin.id)) + (span ? " · 다음 열림 " + fmt(span.left) : "") : approachWordDeg(pos ? Play.bearingTo(pos, target) : 0) + " · " + prox));
    la.appendChild(copy);
    la.appendChild(this.h("span", "nv-state", playing ? "❚❚" : "▶"));
    lock.appendChild(la);
    root.appendChild(this.frame("잠금 화면 · Live Activity", "걷는 동안 화면을 켜지 않아도 방향과 체류가 보입니다.", lock));

    const island = this.h("div", "nv-island-wrap");
    const compact = this.h("div", "nv-island");
    compact.appendChild(here ? this.ring(span ? span.ratio : 1) : this.arrow(rel));
    compact.appendChild(this.h("span", "nv-island-gap"));
    compact.appendChild(this.h("span", "nv-island-txt", here ? fmt(Presence.dwellOf(pin.id)) : prox));
    const expanded = this.h("div", "nv-island nv-island-big");
    expanded.appendChild(this.h("b", "", name));
    expanded.appendChild(this.h("span", "", here ? (playing ? "듣는 중" : "이 자리에서 듣기") : "다가가면 소리가 커져요"));
    island.append(compact, expanded);
    root.appendChild(this.frame("다이내믹 아일랜드 · 축소 / 확장", "", island));

    const watch = this.h("div", "nv-watch");
    const face = this.h("div", "nv-watch-face");
    face.appendChild(here ? this.ring(span ? span.ratio : 1) : this.arrow(rel));
    face.appendChild(this.h("small", "", here ? pin.alias : prox));
    watch.appendChild(face);
    watch.appendChild(this.h("p", "nv-note", "손목 진동: 왼쪽은 두 번, 오른쪽은 세 번, 정면은 한 번 짧게. (웹에서는 같은 패턴을 휴대폰 진동으로 냄)"));
    root.appendChild(this.frame("Apple Watch · 손목 길 안내", "", watch));

    const widgets = this.h("div", "nv-widgets");
    const drop = Content.allPins().find((p) => p.drop && Content.regionOf(p) === state.region && Discover.dropState(p).open) ||
      Content.allPins().find((p) => p.drop && Content.regionOf(p) === state.region);
    const small = this.h("div", "nv-widget");
    small.appendChild(this.h("span", "nv-kicker", "오늘의 드롭"));
    small.appendChild(this.h("b", "", drop ? (Discover.fogged(drop) ? "단서 · " + drop.find_hint : drop.alias) : "없음"));
    small.appendChild(this.h("small", "", drop ? Discover.dropText(drop) : ""));
    const nearPin = Content.pinsIn(state.region).filter((p) => Discover.fogged(p) && p.id !== pin.id)
      .sort((a, b) => (pos ? haversine(pos, a) - haversine(pos, b) : 0))[0];
    const medium = this.h("div", "nv-widget nv-widget-wide");
    medium.appendChild(this.h("span", "nv-kicker", "근처 단서"));
    medium.appendChild(this.h("b", "", nearPin ? nearPin.find_hint : "모든 단서를 풀었어요"));
    medium.appendChild(this.h("small", "", nearPin ? Discover.distBand(nearPin) + " · " + approachWord(nearPin) : ""));
    widgets.append(small, medium);
    root.appendChild(this.frame("홈 화면 위젯", "", widgets));

    const clipPin = Content.allPins().find((p) => Safety.policy(p).checkin_code);
    const clip = this.h("div", "nv-clip");
    clip.appendChild(this.h("div", "nv-clip-art"));
    const cc = this.h("div", "nv-copy");
    cc.appendChild(this.h("b", "", clipPin ? clipPin.alias : "팝업"));
    cc.appendChild(this.h("span", "", "잔향 · 설치 없이 이 자리의 소리 듣기"));
    clip.append(cc, this.h("span", "nv-clip-open", "열기"));
    root.appendChild(this.frame("App Clip · 팝업 QR·NFC", "웹에서는 #checkin 링크가 같은 역할을 합니다 (QR 체크인 → 바로 그 자리).", clip));

    const share = this.h("div", "nv-share");
    share.appendChild(this.h("b", "", "같이 듣기"));
    share.appendChild(this.h("span", "", (Play.cur && Play.cur.kind === "disco" ? Play.cur.item.title : "동시 청취") + " · 지금 " + (Context.occupancy(pin) + Play.peerCount() + 1) + "명"));
    root.appendChild(this.frame("SharePlay · 친구와 동시 청취", "웹에서는 같은 브라우저의 다른 탭이 '함께 듣는 사람'으로 잡힙니다.", share));
  }
};
