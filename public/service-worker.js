const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/style.css',
    '/index.js',
    '/db.js',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-512x512.png'
];

const STATIC_CACHE = "static-cache-v1";
const RUNTIME_CACHE = "runtime-cache";

self.addEventListener("install", event => {
    event.waitUntil(
        caches
        .open(STATIC_CACHE)
        .then(cache => {
            return cache.addAll(FILES_TO_CACHE)
        })
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url.includes("/api/")) {
        event.respondWith(
        caches.open(RUNTIME_CACHE).then(cache => {
            return fetch(event.request)
            .then(response => {
                cache.put(event.request, response.clone());
                return response;
            })
            .catch(() => caches.match(event.request));
        })
        );
        return;
    }

    // use cache first for all other requests for performance
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
            return cachedResponse;
        }

        // request is not in cache. make network request and cache the response
            return caches.open(RUNTIME_CACHE).then(cache => {
                return fetch(event.request).then(response => {
                    return cache.put(event.request, response.clone()).then(() => {
                        return response;
                    });
                });
            });
        })
    );
});
