// Keeps the app's own files (not the records, not the cloud) so the app opens from the disk. A new build has a new name, and the old files are removed.
const CACHE = 'dp-app-5aee300721';
const FILES = ["./","index.html","assets/style-f95c3548.css","assets/app-DV4J2SNK.js","assets/fonts/PermanentMarker-Regular.ttf","assets/fonts/SairaStencilOne-Regular.ttf","assets/chunk-D5CHT6ZE.js","assets/chunk-4PMJ2DG5.js","assets/chunk-IQSF6RLE.js"];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
