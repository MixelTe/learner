const cacheName = "offline";
const host = location.host;

const urlsToCache = [
    "./",
    "./manifest.json",
    "./favicon.ico",
    "https://fonts.googleapis.com/css?family=PT+Sans|Comfortaa|Arimo",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded",
    "./styles/base.css",
    "./styles/popup.css",
    "./styles/themes.css",
    "./styles/pageSwitch.css",
    "./styles/confetti.css",
    "./styles/formulas.css",
    "./styles/doc.css",
    "./styles/p-start.css",
    "./styles/p-tester.css",
    "./styles/p-stats.css",
    "./styles/p-qlists.css",
    "./styles/p-dayStats.css",
    "./styles/p-about.css",
    "./styles/p-settings.css",
    "./out/data/sections.js",
    "./out/pages/about.js",
    "./out/pages/dayStats.js",
    "./out/pages/qlist.js",
    "./out/pages/settings.js",
    "./out/pages/stats.js",
    "./out/pages/switchPage.js",
    "./out/confetti.js",
    "./out/dayStatistics.js",
    "./out/docBuilder.js",
    "./out/formulasBuilder.js",
    "./out/functions.js",
    "./out/keys.js",
    "./out/littleLib.js",
    "./out/main.js",
    "./out/metrika.js",
    "./out/popup.js",
    "./out/tester.js",
    "./out/testerItems.js",
    "./out/themes.js",
    "./out/trainer.js",
    "./imgs/github_black.svg",
    "./imgs/github_white.svg",
    "./imgs/mixelDev.png",
    "./imgs/telegram.svg",
    "./imgs/vertic.jpg",
    "./imgs/vk.svg",
];
self.addEventListener("install", e =>
    e.waitUntil(
        caches.open(cacheName).then(cache =>
            cache.addAll(urlsToCache)
        )
    )
);

self.addEventListener("fetch", (e) =>
{
    const reqHost = new URL(e.request.url).host;
    if (reqHost != host) return;

    e.respondWith((async () =>
    {
        const cache = await caches.open(cacheName);
        try
        {
            const fetchedResponse = await fetch(e.request.url);
            cache.put(e.request, fetchedResponse.clone());
            return fetchedResponse;
        }
        catch
        {
            return await cache.match(e.request.url);
        }
    })());
});
