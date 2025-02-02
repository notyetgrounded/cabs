// reload.js
const ws = new WebSocket(`ws://localhost:5173`);
ws.onmessage = () => {
  chrome.runtime.reload();
};
