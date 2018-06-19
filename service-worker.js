/**
 * The name of the current cache
 * @type {String}
 */
const CACHE_NAME = 'v1';

/**
 * Files to cache
 * @type {Array}
 */
const fileCache = [
  '/',
  '/index.html',
  '/scripts.js',
  '/style.css'
];

this.oninstall = (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(fileCache);
      })
  );
};

this.onfetch = (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((res) => {
            const r = res.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, r);
            });
          return res; // Don't wait for the request to cache
          });
      })
  );
};
