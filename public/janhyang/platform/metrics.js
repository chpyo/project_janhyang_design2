// 검증 지표: 기기 안에만 쌓이는 이벤트 로그와 1단계 핵심 지표.
// 티저 → 방문 전환율, 평균 체류, 재방문율, 공유 → 신규 방문.
const Metrics = {
  KEY: "janhyang-events",
  MAX: 2000,
  events: null,
  sample: false,

  all() {
    if (!this.events) {
      try {
        const raw = JSON.parse(localStorage.getItem(this.KEY) || "[]");
        this.events = Array.isArray(raw) ? raw : [];
      } catch (e) {
        this.events = [];
      }
    }
    return this.events;
  },
  log(type, pin, data) {
    const list = this.all();
    list.push(Object.assign({ type: type, pin: pin || "", at: Date.now() }, data || {}));
    if (list.length > this.MAX) list.splice(0, list.length - this.MAX);
    try { localStorage.setItem(this.KEY, JSON.stringify(list)); } catch (e) {}
  },
  clear() {
    this.events = [];
    try { localStorage.removeItem(this.KEY); } catch (e) {}
  },
  rows() {
    if (this.sample && Content.sample) {
      return Content.sample.pins.map((r) => Object.assign({}, r));
    }
    const by = {};
    const row = (pin) => by[pin] || (by[pin] = { pin: pin, teaser: 0, visit: 0, dwell_sum: 0, dwell_n: 0, revisit: 0, share: 0, share_visit: 0 });
    this.all().forEach((e) => {
      if (!e.pin) return;
      const r = row(e.pin);
      if (e.type === "teaser") r.teaser += 1;
      else if (e.type === "visit") r.visit += 1;
      else if (e.type === "revisit") r.revisit += 1;
      else if (e.type === "share") r.share += 1;
      else if (e.type === "share_visit") r.share_visit += 1;
      else if (e.type === "dwell") { r.dwell_sum += e.sec || 0; r.dwell_n += 1; }
    });
    return Object.keys(by).sort().map((k) => {
      const r = by[k];
      r.dwell_avg = r.dwell_n ? Math.round(r.dwell_sum / r.dwell_n) : 0;
      return r;
    });
  },
  totals() {
    const rows = this.rows();
    const sum = (k) => rows.reduce((s, r) => s + (r[k] || 0), 0);
    const pct = (a, b) => (b ? Math.round((a / b) * 100) + "%" : "—");
    const dwellRows = rows.filter((r) => r.dwell_avg);
    const dwell = dwellRows.length ? Math.round(dwellRows.reduce((s, r) => s + r.dwell_avg, 0) / dwellRows.length) : 0;
    let courseStart = 0;
    let courseDone = 0;
    if (this.sample && Content.sample) {
      courseStart = Content.sample.course_starts;
      courseDone = Content.sample.course_done;
    } else {
      this.all().forEach((e) => {
        if (e.type === "course_step" && e.step === 1) courseStart += 1;
        if (e.type === "course_done") courseDone += 1;
      });
    }
    return [
      { label: "티저 → 방문", value: pct(sum("visit"), sum("teaser")), sub: sum("visit") + " / " + sum("teaser") },
      { label: "평균 체류", value: dwell ? fmt(dwell) : "—", sub: "반경 안 체류" },
      { label: "재방문율", value: pct(sum("revisit"), sum("visit")), sub: sum("revisit") + "회" },
      { label: "공유 → 신규 방문", value: pct(sum("share_visit"), sum("share")), sub: sum("share_visit") + " / " + sum("share") },
      { label: "코스 완주율", value: pct(courseDone, courseStart), sub: courseDone + " / " + courseStart }
    ];
  },
  paint() {
    const tiles = document.getElementById("metrics-tiles");
    const table = document.getElementById("metrics-table");
    const label = document.getElementById("metrics-label");
    if (!tiles || !table) return;
    if (label) label.textContent = this.sample && Content.sample ? Content.sample.label : "이 기기 (" + this.all().length + "개 이벤트)";
    tiles.replaceChildren();
    this.totals().forEach((t) => {
      const box = document.createElement("div");
      box.className = "kpi";
      const v = document.createElement("b");
      v.textContent = t.value;
      const l = document.createElement("span");
      l.textContent = t.label;
      const s = document.createElement("small");
      s.textContent = t.sub;
      box.append(v, l, s);
      tiles.appendChild(box);
    });
    table.replaceChildren();
    const head = document.createElement("tr");
    ["자리", "티저", "방문", "전환", "체류", "재방문", "공유→방문"].forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      head.appendChild(th);
    });
    table.appendChild(head);
    const rows = this.rows();
    if (!rows.length) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 7;
      td.textContent = "아직 기록이 없어요. 지도에서 티저를 듣고 반경 안으로 들어가 보세요.";
      tr.appendChild(td);
      table.appendChild(tr);
      return;
    }
    rows.forEach((r) => {
      const tr = document.createElement("tr");
      const conv = r.teaser ? Math.round((r.visit / r.teaser) * 100) + "%" : "—";
      [r.pin, r.teaser, r.visit, conv, r.dwell_avg ? fmt(r.dwell_avg) : "—", r.revisit, r.share_visit + "/" + r.share].forEach((v) => {
        const td = document.createElement("td");
        td.textContent = String(v);
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  }
};
