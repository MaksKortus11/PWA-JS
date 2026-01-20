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

  // images (LCP + inne)
  '/images/map-hoenn-640.webp',
  '/images/map-hoenn-1024.webp',
  '/images/map-hoenn-1350.webp'
];

// Install event: cache all files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Fetch event: cache-first strategy for images, network-first for other requests
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    // Cache-first for images
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

  // Network-first for other resources
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Optionally cache new requests
        if (event.request.method === 'GET') {
          caches.open(cacheName).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Activate event: remove old caches
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
