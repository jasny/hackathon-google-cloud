chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-dashboard",
    title: "Permissions",
    contexts: ["action"]
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "open-dashboard") {
    chrome.tabs.create({ url: "options.html" })
  }
})

// Discovery logic
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.startsWith('http')) {
    try {
      const url = new URL(tab.url);
      const agentUrl = `${url.origin}/.well-known/agent.json`;
      
      const response = await fetch(agentUrl);
      if (!response.ok) return;

      const agentData = await response.json();
      const helloCapability = agentData.capabilities?.find((c: any) => c.name === 'hello');

      if (helloCapability) {
        // Store the discovery for this tab
        // If a2ui is not in the card, we'll fetch it from the server agent later or it's provided by the protocol
        await chrome.storage.local.set({
          [`agent_${tabId}`]: {
            origin: url.origin,
            name: agentData.name,
            endpoints: agentData.endpoints,
            a2ui: helloCapability.a2ui // Might be undefined
          }
        });

        // Set a badge to notify the user
        chrome.action.setBadgeText({ tabId, text: "!" });
        chrome.action.setBadgeBackgroundColor({ tabId, color: "#3b82f6" });
        
        console.log(`Agent discovered for ${url.origin}`);
      }
    } catch (error) {
      console.error("Agent discovery failed:", error);
    }
  }
});

// Clean up storage when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`agent_${tabId}`);
});

// External messaging for website discovery
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === "PING") {
    sendResponse({ type: "PONG", version: "1.0.0" });
  }
});

// Handle internal messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REQUEST_CAPABILITY") {
    const tabId = sender.tab?.id;
    console.log(`Capability requested: ${message.capability} from tab ${tabId}`);
    
    // Open a standalone popup window, passing the tabId
    chrome.windows.create({
      url: `popup.html?tabId=${tabId}`,
      type: 'popup',
      width: 380,
      height: 600,
      focused: true
    });
  }
});
