// Content Script

(function() {
  'use strict';

  // 先读取用户设置
  chrome.storage.local.get(['hevcEnabled'], (result) => {
    const enabled = result.hevcEnabled !== false;
    
    // 注入主脚本
    const mainScript = document.createElement('script');
    mainScript.src = chrome.runtime.getURL('inject.js');
    mainScript.onload = () => {
      // 脚本加载后立即通过 postMessage 传递初始状态
      window.postMessage({ type: 'HEVC_INIT', enabled }, '*');
      mainScript.remove();
    };
    mainScript.onerror = () => {
      mainScript.remove();
    };
    
    const target = document.head || document.documentElement;
    target.appendChild(mainScript);
  });

  // 监听来自 popup 的开关消息
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'TOGGLE_HEVC') {
      window.postMessage({ type: 'HEVC_TOGGLE', enabled: message.enabled }, '*');
    }
  });
})();
