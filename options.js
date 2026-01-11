const resetOptionsTrigger = document.getElementById("resetOptionsTrigger");
const resetOptionsPopover = document.getElementById("resetOptionsPopover");
const resetOptionsSubmit = document.getElementById("resetOptionsSubmit");
const resetOptionsCancel = document.getElementById("resetOptionsCancel");
const sitesListContainer = document.getElementById("sites-list");
const addSiteBtn = document.getElementById("addSiteBtn");
const addSiteForm = document.getElementById("addSiteForm");
const newSiteInput = document.getElementById("newSiteInput");

let blockedSites = [];

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".page-tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute("href").replace("#", "");
            tabs.forEach((t) => t.classList.remove("active"));
            contents.forEach((c) => c.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(targetId).classList.add("active");
        });
    });

    resetOptionsTrigger.addEventListener("click", () => {
        resetOptionsPopover.classList.add("visible");
    });

    resetOptionsCancel.addEventListener("click", () => {
        resetOptionsPopover.classList.remove("visible");
    });

    resetOptionsSubmit.addEventListener("click", () => {
        resetOptions();
        resetOptionsPopover.classList.remove("visible");
    });

    addSiteBtn.addEventListener("click", () => {
        const url = newSiteInput.value.trim();
        if (url && !blockedSites.includes(url)) {
            blockedSites.push(url);
            chrome.storage.local.set({ blockedSites }, () => {
                newSiteInput.value = "";
                renderSitesList();
            });
        }
    });
    addSiteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addSiteBtn.click(); // too lazzy for function
    });

    loadBlockedSites();
});

function loadBlockedSites() {
    chrome.storage.local.get(["blockedSites"], (result) => {
        blockedSites = result.blockedSites || [];
        renderSitesList();
    });
}

function renderSitesList() {
    sitesListContainer.innerHTML = "";

    if (blockedSites.length === 0) {
        sitesListContainer.innerHTML = "<p>No sites blocked yet.</p>";
        return;
    }

    const list = document.createElement("ul");
    list.className = "site-items-list";

    blockedSites.forEach((site, index) => {
        const li = document.createElement("li");
        li.className = "site-item";
        li.innerHTML = `
      <span>${site}</span>
      <button class="btn-remove" data-index="${index}">&times;</button>
    `;
        list.appendChild(li);
    });

    sitesListContainer.appendChild(list);

    document.querySelectorAll(".btn-remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            removeSite(index);
        });
    });
}

function removeSite(index) {
    blockedSites.splice(index, 1);
    chrome.storage.local.set({ blockedSites }, () => {
        renderSitesList();
    });
}

function resetOptions() {
    blockedSites = [...DEFAULT_SITES];

    chrome.storage.local.set({ blockedSites, initialised: true }, () => {
        renderSitesList();
        window.location.reload();
    });
}