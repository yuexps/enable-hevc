// Content Script

(function() {
  'use strict';

  function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    script.onload = script.onerror = () => script.remove();
    (document.head || document.documentElement).insertBefore(script, null);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectScript, { once: true });
  } else {
    injectScript();
  }
})();

