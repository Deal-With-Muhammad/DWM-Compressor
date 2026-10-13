// Change this to your deployed URL once you have a domain.
const APP_URL = "http://localhost:3000";

document.getElementById("open").addEventListener("click", () => {
  chrome.tabs.create({ url: APP_URL });
  window.close();
});
