/* KokeKompis — privacy policy
   Theme handling: a sun/moon toggle that switches between light and dark.
   Until the visitor picks a theme, the page follows the operating system.
   Loaded in <head> so the stored theme is applied before the first paint. */
(function () {
  'use strict';

  var KEY = 'kokekompis-theme';
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var icons = document.querySelectorAll('link[rel="icon"]');
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function stored() {
    try {
      return window.localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function persist(value) {
    try {
      if (value === 'light' || value === 'dark') {
        window.localStorage.setItem(KEY, value);
      } else {
        window.localStorage.removeItem(KEY);
      }
    } catch (e) {
      /* storage unavailable — the theme still applies for this page view */
    }
  }

  function apply(value) {
    if (value === 'light' || value === 'dark') {
      root.setAttribute('data-theme', value);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function isDark() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark') return true;
    if (explicit === 'light') return false;
    return !!(darkQuery && darkQuery.matches);
  }

  function syncMeta() {
    if (meta) {
      meta.setAttribute('content', isDark() ? '#141412' : '#faf8f5');
    }
  }

  /* Swap the app icon to its light or dark variant. Without JavaScript the
     media attribute on the tag decides; once we are here we set both links
     explicitly and drop the media query, so the icon always matches the
     theme the visitor actually sees. */
  function syncFavicon() {
    if (!icons.length) return;
    var href = isDark() ? 'assets/favicon-dark.svg' : 'assets/favicon.svg';
    for (var i = 0; i < icons.length; i++) {
      icons[i].setAttribute('href', href);
      icons[i].removeAttribute('media');
    }
  }

  function syncButton(button) {
    var dark = isDark();
    var mode = root.getAttribute('data-theme');
    var other = dark ? 'light' : 'dark';
    var label = (mode ? mode : 'system (' + (dark ? 'dark' : 'light') + ')') +
      ' — switch to ' + other + ' theme';
    button.setAttribute('data-state', dark ? 'dark' : 'light');
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  apply(stored());
  root.classList.remove('no-js');
  root.classList.add('js');
  syncMeta();
  syncFavicon();

  if (darkQuery) {
    var onSystemChange = function () {
      syncMeta();
      syncFavicon();
      var button = document.getElementById('theme-toggle');
      if (button) syncButton(button);
    };
    if (darkQuery.addEventListener) {
      darkQuery.addEventListener('change', onSystemChange);
    } else if (darkQuery.addListener) {
      darkQuery.addListener(onSystemChange);
    }
  }

  function init() {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    syncButton(button);

    button.addEventListener('click', function () {
      apply(isDark() ? 'light' : 'dark');
      persist(root.getAttribute('data-theme'));
      syncMeta();
      syncFavicon();
      syncButton(button);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
