const cacheName = 'hoenn-pwa-v1';

const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/js/main.js',

  // pages
  '/cities/dewford.html',
  '/cities/evergrande.html',
  '/cities/fallabor.html',
  '/cities/fortree.html',
  '/cities/lavaridge.html',
  '/cities/lillycove.html',
  '/cities/littleroot.html',
  '/cities/mauvile.html',
  '/cities/mossdeep.html',
  '/cities/oldale.html',
  '/cities/pacifidlog.html',
  '/cities/petalburg.html',
  '/cities/rustboro.html',
  '/cities/slateport.html',
  '/cities/sootopolis.html',
  '/cities/verdanturf.html',

  // images
  '/images/map-hoenn.webp'
];

// cache install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// fetch handler
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        if (event.request.method === 'GET') {
          caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
          });
        }
        return fetchResponse;
      });
    })
  );
});

// cleanup old cache
self.addEventListener('activate', event => {
  const whitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (!whitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});
