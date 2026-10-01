export const JANHYANG_SHELL = `
<header id="dev">
  <div class="topbar">
    <span class="tag">잔향</span>
    <div class="top-right">
      <select id="region" class="where" aria-label="지역">
        <option value="seongsu">성수</option>
      </select>
      <button type="button" id="menu" class="icon-btn" aria-label="설정" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>
      </button>
    </div>
  </div>
  <p id="rehearsal-flag" class="flag" hidden>리허설 중</p>
</header>
<main>
  <div id="map"></div>
  <canvas id="sketch" hidden></canvas>
  <div id="me-dot" aria-hidden="true"></div>
  <span id="badge" hidden></span>
  <span id="credit" hidden>© OpenStreetMap</span>
</main>
<p id="announce" class="sr-only" aria-live="polite"></p>
<div id="dock" data-detent="peek">
  <div id="now" hidden>
    <span id="now-label"></span>
    <button type="button" id="now-stop">정지</button>
  </div>
  <section id="sheet">
    <button type="button" id="grip" aria-expanded="false" aria-label="시트 높이 바꾸기"><i></i></button>
    <div id="compass" role="group">
      <svg class="dial" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" class="dial-ring"/>
        <g id="dial-north"><text x="32" y="12" text-anchor="middle" class="dial-n">N</text></g>
        <g id="needle"><path d="M32 9 L39 35 L32 30 L25 35 Z" class="dial-needle"/></g>
      </svg>
      <div class="compass-copy">
        <p id="compass-dir">방향</p>
        <div id="prox" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <p id="compass-trend"></p>
      </div>
      <button type="button" id="follow-me" class="pill">내 위치로 찾아가기</button>
    </div>
    <p id="loc-line" hidden></p>
    <p class="sub" id="dist"></p>
    <p class="sub" id="meta" hidden></p>
    <p class="sub" id="ctx-line"></p>
    <div id="notices"></div>
    <div id="chips" hidden></div>
    <div class="playhead">
      <div class="action-wrap">
        <svg id="ring" viewBox="0 0 84 84" role="img" aria-label="">
          <circle cx="42" cy="42" r="38" class="ring-track"/>
          <circle cx="42" cy="42" r="38" id="ring-arc" transform="rotate(-90 42 42)"/>
        </svg>
        <button type="button" id="action" aria-label="재생">미리 듣기</button>
      </div>
      <div class="playcopy">
        <p id="story-title" hidden></p>
        <h1 id="alias" hidden></h1>
        <p class="sub" id="place" hidden></p>
        <p id="dek"></p>
        <p id="live"></p>
        <div class="story-meter" aria-hidden="true"><i id="story-fill"></i></div>
        <p class="story-clock"><span id="story-time">0:00</span><span id="story-total">0:08</span></p>
        <div class="play-links">
          <button type="button" id="transcript-toggle" class="plink" hidden aria-expanded="false">원고</button>
          <button type="button" id="noise-hint" class="plink" hidden>소리가 묻히나요?</button>
        </div>
        <ol id="transcript" hidden></ol>
      </div>
    </div>
    <p id="safety" hidden></p>
    <p id="gate-note" hidden></p>
    <div id="pfeed"></div>
    <form id="whisper" hidden>
      <label for="whisper-input">흔적 남기기 · 이 자리에 온 사람에게만 보여요</label>
      <div class="whisper-row">
        <input id="whisper-input" maxlength="80" placeholder="한 줄" autocomplete="off">
        <button type="submit">남기기</button>
      </div>
    </form>
    <div class="sheet-row">
      <button type="button" id="share" hidden>카드 · 클립</button>
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
  <button type="button" data-tab="discover" aria-selected="false">탐색</button>
  <button type="button" data-tab="keeps" aria-selected="false">서랍</button>
  <button type="button" data-tab="work" aria-selected="false" class="creator-only">작업</button>
</nav>
<div id="discover" hidden>
  <h2 class="page-title">탐색</h2>
  <p id="disc-where"></p>
  <h3 class="section-title">드롭</h3>
  <div id="disc-drops"></div>
  <h3 class="section-title">코스</h3>
  <div id="disc-courses"></div>
  <h3 class="section-title" id="disc-hints-label">단서</h3>
  <div id="disc-hints"></div>
</div>
<div id="vault" hidden>
  <h2 class="page-title">서랍</h2>
  <p id="vault-count"></p>
  <div id="vault-recap"></div>
  <div class="seg seg3" id="vault-views" role="group" aria-label="보기">
    <button type="button" data-view="list" aria-pressed="true">목록</button>
    <button type="button" data-view="map" aria-pressed="false">지도</button>
    <button type="button" data-view="calendar" aria-pressed="false">달력</button>
  </div>
  <div id="vault-list"></div>
  <h3 class="section-title">수집</h3>
  <div id="vault-stats"></div>
</div>
<div id="work" hidden>
  <div class="seg seg4" role="tablist" aria-label="작업">
    <button type="button" id="work-rehearsal" data-work="rehearsal" aria-selected="true">리허설</button>
    <button type="button" id="work-studio" data-work="studio" aria-selected="false">스튜디오</button>
    <button type="button" id="work-metrics" data-work="metrics" aria-selected="false">지표</button>
    <button type="button" id="work-native" data-work="native" aria-selected="false">화면 밖</button>
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
    <h3 class="section-title">맥락 시뮬</h3>
    <div class="tools-grid two">
      <label>날씨
        <select id="sim-weather">
          <option value="">실제 (날씨 API)</option>
          <option value="clear">맑음</option>
          <option value="cloudy">흐림</option>
          <option value="rain">비</option>
          <option value="snow">눈</option>
        </select>
      </label>
      <label>하늘
        <select id="sim-sky">
          <option value="">실제 (해 위치)</option>
          <option value="dawn">새벽</option>
          <option value="day">낮</option>
          <option value="golden">해 질 녘</option>
          <option value="blue">블루 아워</option>
          <option value="night">밤</option>
        </select>
      </label>
      <label>해 질 녘 잠금
        <select id="sim-golden">
          <option value="">실제 (일몰 계산)</option>
          <option value="on">해 질 녘</option>
          <option value="off">아님</option>
        </select>
      </label>
      <label>움직임
        <select id="sim-motion">
          <option value="">센서</option>
          <option value="still">앉아 있음</option>
          <option value="walking">걷는 중</option>
        </select>
      </label>
      <label>동행 인원
        <select id="sim-group">
          <option value="">실제</option>
          <option value="1">1명</option>
          <option value="2">2명</option>
          <option value="4">4명</option>
        </select>
      </label>
      <label>붐빔
        <select id="sim-occ">
          <option value="">기본 (더미)</option>
          <option value="0">한산</option>
          <option value="99">붐빔</option>
        </select>
      </label>
      <label>GPS 오차
        <select id="sim-acc">
          <option value="0">0m</option>
          <option value="15">15m</option>
          <option value="35">35m (골목)</option>
        </select>
      </label>
    </div>
    <label class="range sim-heading">시선
      <input id="sim-heading" type="range" min="-1" max="359" value="-1" aria-label="시선 방향">
      <span id="sim-heading-read">센서</span>
    </label>
    <div class="pad" role="group" aria-label="이동">
      <button type="button" data-move="n" aria-label="북쪽으로 5m">↑</button>
      <button type="button" data-move="w" aria-label="서쪽으로 5m">←</button>
      <button type="button" data-move="e" aria-label="동쪽으로 5m">→</button>
      <button type="button" data-move="s" aria-label="남쪽으로 5m">↓</button>
      <span id="sim-east">동서 0m</span>
    </div>
    <div class="tool-buttons">
      <button type="button" id="sim-visit">방문 기록 +1</button>
      <button type="button" id="sim-spoof">순간이동 시험</button>
      <button type="button" id="sim-prefetch">주변 미리 받기</button>
      <button type="button" id="sim-noise">주변 소음 맞춤</button>
      <button type="button" id="sim-reset">플랫폼 기록 초기화</button>
    </div>
    <p id="sim-readout"></p>
  </div>
  <div id="studio" hidden>
    <h3 class="section-title">새 공간</h3>
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
        <h3 class="section-title">이 자리</h3>
        <div id="preview-here"></div>
      </section>
      <section>
        <h3 class="section-title">밖</h3>
        <div id="preview-home"></div>
      </section>
    </div>
    <details id="manuscript">
      <summary>원고</summary>
      <div id="manuscript-body"></div>
    </details>
    <h3 class="section-title">피드</h3>
    <label>공간 <select id="studio-space"></select></label>
    <div id="studio-feed"></div>
    <form id="studio-add">
      <h3 class="section-title">추가</h3>
      <label>템플릿
        <select id="studio-template">
          <option value="">직접 입력</option>
          <option value="walk">오디오 워크</option>
          <option value="playlist">장소 플레이리스트</option>
          <option value="quest">퀘스트 (소리 찾기)</option>
          <option value="docent">도슨트</option>
          <option value="capsule">타임캡슐</option>
        </select>
      </label>
      <label>유형
        <select id="studio-type">
          <option value="story">Story</option>
          <option value="music">Music</option>
          <option value="note">Note</option>
          <option value="soundscape">Soundscape</option>
          <option value="docent">Docent</option>
          <option value="video">Then &amp; Now</option>
          <option value="game">Game</option>
          <option value="capsule">Capsule</option>
        </select>
      </label>
      <div id="studio-fields"></div>
      <label>잠금
        <select id="studio-lock">
          <option value="onsite">현장 (반경 안)</option>
          <option value="dwell">체류</option>
          <option value="condition">조건</option>
          <option value="revisit">재방문</option>
          <option value="afterglow">잔향 (방문 뒤 어디서나)</option>
          <option value="capsule">타임캡슐</option>
        </select>
      </label>
      <div id="studio-lock-fields"></div>
      <label>등급
        <select id="studio-tier">
          <option value="creator">크리에이터</option>
          <option value="curated">큐레이션</option>
        </select>
      </label>
      <label class="check"><input id="studio-sponsor" type="checkbox"> 스폰서 콘텐츠</label>
      <label id="studio-sponsor-wrap" hidden>스폰서 이름 <input id="studio-sponsor-name" maxlength="40"></label>
      <p id="studio-lock-desc" class="work-note"></p>
      <button type="submit">등록</button>
    </form>
    <p id="studio-status"></p>
  </div>
  <div id="metrics" hidden>
    <h3 class="section-title">1단계 지표</h3>
    <div class="phase" role="group" aria-label="데이터">
      <button type="button" id="metrics-local" aria-pressed="true">이 기기</button>
      <button type="button" id="metrics-sample" aria-pressed="false">샘플 코호트</button>
      <button type="button" id="metrics-clear">기록 지우기</button>
    </div>
    <p id="metrics-label" class="work-note"></p>
    <div id="metrics-tiles" class="kpis"></div>
    <div class="table-wrap"><table id="metrics-table"></table></div>
    <p class="work-note">핵심 가설: "집에서 못 듣는다는 제약이 가 볼 이유가 되는가". 티저 → 방문 전환율로 확인합니다.</p>
  </div>
  <div id="native" hidden>
    <h3 class="section-title">화면 밖 설계 미리보기</h3>
    <p class="work-note">네이티브 앱에서만 가능한 화면입니다. 웹 프로토타입에서는 실제로 표시되지 않고, 지금 앱 상태로 움직이는 시안만 보여 줍니다. 잠금 화면 미디어 정보와 진동 패턴은 웹에서도 실제로 동작합니다.</p>
    <div id="native-list"></div>
  </div>
</div>
<div id="settings" class="sheet-modal" hidden>
  <section role="dialog" aria-modal="true" aria-labelledby="settings-title">
    <div class="sheet-head">
      <h2 id="settings-title">설정</h2>
      <button type="button" id="settings-close" class="icon-btn" aria-label="닫기">✕</button>
    </div>
    <label class="field">탐색 모드
      <select id="disc-channel">
        <option value="">지역 기본</option>
        <option value="local">로컬 탐색 · 단서와 안개</option>
        <option value="tour">관광 안내 · 정확한 위치</option>
      </select>
    </label>
    <label class="field">언어
      <select id="disc-lang">
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </label>
    <h3 class="section-title">소리 안내</h3>
    <label class="check"><input id="set-approach" type="checkbox" checked> 다가가면 그 자리의 소리가 커져요</label>
    <label class="check"><input id="disc-radar" type="checkbox"> 소리 레이더 · 근처 자리를 짧은 신호로</label>
    <button type="button" id="disc-sensors" class="pill">방향·움직임 센서 켜기</button>
    <h3 class="section-title">개인정보</h3>
    <label class="check"><input id="vault-share" type="checkbox"> 방문 기록을 친구에게 공개</label>
    <p class="work-note">기본은 비공개예요. 위치 판정은 기기 안에서 하고, 방문 기록도 이 기기에만 남아요.</p>
    <h3 class="section-title">만드는 사람</h3>
    <label class="check"><input id="set-creator" type="checkbox"> 크리에이터 모드 · 리허설, 스튜디오, 지표</label>
  </section>
</div>
<div id="arrival" hidden aria-hidden="true">
  <div class="ripples"><i></i><i></i><i></i></div>
  <p class="arrival-kicker">도착</p>
  <h2 id="arrival-alias"></h2>
  <p id="arrival-sub"></p>
</div>
<p id="leaving" hidden aria-hidden="true"></p>
<div id="permit" class="sheet-modal" hidden>
  <section role="dialog" aria-modal="true" aria-labelledby="permit-title">
    <h2 id="permit-title"></h2>
    <p id="permit-why"></p>
    <p id="permit-promise" class="promise"></p>
    <div class="row">
      <button type="button" id="permit-later" class="pill">나중에</button>
      <button type="button" id="permit-allow" class="pill primary">허용</button>
    </div>
  </section>
</div>
<div id="fog" hidden>
  <article>
    <p class="kicker">카드</p>
    <h2 id="fog-alias"></h2>
    <p id="fog-line"></p>
    <div class="row">
      <button type="button" id="copy">복사</button>
      <button type="button" id="clip-open">15초 현장 클립</button>
      <button type="button" id="fog-sticker">단서 스티커</button>
      <button type="button" id="fog-close">닫기</button>
    </div>
  </article>
</div>
<div id="clip" hidden>
  <article>
    <p class="kicker">현장 클립</p>
    <h2 id="clip-alias"></h2>
    <canvas id="clip-canvas" width="540" height="960"></canvas>
    <video id="clip-video" muted playsinline hidden></video>
    <label class="check"><input id="clip-cam" type="checkbox"> 카메라 화면 위에 만들기</label>
    <p id="clip-status"></p>
    <div id="clip-out" hidden>
      <video id="clip-preview" controls playsinline></video>
      <div class="row">
        <a id="clip-save" href="#">저장</a>
        <button type="button" id="clip-share">공유</button>
      </div>
    </div>
    <div class="row">
      <button type="button" id="clip-rec">15초 녹화</button>
      <button type="button" id="clip-sticker">단서 스티커</button>
      <button type="button" id="clip-close">닫기</button>
    </div>
  </article>
</div>
`;
