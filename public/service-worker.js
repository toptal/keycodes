navigator.serviceWorker.getRegistrations().then((registrations) => {
  for (const registration of registrations) {
    console.log('unregistering service worker', registration);
    registration.unregister();
  }
});
