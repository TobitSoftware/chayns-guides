# Let your Tapp work offline 

## How can you do this? 

With a service worker you can have complete control over how your website behaves when the
network is not available or slow. It is an event-driven worker registered depending on an origin and a path.
Service workers only run over HTTPS, for security reasons.


You nerver heard about Service Worker? Have a look at [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers/)
or at [The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/) for more functions.

## Getting started

First you need to register for a service worker in your index.js:

```js
if (!window.location.origin) { //if you need the service worker in an iframe you have to change the origin
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
window.addEventListener('load', function () { //this function loads automatically the newest version
    window.applicationCache.addEventListener('updateready', function () {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            window.location.reload();
        }
    }, false);
}, false);

if ('serviceWorker' in navigator) { //checks if the service worker is possible in the browser
    navigator.serviceWorker.register('sw.js'); //register the sw.js (sw.js must be in the same file as index.js)
}
```

### Initial lifecycle

Your worker script goes through three stages when you call `.register`:

1. Download
2. Install
3. Activate

In your sw.js:

  * You can use events to interact with `install`:

```js
self.addEventListener('install', function(e) {
        self.skipWaiting();//to do an immediate takeover of all pages within scope
    });
```

  * Now you need to activate it:

```js
self.addEventListener('activate', function(e) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(cacheName) {
                return caches.delete(cacheName);
            }));
        }).then(function(res) {
             console.debug('deleted all caches', res);
        });
    });
```

During the activation you need to check if there are old service worker and delete the cache, so that just the current service
worker runs and caches all responses.


  * Then you can fetch everything (excepting iframes & `<object>`s – these will pick their own controller based on their
resource URL)

That is a nice process to cache everything. First I explain how the process works and later on the functions in detail.


```js
  self.addEventListener('fetch', function(e) {
        e.respondWith( //to handle the request and prevent the default
            Promise.race([ //so that you can start working with the fastest and don't have to wait
                timeout(200).then(function(res) {
                    return cacheResponse(e); //if you have slow connection you can get it out of the cache
                }),
                networkResponse(e).then(function(res) { //the main part of your fetch where you put everything in the cache
                    return res;
                }).catch(function() {
                    return cacheResponse(e);//load something out of the cache
                })
            ]).then(function(result) {
                if (result.response instanceof Response) {
                    return result;
                }

                return networkResponse(e).then(function(res) {
                    return res;
                });
            }).then(function(res) {

                return res.response;
            })
        );
    });
```




```js
function timeout(time) { //if your request takes to long you can load out of the cache
        return new Promise(function(resolve) {
            setTimeout(resolve, time);
        });
    }

    function cacheResponse(e) {//if the request match with something out of the cache you'll get it
        return caches.match(e.request).then(function(cacheResult) {
            return {
                type: 'CACHE',
                response: cacheResult
            };
        });
    }
    function networkResponse(e) {
            return fetch(e.request).then(function (response) {

                if (e.request.method !== "GET") { //other methods need special fetch functions
                    return;
                }
                caches.open('serviceWorker').then(function (cache) {
                    cache.put(e.request, response);//puts the response in the cache
                });

                return {
                    type: 'NETWORK',
                    response: response.clone()//and a response.clone() back to the network
                };

            });
        }

```




