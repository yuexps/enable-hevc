// Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setTitle({ title: '强制启用 HEVC 解码' });
});