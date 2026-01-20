const STATIC_CACHE = 'hoenn-static-v1';
const DYNAMIC_CACHE = 'hoenn-dynamic-v1';

const filesToCache = [
  './',
  './index.html',
  './style.css',
  './js/main.js',
  './cities/dewford.html',
  './cities/evergrande.html',
  './cities/fallabor.html',
  './cities/fortree.html',
  './cities/lavaridge.html',
  './cities/lillycove.html',
  './cities/littleroot.html',
  './cities/mauvile.html',
  './cities/mossdeep.html',
  './cities/oldale.html',
  './cities/pacifidlog.html',
  './cities/petalburg.html',
  './cities/rustboro.html',
  './cities/slateport.html',
  './cities/sootopolis.html',
  './cities/verdanturf.html',
  './images/map-hoenn-640.webp',
  './images/map-hoenn-1024.webp',
  './images/map-hoenn-1350.webp',
  './offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  if (event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request).then(res => res || caches.match('./offline.html')))
    );
  }
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
