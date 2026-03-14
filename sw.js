const CACHE_NAME = 'touchy-phone-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.png',
  '/store-banner.jpg',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response or fetch from network
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          // Cache new requests
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        })
      );
    })
  );
});

// Push notifications (optional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'إشعار جديد من تاتشي فون',
    icon: '/logo.png',
    badge: '/logo.png',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200],
    tag: 'touchy-phone-notification',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'فتح التطبيق'
      },
      {
        action: 'close',
        title: 'إغلاق'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('تاتشي فون', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
