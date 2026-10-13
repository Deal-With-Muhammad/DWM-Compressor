// Change this to your deployed URL once you have a domain (e.g. https://dwm-compressor.com)
const APP_URL = "http://localhost:3000";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-dwm",
    title: "Open DWM Compressor",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "open-dwm") {
    chrome.tabs.create({ url: APP_URL });
  }
});
