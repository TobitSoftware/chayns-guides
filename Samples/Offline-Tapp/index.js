
if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

window.addEventListener('load', function() {
    window.applicationCache.addEventListener('updateready', function() {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            window.location.reload();
        }
    }, false);
}, false);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}





