// 注入脚本

(function() {
  'use strict';

  try {
    const originalCanPlayType = HTMLMediaElement.prototype.canPlayType;
    const hevcPattern = /hev1|hvc1|hevc|h\.?265/i;

    // 始终拦截 canPlayType，确保返回支持 HEVC
    HTMLMediaElement.prototype.canPlayType = function(type) {
      if (hevcPattern.test(type)) {
        return 'maybe';
      }
      return originalCanPlayType.call(this, type);
    };

    // 同时拦截 MediaSource API
    if (window.MediaSource?.isTypeSupported) {
      const original = window.MediaSource.isTypeSupported;
      window.MediaSource.isTypeSupported = function(type) {
        if (hevcPattern.test(type)) {
          return true;
        }
        return original.call(this, type);
      };
    }
  } catch (e) {}
})();
