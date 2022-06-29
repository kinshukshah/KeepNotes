var staticCacheName = "keepnotes-cache";
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
  // event.waitUntil(
  //   caches.open(CACHE_NAME)
  //     .then(function(cache) {
  //       console.log('Opened cache');
  //       return cache.addAll(urlsToCache);
  //     })
  // );
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
  // event.respondWith(
  //   caches.match(event.request)
  //     .then(function(response) {
  //       // Cache hit - return response
  //       if (response) {
  //         return response;
  //       }
  //       return fetch(event.request);
  //     }
  //   )
  // );
  //console.log("Fetch Events", event);
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});

// // Update a service worker
self.addEventListener("activate", (event) => {
  // var cacheWhitelist = ['pwa-task-manager'];
  // event.waitUntil(
  //   caches.keys().then(cacheNames => {
  //     return Promise.all(
  //       cacheNames.map(cacheName => {
  //         if (cacheWhitelist.indexOf(cacheName) === -1) {
  //           return caches.delete(cacheName);
  //         }
  //       })
  //     );
  //   })
  // );
  //console.log("service worker activated");
});
