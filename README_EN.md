# Force Enable HEVC Decoding

Force enable HEVC (H.265) video playback support for Microsoft Edge.

## Features

- Force enable HEVC video playback
- **Toggle switch**: Enable/disable HEVC support via extension icon
- Automatically intercepts browser compatibility checks
- Zero configuration, works out of the box

## Installation

1. Open `edge://extensions/`
2. Enable **Developer mode** in the top right corner
3. Click **Load unpacked**
4. Select this project folder

## Testing the Extension

**Method 1: Using Test Page**
1. Open the `test.html` file in this project
2. Before installation: All items show "✗ Not Supported"
3. After installation: Refresh the page, all items show "✓ Supported"
4. Test toggle functionality:
   - Click extension icon, turn off the switch
   - Refresh test.html, should show "✗ Not Supported"
   - Turn on the switch again, refresh to see "✓ Supported"

**Method 2: Browser Console Test**
1. Press F12 to open Developer Tools
2. In the Console, type:
   ```javascript
   document.createElement('video').canPlayType('video/mp4; codecs="hev1"')
   ```
3. Before installation returns `""`, after installation returns `"maybe"`

**Method 3: Real Video Test**
- Visit media websites that support HEVC (e.g., Plex, Emby)
- The extension prevents unnecessary transcoding by the server

## Usage

### Basic Usage
- HEVC support is automatically enabled after installation
- No action required when playing videos

### Toggle Control
- **Enable/Disable**: Click the extension icon in the browser toolbar to toggle the switch
- **Enabled state**: HEVC videos on all websites will be detected as "supported"
- **Disabled state**: Restores browser's native detection behavior
- **After toggling**: Refresh the page for settings to take effect

### Notes
- If video has audio but no picture, your system doesn't support HEVC hardware decoding
- Install HEVC extension from Microsoft Store: `ms-windows-store://pdp/?ProductId=9n4wgh0z6vhq`

## How It Works

1. Intercepts `HTMLMediaElement.canPlayType()` 
2. Returns "supported" for HEVC codecs
3. Actual decoding is performed by system hardware

## FAQ

**Q: Why is the video still black screen?**
- Your hardware may not support HEVC decoding
- Need to install HEVC extension from Microsoft Store
- Clear cache and restart Edge

**Q: Toggle switch doesn't work?**
- Refresh the webpage after toggling
- For already loaded videos, may need to reload the video

**Q: Does it affect performance?**
- No, the extension only intercepts compatibility checks
- Actual decoding is done by system hardware

**Q: Why can't some websites play HEVC?**
- Make sure the extension switch is in "Enabled" state
- Some websites may use alternative detection methods

## License

MIT
