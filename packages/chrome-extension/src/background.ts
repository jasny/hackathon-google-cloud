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
