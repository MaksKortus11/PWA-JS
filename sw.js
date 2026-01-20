const cacheName = 'hoenn-pwa-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/js/main.js',
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
  '/images/map-hoenn.webp',
  '/images/cities/dewford.jpg',
  '/images/cities/evergrande.jpg',
  '/images/cities/fallabor.jpg',
  '/images/cities/fortree.jpg',
  '/images/cities/lavaridge.jpg',
  '/images/cities/lillycove.jpg',
  '/images/cities/littleroot.jpg',
  '/images/cities/mauvile.jpg',
  '/images/cities/mossdeep.jpg',
  '/images/cities/oldale.jpg',
  '/images/cities/pacifidlog.jpg',
  '/images/cities/petalburg.jpg',
  '/images/cities/rustboro.jpg',
  '/images/cities/slateport.jpg',
  '/images/cities/sootopolis.jpg',
  '/images/cities/verdanturf.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        if (event.request.method === 'GET') {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        }
        return fetchResponse;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});






