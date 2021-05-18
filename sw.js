// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests


const CACHE_NAME = 'journal-cache-v1';
const urlsToCache = [
    './', 
    './style.css',
    './index.html',
    './scripts/script.js',
    './scripts/router.js',
    './components/entry-page.js',
    './components/journal-entry.js',
]  
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            if (response) {
                return response
            }
            return fetch(e.request).then(
                (response) => {
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    let responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                    .then((cache) => cache.put(e.request, responseToCache))
                    return response;
                }
            )
        })

    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
})