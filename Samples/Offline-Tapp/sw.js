(function () {

    function timeout(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    function cacheResponse(e) {
        return caches.match(e.request).then(function (cacheResult) {
            return {
                type: 'CACHE',
                response: cacheResult
            };
        });
    }

    function networkResponse(e) {
        return fetch(e.request).then(function (response) {

            if (e.request.method !== "GET") {
                return;
            }
            caches.open('serviceWorker').then(function (cache) {
                cache.put(e.request, response);
            });

            return {
                type: 'NETWORK',
                response: response.clone()
            };

        });
    }

    self.addEventListener('install', function (e) {
        self.skipWaiting();
        //console.log('installed', e);
    });

    self.addEventListener('activate', function (e) {
        //console.log('activated', e);

        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                return caches.delete(cacheName);
            }));
        }).then(function (res) {
            console.debug('deleted all caches', res);
        });
    });


    self.addEventListener('fetch', function (e) {
        e.respondWith(
            Promise.race([
                timeout(200).then(function (res) {
                    return cacheResponse(e);
                }),
                networkResponse(e).then(function (res) {
                    return res;
                }).catch(function () {
                    return cacheResponse(e);
                })
            ]).then(function (result) {
                if (result.response instanceof Response) {
                    return result;
                }

                return networkResponse(e).then(function (res) {
                    return res;
                });
            }).then(function (res) {

                return res.response;
            })
        );
    });

})();