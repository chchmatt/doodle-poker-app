// Keeps the app's own files (not the records, not the cloud) so the app opens from the disk. A new build has a new name, and the old files are removed.
const CACHE = 'dp-app-f3c3b857ae';
const FILES = ["./","index.html","assets/style-9ca2e253.css","assets/app-GLSKLJGM.js","assets/open-worker-7ed72766.js","assets/fonts/PermanentMarker-Regular.ttf","assets/fonts/SairaStencilOne-Regular.ttf","assets/chunk-ESEMA7KK.js","assets/chunk-Y7N664HK.js","assets/chunk-5MKIHOXL.js","assets/chunk-LNZNMLCI.js","assets/chunk-VQYLVK5J.js","assets/chunk-E64E2GFH.js","assets/chunk-3JHXMJGB.js","assets/chunk-GT4R6H4Y.js","assets/chunk-P5YWMB3D.js","assets/chunk-PWR6LBOG.js","assets/chunk-R3N62QRR.js"];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // the table of a hand's page (/hand/app/: about 12 MB with the engine) is not fetched when the app is installed, only kept the first time a hand's page needs it (and dropped with the rest when a new build comes)
  const table = u.pathname.startsWith('/hand/app/');
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => { if (table && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); } return res; })));
});
