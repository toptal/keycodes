self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing Service Worker ...', e)
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate')
  self.registration
    .unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => {
      console.log(clients)
      clients.forEach((client) => client.navigate(client.url))
    })
})
