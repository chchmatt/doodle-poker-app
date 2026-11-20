// Keeps the app's own files (not the records, not the cloud) so the app opens from the disk. A new build has a new name, and the old files are removed.
const CACHE = 'dp-app-88c61d0208';
const FILES = ["./","index.html","assets/style-0468b8b7.css","assets/app-LRP4Q6XC.js","assets/fonts/PermanentMarker-Regular.ttf","assets/fonts/SairaStencilOne-Regular.ttf","assets/chunk-IQSF6RLE.js"];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
