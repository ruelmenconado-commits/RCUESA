
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rotary-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/logo.png',
        '/logo-192.png',
        '/manifest.json'
      ]);
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
