document.getElementById("open-settings").addEventListener("click", () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL("options.html"));
    }
});

/*
let blockedSites = chrome.storage.local.get(["blockedSites"]);

const urlCounter = document.getElementById('urlCount');
urlCounter.innerText = blockedSites.length;
*/

const urlCounter = document.getElementById("urlCount");

async function updateCounter() {
  const data = await chrome.storage.local.get(["blockedSites"]);
  const blockedSites = data.blockedSites || [];
  urlCounter.innerText = blockedSites.length;
}

updateCounter();