var cacheName = "tactoe16PWA-v2";
var assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/js/game.js",
  "/js/graphicsO.js",
  "/js/graphicsX.js",
  "/css/styles.css",
  "/assets/TacToe16.svg",
  "/assets/TacToe16.ico",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
self.addEventListener("fetch", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key != cacheName).map((key) => caches.delete(key))
      );
    })
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((responce) => {
      return responce || fetch(e.request);
    })
  );
});
