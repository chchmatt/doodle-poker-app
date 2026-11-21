window.__doodleViewerFailed = function () { window.parent.postMessage({ type: 'doodle-poker-table-failed' }, location.origin); };
var s = document.createElement('script');
s.src = '/hand/app/viewer.js';
s.onerror = window.__doodleViewerFailed;
document.head.appendChild(s);
