chrome.storage.local.get(["initialised"], (res) => {
  if (!res.initialised) {
    chrome.storage.local.set({
      blockedSites: DEFAULT_SITES,
      initialised: true,
    });
  }
});

function trimURL(url) {
  url = url.replace("www.", "").replace("https://", "").replace("http://", "");
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

function functionmThatIsAnyhowAlsoNotFunctional() {
    // Source - https://stackoverflow.com/a/13883978
    // Posted by vogdb, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-01-11, License - CC BY-SA 4.0

    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'blocked-site.css');
    document.head.appendChild(link);
}

// Source - https://stackoverflow.com/a/4770179
// Posted by gblazex, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-11, License - CC BY-SA 4.0

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

chrome.storage.local.get(["blockedSites"], (result) => {
  const blockedSites = result.blockedSites || [];
  const currentUrl = window.location.href;

  //const isBlocked = blockedSites.some((site) => trimURL(currentUrl).includes(trimURL(site)));
  const isBlocked = blockedSites.some((site) => trimURL(currentUrl).endsWith(trimURL(site)));
  //blockedSites.some((site) => console.log(trimURL(site)));
  //console.warn(trimURL(currentUrl));

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
    functionmThatIsAnyhowAlsoNotFunctional();
    disableScroll();
  }
});