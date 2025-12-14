/**
 * components.js
 * Web Components for Header, Footer, Overlays
 * - Auto-detect base path (root vs /pages/)
 * - Topbar shows ONLY hamburger menu (desktop + mobile)
 * - Theme/Search/Download are inside drawer + palette (not topbar)
 */

function _autoBase() {
  const p = location.pathname.replace(/\\/g,'/');
  // If current page is inside /pages/ (or any subfolder), go up one level
  return p.includes('/pages/') ? '..' : '.';
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || _autoBase();
    const active = this.getAttribute("active") || "";
    const is = (name) => (active === name ? 'aria-current="page"' : '');

    this.innerHTML = `
      <header class="topbar">
        <div class="container topbarShell">
          <div class="topbarRow">
            <a class="brand" href="${base}/index.html" aria-label="PulseBoost home">
              <span class="logo" aria-hidden="true"></span>
              <span class="brandText">
                <b>PulseBoost</b>
                <span>AI Performance Optimizer</span>
              </span>
            </a>

            <nav class="nav" aria-label="Primary">
              <a href="${base}/index.html" ${is('home')}>Home</a>
              <a href="${base}/pages/how-it-works.html" ${is('how-it-works')}>How it works</a>
              <a href="${base}/pages/pricing.html" ${is('pricing')}>Pricing</a>
              <a href="${base}/pages/games.html" ${is('games')}>Games</a>
              <a href="${base}/pages/contact.html" ${is('contact')}>Contact</a>
            </nav>

            <div class="topbarActions">
              <button class="menuBtn" type="button" data-action="openDrawer" aria-label="Open menu">
                <span class="menuIcon" aria-hidden="true"><span></span><span></span><span></span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || _autoBase();

    this.innerHTML = `
      <footer>
        <div class="container footerRow">
          <div class="small"><b>PulseBoost</b> <span class="subtle">— Performance Optimizer for gaming + power users.</span></div>
          <div class="footerLinks">
            <a href="${base}/index.html">Home</a>
            <a href="${base}/pages/how-it-works.html">How it works</a>
            <a href="${base}/pages/pricing.html">Pricing</a>
            <a href="${base}/pages/games.html">Games</a>
            <a href="${base}/pages/contact.html">Contact</a>
            <a href="${base}/pages/download.html">Download</a>
            <a href="${base}/pages/security.html">Security</a>
            <a href="${base}/pages/privacy.html">Privacy</a>
            <a href="${base}/pages/terms.html">Terms</a>
            <a href="${base}/pages/changelog.html">Changelog</a>
            <a href="${base}/pages/admin.html" style="color:var(--brand2)">Admin</a>
          </div>
        </div>
      </footer>
    `;
  }
}

class SiteOverlays extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || _autoBase();

    this.innerHTML = `
      <!-- Drawer -->
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawerBg"></div>
        <div class="drawerPanel" role="dialog" aria-modal="true" aria-label="Menu">
          <div class="drawerTop">
            <div class="drawerTitle">PulseBoost</div>
            <button class="drawerClose" type="button" data-action="closeDrawer" aria-label="Close menu">✕</button>
          </div>

          <div class="drawerBody">
            <nav class="drawerNav" aria-label="Mobile">
              <a href="${base}/index.html">Home</a>
              <a href="${base}/pages/how-it-works.html">How it works</a>
              <a href="${base}/pages/pricing.html">Pricing</a>
              <a href="${base}/pages/games.html">Games</a>
              <a href="${base}/pages/contact.html">Contact</a>
              <a href="${base}/pages/download.html">Download</a>
              <a href="${base}/pages/security.html">Security</a>
              <a href="${base}/pages/privacy.html">Privacy</a>
              <a href="${base}/pages/terms.html">Terms</a>
              <a href="${base}/pages/changelog.html">Changelog</a>
            </nav>
          </div>

          <div class="drawerActions">
            <button class="btn ghost" type="button" data-action="toggleTheme">Theme</button>
            <button class="btn" type="button" data-action="openPalette">Search</button>
            <a class="btn primary" href="${base}/pages/download.html">Download</a>
          </div>
        </div>
      </div>

      <!-- Palette -->
      <div class="drawer" id="palette" data-open="false" aria-hidden="true">
        <div class="drawerBg" data-action="closePalette"></div>
        <div class="drawerPanel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="drawerTop">
            <div class="drawerTitle">Command palette</div>
            <button class="drawerClose" type="button" data-action="closePalette" aria-label="Close palette">✕</button>
          </div>
          <div class="drawerBody">
            <input id="palInput" class="chipBtn" style="width:100%; justify-content:flex-start" placeholder="Type to filter (docs, pricing, games...)" />
            <div style="height:12px"></div>
            <div class="drawerNav">
              <a data-cmd="home" href="${base}/index.html">Go: Home</a>
              <a data-cmd="how docs pipeline diagnostics" href="${base}/pages/how-it-works.html">Go: How it works</a>
              <a data-cmd="pricing plans matrix" href="${base}/pages/pricing.html">Go: Pricing</a>
              <a data-cmd="games lab profiles" href="${base}/pages/games.html">Go: Games</a>
              <a data-cmd="contact support" href="${base}/pages/contact.html">Go: Contact</a>
              <a data-cmd="download windows" href="${base}/pages/download.html">Go: Download</a>
            </div>
          </div>
          <div class="drawerActions">
            <button class="btn ghost" type="button" data-action="toggleTheme">Toggle theme</button>
            <a class="btn primary" href="${base}/pages/download.html">Download</a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
customElements.define('site-overlays', SiteOverlays);
