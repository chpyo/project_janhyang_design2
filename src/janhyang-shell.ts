export const JANHYANG_SHELL = `
<header id="dev">
  <div class="topbar">
    <span class="tag">잔향</span>
    <span class="where">성수</span>
  </div>
  <p id="rehearsal-flag" class="flag" hidden>REHEARSAL</p>
</header>
<main>
  <div id="map"></div>
  <canvas id="sketch" hidden></canvas>
  <div id="me-dot" aria-hidden="true"></div>
  <span id="badge" hidden></span>
  <span id="credit" hidden>© OpenStreetMap</span>
</main>
<div id="dock">
  <div id="now" hidden>
    <span id="now-label"></span>
    <button type="button" id="now-stop">정지</button>
  </div>
  <section id="sheet">
    <button type="button" id="grip" aria-expanded="false" aria-label="시트"><i></i></button>
    <p id="loc-line">여기서만 열려요</p>
    <p class="sub" id="dist"></p>
    <p class="sub" id="meta" hidden></p>
    <div id="chips" hidden></div>
    <div class="playhead">
      <button type="button" id="action" aria-label="재생">8초</button>
      <div class="playcopy">
        <p id="story-title" hidden></p>
        <h1 id="alias" hidden></h1>
        <p class="sub" id="place" hidden></p>
        <p id="dek"></p>
        <p id="live"></p>
        <div class="story-meter" aria-hidden="true"><i id="story-fill"></i></div>
        <p class="story-clock"><span id="story-time">0:00</span><span id="story-total">0:08</span></p>
      </div>
    </div>
    <p id="safety" hidden></p>
    <p id="gate-note" hidden></p>
    <div id="setlist" hidden>
      <article id="story" hidden></article>
      <div id="feed-rest"></div>
    </div>
    <form id="whisper" hidden>
      <label for="whisper-input">이 자리에 남기기</label>
      <div class="whisper-row">
        <input id="whisper-input" maxlength="80" placeholder="한 줄" autocomplete="off">
        <button type="submit">남기기</button>
      </div>
    </form>
    <div class="sheet-row">
      <button type="button" id="share" hidden>카드</button>
    </div>
    <div id="more" hidden>
      <p id="caption"></p>
      <button type="button" id="script-toggle" hidden>원고</button>
      <ol id="lines" hidden></ol>
      <p id="hint" hidden></p>
      <div id="row">
        <a id="yt" hidden target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div>
  </section>
</div>
<nav id="tabs" aria-label="잔향">
  <button type="button" data-tab="map" aria-selected="true">지도</button>
  <button type="button" data-tab="keeps" aria-selected="false">서랍</button>
  <button type="button" data-tab="work" aria-selected="false">작업</button>
</nav>
<div id="vault" hidden>
  <p class="vault-kicker">서랍</p>
  <p id="vault-count"></p>
  <div id="vault-list"></div>
</div>
<div id="work" hidden>
  <div class="seg" role="tablist" aria-label="작업">
    <button type="button" id="work-rehearsal" data-work="rehearsal" aria-selected="true">리허설</button>
    <button type="button" id="work-studio" data-work="studio" aria-selected="false">스튜디오</button>
  </div>
  <div id="rehearsal">
    <p class="work-note">위치와 시간을 바꿉니다. 여기서 연 자리는 서랍에 따로 남습니다.</p>
    <div class="phase" role="group" aria-label="시간">
      <button type="button" id="day" aria-pressed="true">낮</button>
      <button type="button" id="night" aria-pressed="false">밤</button>
      <button type="button" id="clock">지금</button>
    </div>
    <div class="ruler">
      <button type="button" id="far">멀리</button>
      <label class="range">
        <input id="slider" type="range" min="0" max="400" value="120" step="1" aria-label="거리">
        <span id="meters">120m</span>
      </label>
      <button type="button" id="near">반경 안</button>
      <button type="button" id="leave">이탈</button>
    </div>
    <div class="tools-grid">
      <label>핀 <select id="pin" aria-label="핀"></select></label>
      <label>배속
        <select id="rate" aria-label="배속">
          <option value="1">1×</option>
          <option value="10">10×</option>
        </select>
      </label>
      <label class="check"><input id="gps" type="checkbox"> 내 위치</label>
      <label class="check"><input id="tiles" type="checkbox"> 타일</label>
      <button type="button" id="selftest">자가점검</button>
      <p id="readout"></p>
      <p id="report"></p>
    </div>
  </div>
  <div id="studio" hidden>
    <p class="studio-kicker">새 공간</p>
    <p id="studio-hint">지도를 누르면 그 좌표가 들어옵니다.</p>
    <form id="studio-pin">
      <label>장소 <input id="studio-name" maxlength="40" required></label>
      <label>별칭 <input id="studio-alias" maxlength="40" required></label>
      <label class="range">반경
        <input id="studio-radius" type="range" min="10" max="200" value="40">
        <span id="studio-radius-read">40m</span>
      </label>
      <p id="studio-coord">좌표 없음</p>
      <button type="submit">저장</button>
    </form>
    <div class="split">
      <section>
        <p class="studio-kicker">이 자리</p>
        <div id="preview-here"></div>
      </section>
      <section>
        <p class="studio-kicker">밖</p>
        <div id="preview-home"></div>
      </section>
    </div>
    <details id="manuscript">
      <summary>원고</summary>
      <div id="manuscript-body"></div>
    </details>
    <p class="studio-kicker">피드</p>
    <label>공간 <select id="studio-space"></select></label>
    <div id="studio-feed"></div>
    <form id="studio-add">
      <p class="studio-kicker">추가</p>
      <label>유형
        <select id="studio-type">
          <option value="story">Story</option>
          <option value="music">Music</option>
          <option value="note">Note</option>
        </select>
      </label>
      <div id="studio-fields"></div>
      <button type="submit">등록</button>
    </form>
    <p id="studio-status"></p>
  </div>
</div>
<div id="fog" hidden>
  <article>
    <p class="kicker">카드</p>
    <h2 id="fog-alias"></h2>
    <p id="fog-line"></p>
    <div class="row">
      <button type="button" id="copy">복사</button>
      <button type="button" id="fog-close">닫기</button>
    </div>
  </article>
</div>
`;
