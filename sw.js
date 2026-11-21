// Tool Holder Maker service worker: works offline after the first visit.
// Pages: network first (new versions show up at once), cached copy when offline.
// Libraries on jsDelivr / Google Fonts: cache first (their URLs carry the version).
// The phone relay is never cached.
const VER = "thm-v1";
const SHELL = ["./", "index.html", "capture.html", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "samples/hozan_p14_pliers.jpg"];
const LIBS = [
  "https://cdn.jsdelivr.net/npm/@techstark/opencv-js@5.0.0-release.1/dist/opencv.js",
  "https://cdn.jsdelivr.net/npm/manifold-3d@3.5.5/manifold.js",
  "https://cdn.jsdelivr.net/npm/manifold-3d@3.5.5/manifold.wasm",
  "https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.module.js",
  "https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.core.js",
  "https://cdn.jsdelivr.net/npm/three@0.187.0/examples/jsm/controls/OrbitControls.js",
  "https://cdn.jsdelivr.net/npm/qrcode-generator@2.0.4/dist/qrcode.mjs",
];
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VER);
    // one missing file must not stop the install
    await Promise.allSettled([...SHELL, ...LIBS].map(u => c.add(new Request(u, { cache: "reload" }))));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VER) await caches.delete(k);
    await self.clients.claim();
  })());
});
const LIB_HOSTS = ["cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (LIB_HOSTS.includes(u.host)) { e.respondWith(cacheFirst(r)); return; }
  if (u.origin !== location.origin) return;            // relay and anything else: straight to the network
  if (r.mode === "navigate" || /\.(html|webmanifest|js)$/.test(u.pathname) || u.pathname.endsWith("/")) { e.respondWith(networkFirst(r)); return; }
  e.respondWith(staleWhileRevalidate(r));
});
async function cacheFirst(r) {
  const c = await caches.open(VER), hit = await c.match(r, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(r); if (res.ok || res.type === "opaque") c.put(r, res.clone()); return res;
}
async function networkFirst(r) {
  const c = await caches.open(VER);
  try { const res = await fetch(r); if (res.ok) c.put(r, res.clone()); return res; }
  catch (err) { return (await c.match(r, { ignoreSearch: true })) || (r.mode === "navigate" && await c.match("index.html")) || Response.error(); }
}
async function staleWhileRevalidate(r) {
  const c = await caches.open(VER), hit = await c.match(r);
  const net = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}
