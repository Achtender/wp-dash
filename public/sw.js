self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // const { request } = event;
  // if (request.method !== 'GET') return;

  // if (request.url.match(/\.(?:css|woff2?|eot|ttf|otf|png|jpg|jpeg|avif|svg|gif|ico)$/)) {
  //   event.respondWith(
  //     caches.open('static-assets-v1').then(cache =>
  //       cache.match(request).then(response =>
  //         response ||
  //         fetch(request).then(networkResponse => {
  //           cache.put(request, networkResponse.clone());
  //           return networkResponse;
  //         })
  //       )
  //     )
  //   );
  // }
});