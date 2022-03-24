import { useEffect } from 'react';

export function useNukeSW() {
  // old version of the site used a service worker, we need to nuke it so people see the new version
  useEffect(() => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        console.log('unregistering service worker', registration);
        registration.unregister();
      }
    });
  }, []);
}
