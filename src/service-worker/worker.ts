import { version } from '~/environments';

// TypeScript info
declare const self: ServiceWorkerGlobalScope;

const PRECACHE = version;
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  'offline.html',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting)
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        );
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log('[Cache] Pulling from cache', cachedResponse.url);
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request)
            .then(response => {
              // Put a copy of the response in the runtime cache.
              console.log('[Cache] Caching', response.url);
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            })
            .catch(() => {
              return caches.open(RUNTIME).then(cache => {
                console.log('[Cache] Offline');
                return cache.match('offline.html') as any;
              });
            });
        });
      })
    );
  }

  if (event.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  event.respondWith(fetch(event.request));
});
