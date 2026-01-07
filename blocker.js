const blockerBanner = document.createElement('div');
blockerBanner.id = "blockerBanner";
blockerBanner.innerHTML = `
    <div class="blocker-content">
        <h1>Focus Mode Active</h1>
        <p>This site has been blocked by <strong>Doomscroll Blocker</strong></p>
    </div>
`;

document.documentElement.appendChild(blockerBanner);