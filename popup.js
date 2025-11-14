document.addEventListener('DOMContentLoaded', () => {
  // 加载国际化文本
  loadI18nMessages();
  
  const toggleSwitch = document.getElementById('toggle-switch');
  const statusText = document.getElementById('status-text');
  
  // 加载保存的状态
  chrome.storage.local.get(['hevcEnabled'], (result) => {
    const enabled = result.hevcEnabled !== false; // 默认启用
    toggleSwitch.checked = enabled;
    updateStatus(enabled);
  });
  
  // 监听开关变化
  toggleSwitch.addEventListener('change', () => {
    const enabled = toggleSwitch.checked;
    chrome.storage.local.set({ hevcEnabled: enabled });
    updateStatus(enabled);
    
    // 通知所有标签页更新状态
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_HEVC', enabled }).catch(() => {});
      });
    });
  });
  
  function updateStatus(enabled) {
    statusText.textContent = chrome.i18n.getMessage(enabled ? 'statusEnabled' : 'statusDisabled');
  }
  
  function loadI18nMessages() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const message = chrome.i18n.getMessage(key);
      if (message) {
        if (element.tagName === 'TITLE') {
          element.textContent = message;
        } else {
          element.textContent = message;
        }
      }
    });
  }
  
  // HEVC 扩展链接
  document.getElementById('hevc-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'ms-windows-store://pdp/?ProductId=9n4wgh0z6vhq' });
  });
});

