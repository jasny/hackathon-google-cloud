import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["http://localhost:5173/*"]
}

// Relay messages from the MAIN world provider to the extension background
window.addEventListener('message', (event) => {
  // Only handle messages from our injected provider
  if (event.source !== window) return;
  if (event.data?.source !== 'agentconnect-provider') return;

  if (event.data.type === 'REQUEST_CAPABILITY') {
    console.log(`AgentConnect: Relaying capability request: ${event.data.capability}`);
    chrome.runtime.sendMessage({
      type: 'REQUEST_CAPABILITY',
      capability: event.data.capability
    });
  }
});

console.log('AgentConnect: Relay script initialized in ISOLATED world');
