const _blockedSites = ["x.com", "youtube.com/shorts", "instagram.com", "facebook.com", "tiktok.com", "fabianternis.de/"];
localStorage.setItem("blockedSites", JSON.stringify(_blockedSites));

chrome.storage.local.get(["blockedSites"], (result) => {
  const blockedSites = result.blockedSites || [];
  const currentUrl = window.location.href;

  const isBlocked = blockedSites.some((site) => currentUrl.includes(site));

  if (isBlocked) {
    const blockerBanner = document.createElement("div");
    blockerBanner.id = "blockerBanner";
    blockerBanner.innerHTML = `
    <div class="blocker-content">
        <h1>Focus Mode Active</h1>
        <p>This site has been blocked by <strong>Doomscroll Blocker</strong></p>
    </div>
`;

    document.documentElement.appendChild(blockerBanner);
    document.documentElement.classList.add("whiy-is-this-not-working");
  }
});