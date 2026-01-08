const resetOptionsTrigger = document.getElementById("resetOptionsTrigger");
const resetOptionsPopover = document.getElementById("resetOptionsPopover");
const resetOptionsSubmit = document.getElementById("resetOptionsSubmit");
const resetOptionsCancel = document.getElementById("resetOptionsCancel");

let blockedSites = JSON.parse(localStorage.getItem("blockedSites")) || [];

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
});

function storeBlockedSites() {
    localStorage.setItem("blockedSites", JSON.stringify(blockedSites));
}

function resetOptions() {
    blockedSites = [ "x.com", "youtube.com/shorts", "instagram.com", "facebook.com", "tiktok.com" ];

    storeBlockedSites();
    
    window.location.reload();
}