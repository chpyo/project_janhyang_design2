// 공간 피드: 한 좌표에 쌓인 여러 유형의 콘텐츠를 잠금 레이어와 함께 그린다.
// 카드 뼈대는 유형과 상관없이 같다: 아이콘 → 제목 → 한 줄 정보 → (본문) → 버튼 하나.
const Feed = {
  TYPE: { soundscape: "사운드스케이프", music: "음악", docent: "도슨트", video: "그때와 지금", game: "게임", note: "노트", capsule: "타임캡슐" },
  TIER: { curated: "큐레이션", creator: "크리에이터", ugc: "이용자" },
  ORDER: {
    local: ["soundscape", "music", "game", "docent", "video", "capsule", "note"],
    tour: ["docent", "video", "game", "soundscape", "music", "capsule", "note"]
  },
  // 고정 문자열 SVG만 쓴다 (사용자 입력 없음).
  ICON: {
    soundscape: '<path d="M3 12h2l2-5 3 10 3-14 3 12 2-3h3"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    docent: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    game: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    capsule: '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',
    note: '<path d="M4 20h4L19 9l-4-4L4 16z"/>'
  },
  LOCK: {
    onsite: '<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/>',
    condition: '<path d="M7 15a4 4 0 1 1 1-7.9A5 5 0 0 1 17.5 9 3.5 3.5 0 0 1 17 16H7z"/><path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2"/>',
    revisit: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
    course: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6"/>',
    capsule: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'
  },
  stamp: "",
  liveAt: 0,
  result: {},
  mix: {},
  cam: null,
  seen: {},
  transcript: {},

  svg(paths, cls) {
    const s = this.el("span", cls);
    s.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + paths + "</svg>";
    return s;
  },
  sorted(items) {
    const order = this.ORDER[state.channel] || this.ORDER.local;
    const rank = (it) => {
      const r = order.indexOf(it.type);
      return r === -1 ? order.length : r;
    };
    const evals = {};
    items.forEach((it) => { evals[it.id] = Access.evaluate(it); });
    const list = items.slice().sort((a, b) => (evals[b.id].open - evals[a.id].open) || (rank(a) - rank(b)));
    // 스폰서 콘텐츠는 맨 앞에 두지 않는다.
    if (list.length > 1 && list[0].sponsor) {
      const i = list.findIndex((it) => !it.sponsor);
      if (i > 0) list.unshift(list.splice(i, 1)[0]);
    }
    return { list: list, evals: evals };
  },
  el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  },
  btn(label, act, id, extra) {
    const b = this.el("button", "pbtn" + (extra ? " " + extra : ""), label);
    b.type = "button";
    b.dataset.act = act;
    if (id) b.dataset.item = id;
    return b;
  },
  link(label, act, id) {
    const b = this.btn(label, act, id, "plink");
    return b;
  },
  stopCam() {
    if (this.cam) this.cam.getTracks().forEach((t) => t.stop());
    this.cam = null;
  },
  paint(pin, items) {
    const root = document.getElementById("pfeed");
    if (!root) return;
    const sorted = this.sorted(items);
    const here = inside(pin);
    const playing = Play.cur ? Play.cur.item.id : "";
    const sig = [pin.id, here, state.lang, state.channel, playing, JSON.stringify(this.result), Object.keys(Content.unsealed).join(","), readNote(pin.id),
      JSON.stringify(this.transcript), sorted.list.map((it) => it.id + ":" + (sorted.evals[it.id].open ? 1 : 0)).join(","), Content.tracesFor(pin.id).length].join("|");
    if (sig !== this.stamp) {
      this.stamp = sig;
      this.stopCam();
      root.replaceChildren();
      this.paintHead(root, pin, sorted, here);
      const seen = this.seen[pin.id] || {};
      sorted.list.forEach((it) => {
        const ev = sorted.evals[it.id];
        const card = this.card(it, ev, pin);
        // 반경 안에서 잠겨 있던 것이 열리는 순간을 보여 준다.
        if (here && seen[it.id] === false && ev.open) {
          card.classList.add("unlocked");
          Haptics.play("unlock");
          Earcon.play("unlock");
          Stage.announce((it.title || this.TYPE[it.type]) + " 열렸어요");
        }
        seen[it.id] = ev.open;
        root.appendChild(card);
      });
      this.seen[pin.id] = seen;
      if (here) {
        root.appendChild(this.traces(pin));
        root.appendChild(this.capsuleForm(pin));
      }
    }
    this.update(pin);
  },
  paintHead(root, pin, sorted, here) {
    const open = sorted.list.filter((it) => sorted.evals[it.id].open).length;
    const head = this.el("div", "pfeed-head");
    head.appendChild(this.el("h2", "pfeed-title", here ? "이 자리에 쌓인 것" : "이 자리에 가면"));
    head.appendChild(this.el("span", "pfeed-count", here ? open + " / " + sorted.list.length : String(sorted.list.length)));
    root.appendChild(head);
    const rest = this.el("div", "rest-card");
    rest.dataset.live = "rest";
    rest.hidden = true;
    rest.appendChild(this.el("p", "", "앉아서 쉬는 중이네요. 10분 쉼 세트를 열어 둘게요."));
    rest.appendChild(this.btn("쉼 세트", "rest"));
    root.appendChild(rest);
    const policy = Safety.policy(pin);
    if (policy.checkin_code && !here) {
      const form = this.el("form", "checkin");
      form.dataset.act = "checkin";
      form.appendChild(this.el("label", "", "실내라 위치가 잘 안 잡히나요? 현장 QR 코드로 체크인"));
      const row = this.el("div", "whisper-row");
      const input = this.el("input");
      input.name = "code";
      input.placeholder = "QR 코드";
      input.autocomplete = "off";
      input.setAttribute("aria-label", "QR 코드");
      const go = this.el("button", "", "체크인");
      go.type = "submit";
      row.append(input, go);
      form.appendChild(row);
      form.appendChild(this.el("p", "checkin-note", ""));
      root.appendChild(form);
    }
  },
  card(it, ev, pin) {
    const card = this.el("article", "pcard");
    card.dataset.item = it.id;
    card.dataset.type = it.type;
    const layer = Access.lockOf(it).layer;
    card.classList.toggle("locked", !ev.open);
    if (!ev.open && layer === "revisit") card.classList.add("veiled");
    const row = this.el("div", "pcard-row");
    row.appendChild(this.svg(this.ICON[it.type] || this.ICON.note, "picon"));
    const main = this.el("div", "pcard-main");
    const title = this.el("h3", "", it.title || this.TYPE[it.type]);
    if (card.classList.contains("veiled")) {
      title.setAttribute("aria-hidden", "true");
      main.appendChild(this.el("span", "sr-only", "가려진 콘텐츠"));
    }
    main.appendChild(title);
    const meta = [this.TYPE[it.type], it.creator, this.TIER[it.tier]].filter(Boolean);
    main.appendChild(this.el("p", "pmeta", meta.join(" · ")));
    if (it.sponsor) main.appendChild(this.el("p", "psponsor", "스폰서 · " + it.sponsor.name + " 제공"));
    row.appendChild(main);
    if (!ev.open) {
      if (layer === "dwell") {
        const ring = this.el("span", "pglyph pring");
        ring.innerHTML = '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" class="track"/><circle cx="18" cy="18" r="15" class="arc" data-live="ring" stroke-dasharray="94.2" stroke-dashoffset="94.2" transform="rotate(-90 18 18)"/></svg>';
        ring.setAttribute("role", "img");
        ring.setAttribute("aria-label", Access.label(it));
        row.appendChild(ring);
      } else {
        const glyph = this.svg(this.LOCK[layer] || this.LOCK.onsite, "pglyph");
        glyph.setAttribute("role", "img");
        glyph.setAttribute("aria-label", Access.label(it) + " 잠금");
        row.appendChild(glyph);
      }
    }
    card.appendChild(row);
    if (!ev.open) {
      if (it.teaser && layer !== "revisit") card.appendChild(this.el("p", "pteaser", it.teaser));
      const reason = this.el("p", "preason", ev.reason);
      reason.dataset.live = "reason";
      card.appendChild(reason);
      if (it.sealed) card.appendChild(this.el("p", "pmeta", "암호화된 채로 기기에 받아 둠 · 이 자리에서만 키가 발급돼요"));
      return card;
    }
    const body = it.body || {};
    const fn = this["body_" + it.type];
    if (fn) fn.call(this, card, it, body, pin);
    else if (body.text) card.appendChild(this.el("p", "ptext", body.text));
    return card;
  },
  playBtn(it, label) {
    const on = Play.isPlaying(it.id);
    return this.btn(on ? "정지" : (label || "재생"), on ? "stop" : "play", it.id, on ? "on" : "");
  },
  actions(card, primary, extra) {
    const row = this.el("div", "prow");
    row.appendChild(primary);
    (extra || []).forEach((n) => row.appendChild(n));
    card.appendChild(row);
    return row;
  },
  body_note(card, it, body) {
    card.appendChild(this.el("p", "ptext", body.text || ""));
  },
  body_soundscape(card, it, body) {
    if (body.text) card.appendChild(this.el("p", "ptext", body.text));
    this.actions(card, this.playBtn(it), [this.el("span", "pmeta", fmt(body.duration_sec || 45) + " · 소리가 " + approachWordDeg(body.bearing || 0) + "에서 들려요")]);
  },
  body_music(card, it, body) {
    if (body.exclusive) card.appendChild(this.el("p", "pmeta", "장소 한정 발매 · 다른 곳에서는 재생되지 않아요"));
    if (body.note) card.appendChild(this.el("p", "ptext", body.note));
    if (body.tracks) {
      const ol = this.el("ol", "ptracks");
      body.tracks.forEach((t) => {
        const li = this.el("li");
        const b = this.btn(t.title, "link", null, "ptrack");
        b.dataset.url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(t.query);
        b.setAttribute("aria-label", t.title + " · 외부 링크로 열기");
        li.appendChild(b);
        ol.appendChild(li);
      });
      card.appendChild(ol);
      card.appendChild(this.el("p", "pmeta", "음원은 직접 올리지 않고 외부 링크로 열어요."));
    }
    if (body.audio_url) this.actions(card, this.playBtn(it, "이 자리에서 재생"));
    else if (body.url) {
      const b = this.btn("링크로 듣기", "link");
      b.dataset.url = body.url;
      this.actions(card, b);
    }
  },
  lookLabel(look) {
    const heading = Context.headingNow();
    if (heading == null) return approachWordDeg(look) + "을 보세요";
    return Stage.clockWord(Play.relBearing(look)) + "을 보세요";
  },
  body_docent(card, it) {
    if (it.sealed && !Content.unsealed[it.id]) {
      card.appendChild(this.el("p", "pmeta", "기기에 암호화된 채로 저장돼 있어요 · 지금 이 자리의 키로 열 수 있어요"));
      this.actions(card, this.btn("이 자리의 키로 열기", "unseal", it.id));
      return;
    }
    const lines = Play.docentLines(it);
    const live = this.el("div", "docent-live");
    const arrow = this.el("span", "look", "↑");
    arrow.dataset.live = "look";
    arrow.setAttribute("role", "img");
    const line = this.el("p", "", lines[0] ? lines[0].text : "");
    line.dataset.live = "line";
    live.append(arrow, line);
    card.appendChild(live);
    this.actions(card, this.playBtn(it), [
      this.el("span", "pmeta", (state.lang === "en" ? "English" : "한국어") + " · " + lines.length + "문장"),
      this.link(this.transcript[it.id] ? "원고 닫기" : "원고", "transcript", it.id)
    ]);
    if (this.transcript[it.id]) {
      const ol = this.el("ol", "ptranscript");
      lines.forEach((l) => {
        const li = this.el("li", "", l.text);
        li.dataset.look = this.lookLabel(l.look || 0);
        ol.appendChild(li);
      });
      card.appendChild(ol);
    }
  },
  body_video(card, it, body) {
    const tn = this.el("div", "tn");
    const now = this.el("div", "tn-now", body.now_label || "지금");
    const cam = this.el("video", "tn-cam");
    cam.muted = true;
    cam.playsInline = true;
    cam.dataset.cam = it.id;
    cam.hidden = true;
    const then = this.el("video", "tn-then");
    then.src = body.src;
    then.muted = true;
    then.loop = true;
    then.playsInline = true;
    then.dataset.then = it.id;
    then.setAttribute("aria-label", (body.then_label || "그때") + "의 장면");
    then.style.opacity = String(this.mix[it.id] == null ? 0.6 : this.mix[it.id]);
    const tag = this.el("span", "tn-tag", body.then_label || "그때");
    tn.append(now, cam, then, tag);
    card.appendChild(tn);
    const mix = this.el("label", "range tn-mix");
    mix.append(document.createTextNode(body.now_label || "지금"));
    const input = this.el("input");
    input.type = "range";
    input.min = "0";
    input.max = "100";
    input.value = String(Math.round((this.mix[it.id] == null ? 0.6 : this.mix[it.id]) * 100));
    input.dataset.mix = it.id;
    input.setAttribute("aria-label", "지금과 그때 섞기");
    mix.appendChild(input);
    mix.append(document.createTextNode(body.then_label || "그때"));
    card.appendChild(mix);
    const align = this.el("p", "pmeta");
    align.dataset.live = "align";
    card.appendChild(align);
    if (body.text) card.appendChild(this.el("p", "ptext", body.text));
    this.actions(card, this.btn("재생", "video", it.id), [this.link("카메라로 겹쳐 보기", "camera", it.id)]);
  },
  body_game(card, it, body, pin) {
    const r = this.result[it.id];
    if (body.game === "quest") {
      const c = Discover.course(body.course);
      if (!c) return;
      const step = Discover.courseStep(c);
      card.appendChild(this.el("p", "ptext", c.dek));
      card.appendChild(this.el("p", "pmeta", "진행 " + step + "/" + c.pins.length + (step >= c.pins.length ? " · 완주" : " · 다음: " + pinById(c.pins[step]).alias)));
      this.actions(card, this.btn("코스 보기", "course"));
      return;
    }
    const text = {
      hunt: "이 자리 어딘가에 숨은 소리를 찾아 걸어가세요. 소리는 실제 방향에서 들리고, 가까울수록 커져요.",
      disco: "같은 자리에 있는 사람들이 같은 순간을 함께 들어요. 다른 탭으로 열면 함께 듣는 사람이 늘어요.",
      tag: "술래는 화면에 나오지 않아요. 심장 박동 간격으로만 알 수 있어요. " + (body.survive_sec || 90) + "초 버티면 승리."
    }[body.game];
    if (text) card.appendChild(this.el("p", "ptext", text));
    if (body.game === "tag" && Safety.quiet(pin)) {
      card.appendChild(this.el("p", "preason", "주민이 쉬는 시간이라 함께하는 게임은 쉬어요."));
      return;
    }
    const on = Play.isPlaying(it.id);
    const label = { hunt: "찾기 시작", disco: "함께 듣기", tag: "시작" }[body.game] || "시작";
    const live = this.el("span", "pmeta");
    live.dataset.live = "game";
    live.setAttribute("aria-live", "polite");
    this.actions(card, this.btn(on ? "그만" : label, on ? "stop" : "game", it.id, on ? "on" : ""), [live]);
    if (r) {
      const msg = { found: body.reward || "찾았다!", caught: "잡혔다. 술래가 소리 없이 다가왔다.", win: "버텼다. 술래는 다른 골목으로 갔다.", out: "자리를 벗어나 게임이 멈췄어요." }[r];
      card.appendChild(this.el("p", "presult", msg));
    }
  },
  body_capsule(card, it, body) {
    card.appendChild(this.el("p", "ptext", body.text || ""));
    if (body.from) card.appendChild(this.el("p", "pmeta", body.from));
  },
  traces(pin) {
    const box = this.el("section", "traces");
    box.appendChild(this.el("h2", "pfeed-title", "흔적"));
    box.appendChild(this.el("p", "pmeta", "이 자리에 온 사람에게만 보여요"));
    const list = Content.tracesFor(pin.id);
    if (!list.length) box.appendChild(this.el("p", "pmeta", "아직 남긴 사람이 없어요."));
    list.forEach((t) => {
      const row = this.el("div", "trace");
      row.appendChild(this.el("p", "", t.text));
      const meta = this.el("div", "trace-meta");
      meta.appendChild(this.el("span", "", (t.mine ? "나" : "익명") + (t.at ? " · " + t.at.replace(/-/g, ".") : "")));
      if (!t.mine) {
        const b = this.link("신고", "report");
        b.dataset.trace = t.id;
        b.setAttribute("aria-label", "이 흔적 신고");
        meta.appendChild(b);
      }
      row.appendChild(meta);
      box.appendChild(row);
    });
    return box;
  },
  capsuleForm(pin) {
    const form = this.el("form", "capsule-form");
    form.dataset.act = "capsule";
    form.appendChild(this.el("label", "", "타임캡슐 묻기 · 정한 날 이후, 이 자리에서만 열려요"));
    const text = this.el("input");
    text.name = "text";
    text.maxLength = 200;
    text.placeholder = "미래의 이 자리에 남길 말";
    text.setAttribute("aria-label", "타임캡슐 내용");
    const date = this.el("input");
    date.type = "date";
    date.name = "date";
    date.setAttribute("aria-label", "열리는 날");
    const d = new Date(Date.now() + 30 * 86400000);
    date.value = d.toISOString().slice(0, 10);
    date.min = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const go = this.el("button", "", "묻기");
    go.type = "submit";
    const row = this.el("div", "whisper-row");
    row.append(text, date, go);
    form.appendChild(row);
    form.dataset.pin = pin.id;
    return form;
  },
  update(pin) {
    const now = performance.now();
    if (now - this.liveAt < 200) return;
    this.liveAt = now;
    const root = document.getElementById("pfeed");
    if (!root) return;
    root.querySelectorAll(".pcard").forEach((card) => {
      const it = Content.item(card.dataset.item) || Content.itemsFor(pin.id).find((x) => x.id === card.dataset.item);
      if (!it) return;
      const reason = card.querySelector('[data-live="reason"]');
      if (reason) {
        const ev = Access.evaluate(it, pin);
        if (reason.textContent !== ev.reason) reason.textContent = ev.reason;
        const ring = card.querySelector('[data-live="ring"]');
        if (ring) ring.setAttribute("stroke-dashoffset", (94.2 * (1 - ev.progress)).toFixed(1));
      }
      const c = Play.cur && Play.cur.item.id === it.id ? Play.cur : null;
      const look = card.querySelector('[data-live="look"]');
      if (look) {
        const line = c ? Play.currentLine() : null;
        const lines = Play.docentLines(it);
        const target = line || lines[0];
        if (target) {
          look.style.transform = "rotate(" + Math.round(Play.relBearing(target.look || 0)) + "deg)";
          const text = card.querySelector('[data-live="line"]');
          if (text && text.textContent !== target.text) text.textContent = target.text;
          look.setAttribute("aria-label", this.lookLabel(target.look || 0));
        }
      }
      const align = card.querySelector('[data-live="align"]');
      if (align) {
        const b = (it.body && it.body.bearing) || 0;
        const off = Math.round(Math.abs(Play.relBearing(b)));
        align.textContent = off <= 20 ? "정렬됐어요 · 그때의 장면이 지금 풍경과 겹쳐요" : this.lookLabel(b) + " · " + off + "° 남았어요";
        align.classList.toggle("ok", off <= 20);
      }
      const game = card.querySelector('[data-live="game"]');
      if (game) {
        let text = "";
        if (c && c.kind === "hunt") text = c.dist == null ? "" : "소리까지 약 " + Math.round(c.dist) + "m · " + approachWordDeg(Play.bearingTo(listenerPos(), c.target));
        else if (c && c.kind === "disco") text = "지금 여기 " + (Context.occupancy(pin) + Play.peerCount() + 1) + "명이 함께 듣는 중 · " + fmt(c.pos || 0);
        else if (c && c.kind === "tag") text = "술래까지 " + Math.round(c.dist || 0) + "m · 남은 " + fmt(c.dur - c.t);
        if (game.textContent !== text) game.textContent = text;
      }
    });
    const rest = root.querySelector('[data-live="rest"]');
    if (rest) rest.hidden = !(inside(pin) && Context.motionNow() === "still" && Presence.dwellOf(pin.id) >= 120 && Content.itemsFor(pin.id).some((it) => it.rest));
  },
  // 방향 정보가 필요한 콘텐츠를 처음 열 때 센서 권한을 묻는다.
  wantHeading() {
    if (Context.headingNow() != null || Context.sensorsOn) return;
    Permit.ask("motion", () => Context.enableSensors());
  },
  onClick(e) {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const pin = currentPin();
    const it = b.dataset.item ? (Content.item(b.dataset.item) || Content.itemsFor(pin.id).find((x) => x.id === b.dataset.item)) : null;
    const act = b.dataset.act;
    if (act === "stop") { Play.stop(); }
    else if (act === "play" && it) {
      if (!Access.evaluate(it, pin).open) return;
      if (it.type === "soundscape") Play.playScape(it);
      else if (it.type === "docent") { Play.playDocent(it); this.wantHeading(); }
      else if (it.body && it.body.audio_url) Play.playFile(it);
    } else if (act === "game" && it) {
      if (!Access.evaluate(it, pin).open) return;
      delete this.result[it.id];
      if (it.body.game === "hunt") Play.startHunt(it);
      else if (it.body.game === "disco") Play.startDisco(it);
      else if (it.body.game === "tag") Play.startTag(it);
    } else if (act === "link") {
      const url = b.dataset.url;
      if (url) window.open(url, "_blank", "noopener");
    } else if (act === "unseal" && it) {
      b.disabled = true;
      b.textContent = "여는 중";
      Content.unseal(it).then(() => { this.stamp = ""; render(); }).catch(() => { b.textContent = "열 수 없어요 · 이 자리에서 다시"; });
    } else if (act === "video" && it) {
      const v = document.querySelector('[data-then="' + it.id + '"]');
      if (v) {
        if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); b.textContent = "멈춤"; Metrics.log("item_open", pin.id, { item: it.id, type: "video" }); this.wantHeading(); }
        else { v.pause(); b.textContent = "재생"; }
      }
    } else if (act === "camera" && it) {
      this.camera(it, b);
    } else if (act === "transcript" && it) {
      this.transcript[it.id] = !this.transcript[it.id];
    } else if (act === "course") {
      showTab("discover");
    } else if (act === "report") {
      Content.report(b.dataset.trace);
      this.stamp = "";
    } else if (act === "rest") {
      const restItem = Content.itemsFor(pin.id).find((x) => x.rest);
      const card = restItem && document.querySelector('.pcard[data-item="' + restItem.id + '"]');
      const dock = document.getElementById("dock");
      if (card && dock) {
        Stage.setDetent("full", true);
        const top = dock.scrollTop + card.getBoundingClientRect().top - dock.getBoundingClientRect().top - 12;
        dock.scrollTo({ top: top, behavior: Stage.reduced() ? "auto" : "smooth" });
        card.classList.add("flash");
        setTimeout(() => card.classList.remove("flash"), 1600);
      }
    }
    render();
  },
  camera(it, b) {
    if (this.cam) { this.stopCam(); this.stamp = ""; return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { b.textContent = "카메라를 쓸 수 없어요"; return; }
    Permit.ask("camera", () => navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }).then((stream) => {
      this.cam = stream;
      const v = document.querySelector('[data-cam="' + it.id + '"]');
      if (!v) { this.stopCam(); return; }
      v.srcObject = stream;
      v.hidden = false;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      b.textContent = "카메라 끄기";
      this.wantHeading();
    }).catch(() => { b.textContent = "카메라 권한이 없어요"; }));
  },
  onInput(e) {
    const t = e.target;
    if (!t || !t.dataset || !t.dataset.mix) return;
    const v = Number(t.value) / 100;
    this.mix[t.dataset.mix] = v;
    const then = document.querySelector('[data-then="' + t.dataset.mix + '"]');
    if (then) then.style.opacity = String(v);
  },
  onSubmit(e) {
    const form = e.target.closest("form[data-act]");
    if (!form) return;
    e.preventDefault();
    const pin = currentPin();
    if (form.dataset.act === "checkin") {
      const ok = Presence.checkin(pin.id, form.elements.code.value);
      const note = form.querySelector(".checkin-note");
      if (note) note.textContent = ok ? "체크인됐어요 · 10분 동안 이 자리로 인정돼요" : "코드가 맞지 않아요";
      if (ok) onPositionChanged();
    } else if (form.dataset.act === "capsule") {
      const text = form.elements.text.value.trim();
      const date = form.elements.date.value;
      if (!text || !date) return;
      Content.addCapsule(pin.id, text, date);
      this.stamp = "";
    }
    render();
  }
};

function approachWordDeg(deg) {
  const dirs = ["북쪽", "북동쪽", "동쪽", "남동쪽", "남쪽", "남서쪽", "서쪽", "북서쪽"];
  return dirs[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}
