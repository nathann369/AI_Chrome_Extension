// Inject the sidebar iframe
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('sidebar.html');
iframe.style.cssText = `
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  z-index: 999999;
  border: none;
  display: none;
`;
iframe.id = 'ai-sidebar';
document.body.appendChild(iframe);

// Add a floating button to toggle sidebar
const button = document.createElement('button');
button.textContent = '🤖';
button.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999999;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
`;
button.onclick = () => {
  iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
};
document.body.appendChild(button);
