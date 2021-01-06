// This is a Service Worker, caches assets for offline use
var cacheName = "tactoe16sw-v1.2";
var assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/js/shared.js",
  "/js/game.js",
  "/js/computer_ai.js",
  "/js/graphics.js",
  "/css/styles.css",
  "/assets/TacToe16.svg",
  "/assets/TacToe16.ico",
];

// Cache files on Service Worker installation
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Site data recached");
      cache.addAll(assets);
    })
  );
});

// Delete old versions of cache
self.addEventListener("fetch", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key != cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// If offline, get files from cache
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((responce) => {
      return responce || fetch(e.request);
    })
  );
});
