# Testing Instructions for Reviewers

## Quick Test (2 minutes)

### Step 1: Install Extension
1. Extract the extension package
2. Open `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

### Step 2: Test Basic Functionality
1. Visit the online test page: https://yuexps.github.io/enable-hevc/test_en.html
   - Or open the local `test_en.html` file in browser
2. **Expected Result**: All HEVC codecs should show "✓ Supported" with return value "maybe" or "true"

### Step 3: Test Toggle Switch
1. Click the extension icon in the toolbar
2. **Expected**: A popup with a toggle switch appears
3. Turn OFF the switch (slide to left)
4. Refresh the test page
5. **Expected Result**: All HEVC codecs now show "✗ Not Supported" with empty return values

### Step 4: Verify Toggle Persistence
1. Turn ON the switch again
2. Refresh the test page
3. **Expected Result**: Returns to "✓ Supported" state

## What This Extension Does

- **Purpose**: Tricks websites into thinking the browser supports HEVC video playback
- **Method**: Intercepts browser API calls (`canPlayType`, `isTypeSupported`)
- **Benefit**: Prevents unnecessary video transcoding on media servers
- **User Control**: Toggle switch allows users to enable/disable the feature

## Technical Details

### Files Structure
- `manifest.json` - Extension configuration
- `content.js` - Injects code into web pages
- `inject.js` - Intercepts browser APIs
- `popup.html/js/css` - Toggle switch interface
- `test.html` - Chinese test demo page (Online: https://yuexps.github.io/enable-hevc/test.html)
- `test_en.html` - English test demo page (Online: https://yuexps.github.io/enable-hevc/test_en.html)

### How Toggle Works
1. User clicks extension icon → Opens popup
2. Toggle switch saves state to `chrome.storage.local`
3. State is synced to all open tabs via message passing
4. `inject.js` applies or removes API interception based on state

### Privacy & Permissions
- **Permissions Used**:
  - `activeTab` - To inject code into current page
  - `storage` - To save toggle state
  - `tabs` - To sync state across tabs
- **No Data Collection**: Extension works entirely offline
- **No Network Requests**: All processing is local

## Expected Behavior

### When Enabled (Default)
```javascript
// Browser Console Test
document.createElement('video').canPlayType('video/mp4; codecs="hev1"')
// Returns: "maybe"

MediaSource.isTypeSupported('video/mp4; codecs="hev1"')
// Returns: true
```

### When Disabled
```javascript
// Returns browser's native response (usually "" or false)
document.createElement('video').canPlayType('video/mp4; codecs="hev1"')
// Returns: ""

MediaSource.isTypeSupported('video/mp4; codecs="hev1"')
// Returns: false
```

## Common Issues

### Issue: "All tests show 'Not Supported' even after installation"
**Solution**: 
1. Make sure the extension is enabled in `edge://extensions/`
2. Refresh the test page
3. Check if toggle switch is ON

### Issue: "Toggle switch doesn't change test results"
**Solution**: 
1. Refresh the page after toggling
2. Already loaded videos need to be reloaded

## Contact

For any questions during review, please refer to:
- README.md (Chinese)
- README_EN.md (English)
- Source code comments
