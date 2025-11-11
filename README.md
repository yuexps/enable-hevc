# 强制启用 HEVC 解码

为 Microsoft Edge 强制启用 HEVC (H.265) 视频播放支持。

## 功能

- 强制启用 HEVC 视频播放
- 自动拦截浏览器兼容性检查
- 零配置，开箱即用

## 安装

1. 打开 `edge://extensions/`
2. 启用右上角的 **开发者模式**
3. 点击 **加载解包的扩展**
4. 选择本项目文件夹

## 使用

- 播放视频时自动启用 HEVC 支持
- 如果视频播放有声音无画面，说明系统不支持 HEVC
- 前往 Microsoft Store 安装 HEVC 扩展：ms-windows-store://pdp/?ProductId=9n4wgh0z6vhq

## 工作原理

1. 拦截 `HTMLMediaElement.canPlayType()` 
2. 对 HEVC 编解码器返回"支持"
3. 实际解码由系统硬件完成

## 常见问题

**Q: 为什么视频还是黑屏？**
- 你的硬件可能不支持 HEVC
- 清除缓存并重启 Edge

**Q: 对性能有影响吗？**
- 没有，扩展只拦截兼容性检查

## 许可证

MIT
