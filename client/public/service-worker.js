const CACHE_NAME = 'v1'
const urlsToCache = ['index.html', 'offline.html']

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then(() => fetch(e.request).catch(() => caches.match('offline.html')))
  )
})

self.addEventListener('activate', (e) => {
  const cacheWhiteList = []
  cacheWhiteList.push(CACHE_NAME)

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})
