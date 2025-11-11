document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('hevc-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'ms-windows-store://pdp/?ProductId=9n4wgh0z6vhq' });
  });
});

