var cacheName = 'Solver_v31';
var filesToCache = [
  'readfiles.js',
  'solve.html',
  'solver_help.html',
  'solve.js',
  'rclib.js',
  'rch.js',
  'verify.js',
  'AnimCube3.js',
  'AnimCube.txt',
  'search.js',
  'search_d3a.js',
  'search_d3b.js',
  'style2.css',
  'style.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(function(response) {
      return response || fetch(e.request);
    })
  );
});



