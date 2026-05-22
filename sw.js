// Service worker — Karta Zleceń OIT
// Bump CACHE_VERSION przy każdej zmianie plików shella, aby wymusić odświeżenie cache.
const CACHE_VERSION = 'karta-oit-v3.7.0';

// App shell — pliki same-origin niezbędne do pracy offline.
const SHELL_ASSETS = [
  './',
  './index.html',
  './style.css',
  './professional-ui.css',
  './script.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Obsługujemy wyłącznie GET; POST/inne przepuszczamy do sieci.
  if (request.method !== 'GET') return;

  // Nawigacje (HTML) — network-first: świeża wersja online, cache jako fallback offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Pozostałe zasoby (CSS/JS/ikona/CDN) — cache-first z dożywianiem cache w tle.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
