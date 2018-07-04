let CACHE_NAME = 'mws-restaurant-v1';

let cacheUrls = [
  "/",
  "css/styles.css",
  "data/restaurants.json",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg",
  "js/dbhelper.js",
  "js/main.js",
  "js/restaurant_info.js",
  "index.html",
  "restaurant.html",
  "sw_registration.js"
];

self.addEventListener('install', function(event) {
  // Perform install
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cacheUrls);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      Promise.all(cacheNames.filter(function(cacheName) {
        return cache.startsWith('mws-') && cacheName != staticCacheName;
      }).map(function(cacheName) {
        console.log("ServiceWorker removing cached files from " + cacheName)
        return caches.delete(cacheName);
      }));
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
