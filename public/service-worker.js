// navigator.serviceWorker.getRegistrations().then((registrations) => {
//   for (const registration of registrations) {
//     console.log('unregistering service worker', registration);
//     registration.unregister();
//   }
// });

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing Service Worker ...', e);
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  self.registration
    .unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => {
      console.log(clients);
      clients.forEach((client) => client.navigate(client.url));
    });
});
