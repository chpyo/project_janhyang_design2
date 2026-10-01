const VERSION = "4";
const CACHE = "janhyang-shell-v" + VERSION;
const CONTENT = "janhyang-content-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./engine.js",
  "./app.css",
  "./platform/content.json"
].concat(["context", "sky", "presence", "access", "content", "safety", "metrics", "discover", "play", "stage", "permit", "feed", "archive", "clip", "native", "platform", "selftest"].map((n) => "./platform/" + n + ".js"));

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE && key !== CONTENT).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

function isTile(url) {
  return /(^|\.)openstreetmap\.(de|org|fr)$/.test(url.hostname);
}

// 현장 키는 절대 캐시하지 않는다. 오프라인에서도 암호문만 있고 키는 없다.
function isKey(url) {
  return url.pathname.indexOf("/janhyang/platform/keys/") === 0;
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (isTile(url) || event.request.method !== "GET" || url.origin !== self.location.origin || isKey(url)) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(event.request);
      const copy = fresh.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
      return fresh;
    } catch (e) {
      const cached = await caches.match(event.request, { ignoreSearch: true });
      if (cached) return cached;
      if (event.request.mode === "navigate") {
        return (await caches.match("./index.html")) || (await caches.match("./"));
      }
      throw e;
    }
  })());
});
