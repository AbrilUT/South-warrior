//Asignar nombre y versión al caché

const CACHE_NAME = 'v1_cache_102';

//Archivos a guardar

var urlsToCache = [

    './img/Abril.png',
    './img/Axel.png',
    './img/azteca.jpg',
    './img/azteca2.jpg',
    './img/azteca3.jpg',
    './img/Banner.jpg',
    './img/banner2.jpg',
    './img/download.png',
    './img/economy.png',
    './img/Experiencia.png',
    './img/facebook.png',
    './img/Hector.png',
    './img/Huitz.png',
    './img/Huitz2.png',
    './img/huitzilopochtli.jpg',
    './img/Imagen1.jpeg',
    './img/instagram.png',
    './img/linkedin.png',
    './img/Lobo.png',
    './img/Lobo2.png',
    './img/Lobodeagua.png',
    './img/Lobodemar.png',
    './img/Logo.png',
    './img/menu.png',
    './img/personajes1.jpg',
    './img/Rata.png',
    './img/snapchat.png',
    './img/twitter.png',
    './img/Huitz2.png',
    './',
    './style.css',
    './main.js',
    '/manifest.json',
    '/index.html',
    '/index_en.html',
    './sw.js',
    '/form.html',
    '/form.css',
    '/form_contact.html',
 
];

//Install - Instalación del SW
self.addEventListener('install', e => {      
    e.waitUntil(
        caches.open(CACHE_NAME)   
        .then(cache => {
            cache.addAll(urlsToCache) 
            .then(() =>{
                self.skipWaiting();
            })
        })
        .catch(err => {
            console.log('El becario borró la base de datos!', err);
        })
    )
});

//Activar

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if(cacheWhitelist.indexOf(cacheName) == -1){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
})

//Fetch

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    return res;
                }
                return fetch(e.request);
            })
    );
});

