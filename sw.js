const cacheName = 'hoenn-pwa-v1';
const basePath = '/PWA-JS/';

const filesToCache = [
  basePath,
  basePath + 'index.html',
  basePath + 'style.css',
  basePath + 'js/main.js',
  basePath + 'cities/dewford.html',
  basePath + 'cities/evergrande.html',
  basePath + 'cities/fallabor.html',
  basePath + 'cities/fortree.html',
  basePath + 'cities/lavaridge.html',
  basePath + 'cities/lillycove.html',
  basePath + 'cities/littleroot.html',
  basePath + 'cities/mauvile.html',
  basePath + 'cities/mossdeep.html',
  basePath + 'cities/oldale.html',
  basePath + 'cities/pacifidlog.html',
  basePath + 'cities/petalburg.html',
  basePath + 'cities/rustboro.html',
  basePath + 'cities/slateport.html',
  basePath + 'cities/sootopolis.html',
  basePath + 'cities/verdanturf.html',
  basePath + 'images/map-hoenn-640.webp',
  basePath + 'images/map-hoenn-1024.webp',
  basePath + 'images/map-hoenn-1350.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match(basePath + 'index.html');
      }
    })
  );
});

self.addEventListener('activate', event => {
  const whitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (!whitelist.includes(key)) return caches.delete(key);
      }))
    )
  );
});
