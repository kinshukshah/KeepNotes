var staticCacheName = "keepnotes-cache-v1";
var dynamicCacheName = "keepnotes-dynamicCache-v1";
var urlsToCache = [
  "/",
  "/index.html",
  "../src/index.js",
  "../src/index.css",
  "../src/App.js",
  "../src/App.css",
  "/static/js/bundle.js",
  "/static/js/vendors~main.chunk.js",
  "/static/js/main.chunk.js",
  "https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-book-education-justicon-flat-justicon-1.png",
];

// // Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets...", cache);
      cache.addAll(urlsToCache);
    })
  );
  console.log("service worker installed");
});

// // Cache and return requests
self.addEventListener("fetch", (event) => {
  //console.log("Fetch Events", event);
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request).then((fetchRes) => {
          caches
            .open(dynamicCacheName)
            .then((cache) => cache.put(event.request.url, fetchRes.clone()));
          return fetchRes;
        })
      );
    })
  );
});

// // Update a service worker
self.addEventListener("activate", (event) => {
  //console.log("service worker activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key != staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
