// 注入脚本

(function() {
  'use strict';

  // 默认启用，等待初始化消息
  let hevcEnabled = true;
  let initialized = false;

  try {
    const originalCanPlayType = HTMLMediaElement.prototype.canPlayType;
    const hevcPattern = /hev1|hvc1|hevc|h\.?265/i;

    HTMLMediaElement.prototype.canPlayType = function(type) {
      return hevcEnabled && hevcPattern.test(type) ? 'maybe' : originalCanPlayType.call(this, type);
    };

    if (window.MediaSource?.isTypeSupported) {
      const original = window.MediaSource.isTypeSupported;
      window.MediaSource.isTypeSupported = function(type) {
        return hevcEnabled && hevcPattern.test(type) ? true : original.call(this, type);
      };
    }
  } catch (e) {
    // Silent fail
  }

  // 监听消息
  window.addEventListener('message', (event) => {
    if (event.source === window) {
      if (event.data.type === 'HEVC_INIT' && !initialized) {
        // 初始化消息
        hevcEnabled = event.data.enabled;
        initialized = true;
        // 触发就绪事件
        window.dispatchEvent(new CustomEvent('hevc-extension-ready', { detail: { enabled: hevcEnabled } }));
      } else if (event.data.type === 'HEVC_TOGGLE') {
        // 切换消息
        hevcEnabled = event.data.enabled;
      }
    }
  });
})();
