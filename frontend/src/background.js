chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "open_popup") {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showAlert") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: () => alert("GitDocsify button clicked!"),
    });
  }
});
