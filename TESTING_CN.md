# 审核测试指南

## 快速测试（2分钟）

### 步骤 1: 安装扩展
1. 解压扩展包
2. 打开 `edge://extensions/`
3. 启用"开发者模式"
4. 点击"加载解压的扩展"并选择扩展文件夹

### 步骤 2: 测试基本功能
1. 在 Edge 浏览器中打开 `test.html`
2. **预期结果**: 所有 HEVC 编解码器显示"✓ 支持",返回值为 "maybe" 或 "true"

### 步骤 3: 测试开关功能
1. 点击工具栏中的扩展图标
2. **预期**: 弹出窗口显示一个开关
3. 将开关**关闭**（向左滑动）
4. 刷新 `test.html`
5. **预期结果**: 所有 HEVC 编解码器现在显示"✗ 不支持",返回值为空

### 步骤 4: 验证开关持久化
1. 再次将开关**打开**
2. 刷新 `test.html`
3. **预期结果**: 恢复到"✓ 支持"状态

## 扩展功能说明

- **用途**: 让网站认为浏览器支持 HEVC 视频播放
- **方法**: 拦截浏览器 API 调用（`canPlayType`、`isTypeSupported`）
- **优势**: 防止媒体服务器进行不必要的视频转码
- **用户控制**: 开关允许用户启用/禁用该功能

## 技术细节

### 文件结构
- `manifest.json` - 扩展配置
- `content.js` - 向网页注入代码
- `inject.js` - 拦截浏览器 API
- `popup.html/js/css` - 开关界面
- `test.html` - 测试演示页面

### 开关工作原理
1. 用户点击扩展图标 → 打开弹出窗口
2. 开关切换将状态保存到 `chrome.storage.local`
3. 状态通过消息传递同步到所有打开的标签页
4. `inject.js` 根据状态应用或移除 API 拦截

### 隐私与权限
- **使用的权限**:
  - `activeTab` - 向当前页面注入代码
  - `storage` - 保存开关状态
  - `tabs` - 跨标签页同步状态
- **无数据收集**: 扩展完全离线工作
- **无网络请求**: 所有处理都在本地进行

## 预期行为

### 启用时（默认）
```javascript
// 浏览器控制台测试
document.createElement('video').canPlayType('video/mp4; codecs="hev1"')
// 返回: "maybe"

MediaSource.isTypeSupported('video/mp4; codecs="hev1"')
// 返回: true
```

### 禁用时
```javascript
// 返回浏览器的原生响应（通常为 "" 或 false）
document.createElement('video').canPlayType('video/mp4; codecs="hev1"')
// 返回: ""

MediaSource.isTypeSupported('video/mp4; codecs="hev1"')
// 返回: false
```

## 常见问题

### 问题: "安装后所有测试仍显示'不支持'"
**解决方案**: 
1. 确保扩展已在 `edge://extensions/` 中启用
2. 刷新测试页面
3. 检查开关是否打开

### 问题: "开关切换后测试结果没有变化"
**解决方案**: 
1. 切换后刷新页面
2. 已加载的视频需要重新加载

## 联系方式

审核过程中如有疑问，请参考:
- README.md (中文文档)
- README_EN.md (英文文档)
- 源代码注释
