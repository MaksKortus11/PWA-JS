const cacheName = 'hoenn-pwa-v1';

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
  './images/map-hoenn-1350.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (event.request.method === 'GET') {
          caches.open(cacheName).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const whitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!whitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
