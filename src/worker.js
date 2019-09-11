importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js'
);

const FALLBACK_HTML_URL = 'offline.html';

if (workbox) {
  // Offline
  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match(FALLBACK_HTML_URL);

      default:
        // If we don't have a fallback, just return an error response.
        return Response.error();
    }
  });
}
