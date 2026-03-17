import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["http://localhost:5173/*"],
  world: "MAIN"
}

// Injected provider logic
const agentconnect = {
  request: (capability: string) => {
    console.log(`AgentConnect: Requesting capability: ${capability}`);
    window.postMessage({ 
      source: 'agentconnect-provider',
      type: 'REQUEST_CAPABILITY', 
      capability 
    }, '*');
  }
};

// Inject into the global window object
(window as any).agentconnect = agentconnect;

// Notify the website that the provider is ready
window.dispatchEvent(new CustomEvent('AGENT_CONNECT_READY'));
console.log('AgentConnect: Provider injected into MAIN world');
