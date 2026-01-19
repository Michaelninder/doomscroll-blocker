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

function trimURL(url) {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

async function updateUI() {
    const data = await chrome.storage.local.get(["blockedSites"]);
    const blockedSites = data.blockedSites || [];
    urlCounter.innerText = blockedSites.length;

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;

    const statusBadge = document.getElementById("dsb-status-badge");
    const statusText = document.getElementById("dsb-status-text");

    const isBlocked = blockedSites.some((site) =>
        trimURL(tab.url).startsWith(trimURL(site))
    );

    statusBadge.classList.remove("is-blocked", "is-fine");

    if (isBlocked) {
        statusBadge.classList.add("is-blocked");
        statusText.innerText = "Site Blocked";
    } else {
        statusBadge.classList.add("is-fine");
        statusText.innerText = "Site not Blocked";
    }
}

updateUI();