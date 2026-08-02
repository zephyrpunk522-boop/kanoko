const CACHE = "flower-water-v6";
const ASSETS = [
  "/",
  "index.html",
  "manifest.webmanifest",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "flowers/油画女郎.png",
  "flowers/大白月光.png",
  "flowers/小白月光.png",
  "flowers/苹果花.png",
  "flowers/幻想曲.png",
  "flowers/玛菲特_甜心.png",
  "flowers/猩红玛丽.png",
  "flowers/yu泰.png",
  "flowers/粉色飞溅.png",
  "flowers/安妮.png",
  "flowers/粉旗鱼.png",
  "flowers/抹茶巧克力.png",
  "flowers/ROSE.png",
  "flowers/莲叶.png"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e=>{
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(resp=>{
      const cp = resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request, cp));
      return resp;
    }).catch(()=> caches.match("index.html")))
  );
});
