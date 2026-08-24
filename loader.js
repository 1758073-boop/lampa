// loader.js — стабильный загрузчик плагина online_mod для Lampa.
//
// Добавляется в Lampa ОДИН РАЗ как плагин по URL (и больше никогда не меняется):
//   https://cdn.jsdelivr.net/gh/1758073-boop/lampa@main/loader.js
//
// При каждом запуске он подгружает свежий online_mod.js, дописывая метку времени.
// Для webview телевизора это каждый раз "новый" адрес, поэтому старый кэш не мешает —
// менять URL/суффикс вручную больше не нужно.
(function () {
  var PLUGIN_URL = 'https://cdn.jsdelivr.net/gh/1758073-boop/lampa@main/online_mod.js';

  function inject() {
    var script = document.createElement('script');
    script.src = PLUGIN_URL + '?_=' + Date.now(); // обход кэша webview
    script.async = false;
    script.onerror = function () {
      if (window.Lampa && Lampa.Noty) Lampa.Noty.show('loader: не удалось загрузить online_mod.js');
    };
    (document.head || document.body || document.documentElement).appendChild(script);
  }

  if (document.head || document.body) inject();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
