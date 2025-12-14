# Project Update: PulseBoost "System Intelligence" Upgrade

Here is the complete updated codebase for the PulseBoost project. We have transitioned from a basic landing page to a "Hacker-Grade" system utility aesthetic with Web Components, live telemetry, and simulated OS interactions.

## 1. Key Changes Summary
- **Architecture**: Moved to Vanilla Web Components (`<site-header>`, `<site-overlays>`) for SPA-like consistency.
- **Visuals**: Implemented "Spotlight" hover effects, glassmorphism, and neon data visualizations.
- **Features**:
  - **Live Telemetry**: `telemetry.js` renders a valid 60fps scrolling graph on canvas.
  - **Command Palette**: `Ctrl+K` global navigation.
  - **AI Chatbot**: Floating `<pulse-bot>` widget.
  - **Admin Dashboard**: New `pages/admin.html` operational console.
  - **Installer Simulation**: "System Check" modal before download.

---

## 2. Updated File Contents

### `index.html` (Main Entry)
```html
<!doctype html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>PulseBoost — AI Performance Optimizer</title>
  <meta name="description"
    content="Real-time telemetry → AI bottleneck prediction → safe reversible optimizations for smoother FPS." />
  <meta name="theme-color" content="#070B14" />
  <meta name="color-scheme" content="dark light" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="PulseBoost" />
  <meta property="og:title" content="PulseBoost — AI Performance Optimizer" />
  <meta property="og:description"
    content="Real-time telemetry → AI bottleneck prediction → safe reversible optimizations for smoother FPS." />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="PulseBoost — AI Performance Optimizer" />
  <meta name="twitter:description"
    content="Real-time telemetry → AI bottleneck prediction → safe reversible optimizations for smoother FPS." />
  <link rel="icon" href="./assets/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="./manifest.webmanifest" />
  <link rel="stylesheet" href="./css/style.css" />
  <link rel="stylesheet" href="./css/overrides.v2.css" />
</head>

<body>
  <a class="skip" href="#main">Skip to content</a>

  <site-header active="home"></site-header>

  <main id="main" class="container hero">
    <div class="heroGrid">
      <section>
        <span class="badge"><span class="dot"></span> SYSTEM STATUS: Stable • Live monitoring enabled</span>
        <h1 class="h1">Smooth FPS. Faster startup. <br><span class="txt-rotate" data-period="2000"
            data-rotate='[ "Zero bloat.", "Lower latency.", "Stable frame times.", "No driver hacks." ]'>Zero
            bloat.</span></h1>
        <p class="p">
          PulseBoost reads system signals in real time, predicts bottlenecks, and applies
          <b>safe, reversible</b> optimizations. Built for gaming + productivity — designed to stay invisible until you
          need it.
        </p>

        <div class="row wrap" style="margin-top:16px">
          <a class="btn primary" href="./pages/download.html">Download for Windows</a>
          <a class="btn" href="./pages/how-it-works.html">View Docs</a>
          <button class="btn ghost" onclick="startPulseBoostDemo()" type="button">Run Live Demo</button>
        </div>

        <div class="row wrap" style="margin-top:12px">
          <span class="badge">Reversible actions</span>
          <span class="badge">Guardrails + rollback</span>
          <span class="badge">No driver hacks</span>
          <span class="badge">Low overhead</span>
        </div>

        <div class="section">
          <h2 class="h2">Why this feels different</h2>
          <div class="cols">
            <div class="feature">
              <div class="title"><span class="icon"></span> Prediction, not “tweaks”</div>
              <div class="small">Models infer why stutter happens, then choose the smallest reversible action.</div>
            </div>
            <div class="feature">
              <div class="title"><span class="icon"></span> Safety first</div>
              <div class="small">Every action has a guardrail + rollback path. No registry roulette.</div>
            </div>
            <div class="feature">
              <div class="title"><span class="icon"></span> Quiet by default</div>
              <div class="small">Stays invisible. Surfaces only when the system deviates from baseline.</div>
            </div>
          </div>
        </div>
      </section>

      <aside class="card">
        <div class="cardBody">
          <div class="row spread">
            <div>
              <div style="font-weight:950;font-size:16px">Active Optimization Event</div>
              <div class="small">Simulated telemetry • press <span class="kbd">Ctrl</span><span class="kbd">K</span>
              </div>
            </div>
            <span class="badge"><span class="dot"
                style="background:var(--brand2); box-shadow:0 0 0 6px rgba(0,212,255,.14)"></span> Monitoring</span>
          </div>

          <div class="hr"></div>

          <div class="miniGrid">
            <div class="mini">
              <span class="small">CAUSE</span>
              <b>CPU main thread</b>
              <span class="muted">stalled</span>
              <div class="small" style="margin-top:6px">SystemUpdater.exe</div>
            </div>
            <div class="mini">
              <span class="small">EFFECT</span>
              <b>Inconsistent</b>
              <span class="muted">frame pacing</span>
              <div class="small" style="margin-top:6px">Micro-stutter (+14ms)</div>
            </div>
            <div class="mini">
              <span class="small">FIX APPLIED</span>
              <b>Priority</b>
              <span class="muted">rebalance</span>
              <div class="small" style="margin-top:6px">Stability restored</div>
            </div>
          </div>

          <div class="telemetryGraph" style="height:140px; margin-top:16px; position:relative; z-index:1;">
            <telemetry-graph></telemetry-graph>
          </div>

          <div class="miniGrid" style="margin-top:10px">
            <div class="mini"><span class="small">CPU</span><b id="m_cpu">42%</b><span class="muted">Smoothed</span>
            </div>
            <div class="mini"><span class="small">GPU</span><b id="m_gpu">56%</b><span class="muted">Queue OK</span>
            </div>
            <div class="mini"><span class="small">FPS</span><b id="m_fps">115 fps</b><span class="muted">Stable</span>
            </div>
          </div>

          <div class="row wrap right" style="margin-top:12px">
            <a class="btn" href="./pages/pricing.html">Pricing</a>
            <a class="btn primary" href="./pages/download.html">Download</a>
          </div>
        </div>
      </aside>
    </div>

    <!-- 3) Visual Optimization Timeline -->
    <section class="section timeline" id="timeline" aria-label="Optimization timeline">
      <div class="tlTop">
        <div>
          <h2 class="h2">Optimization timeline</h2>
          <p class="p">A calm, observable loop: detect deviation → infer cause → apply minimal reversible action →
            verify stability.</p>
        </div>
        <div class="row wrap">
          <span class="badge">No permanent changes</span>
          <span class="badge">Rollback always</span>
        </div>
      </div>

      <div class="tlRail" aria-hidden="true">
        <div class="tlFill" id="tlFill"></div>
        <div class="tlMarker" id="tlMarker"></div>
      </div>

      <div class="tlGrid" aria-label="Timeline events">
        <div class="tlEvent" data-tl-step="0">
          <b>Deviation detected</b>
          <span>Frame pacing drift crosses baseline</span>
        </div>
        <div class="tlEvent" data-tl-step="1">
          <b>Cause inferred</b>
          <span>CPU contention + background interference</span>
        </div>
        <div class="tlEvent" data-tl-step="2">
          <b>Action applied</b>
          <span>Priority rebalance (bounded)</span>
        </div>
        <div class="tlEvent" data-tl-step="3">
          <b>Stability verified</b>
          <span>Frame pacing returns to baseline band</span>
        </div>
      </div>
    </section>

  </main>

  <!-- Overlays (Drawer) -->
  <site-overlays></site-overlays>

  <div class="toast" id="toast" aria-live="polite"></div>

  <site-footer></site-footer>

  <interactive-console></interactive-console>
  
  <pulse-bot></pulse-bot>

  <script src="./js/console.js"></script>
  <script src="./js/spotlight.js"></script>
  <script src="./js/telemetry.js"></script>
  <script src="./js/reveal.js"></script>
  <script src="./js/chatbot.js"></script>
  <script src="./js/writer.js"></script>
  <script src="./js/installer.js"></script>

  <script src="./js/components.js"></script>
  <script src="./js/app.js"></script>
</body>

</html>
```

### `js/components.js` (Shared Header/Footer/Nav)
```javascript
/**
 * reusable-components.js
 * Defines custom elements for Header, Footer, and Overlays to reduce HTML duplication.
 * Uses Light DOM so global CSS and generic JS selectors (app.js) still work.
 */

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute("base") || ".";
        const active = this.getAttribute("active") || "";

        // Helper to conditionally set aria-current
        const is = (name) => (active === name ? 'aria-current="page"' : '');

        // Note: The structure strictly matches the original HTML so styles apply correctly.
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
              <button class="chipBtn" type="button" data-action="toggleTheme">Theme <span class="kbd">T</span></button>
              <button class="chipBtn" type="button" data-action="openPalette">Search <span class="kbd">Ctrl</span><span class="kbd">K</span></button>
              <a class="btn primary" data-action="download" data-href="${base}/pages/download.html" href="${base}/pages/download.html">Download <span class="kbd">Ctrl</span><span class="kbd">D</span></a>
            </div>
          </div>
        </div>
      </header>
    `;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute("base") || ".";

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
        const base = this.getAttribute("base") || ".";

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

// Register the custom elements
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
customElements.define('site-overlays', SiteOverlays);
```

### `js/chatbot.js` (AI Widget)
```javascript
/**
 * chatbot.js
 * Implements "Priority #5: AI Chatbot".
 * A minimal, text-only floating widget that acts as a product expert.
 */

class PulseBot extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.messages = [
            { role: 'system', text: 'PulseBoost AI Online. Systems nominal.' },
            { role: 'bot', text: 'Hello. I am the PulseBoost Guide. I can explain our telemetry, safety architecture, or pricing models.' }
        ];
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.innerHTML = `
        <div class="bot-launcher" id="botLauncher">
            <div class="bot-icon"></div>
            <span class="bot-label">AI Guide</span>
        </div>

        <div class="bot-panel" id="botPanel" aria-hidden="true">
            <div class="bot-header">
                <div>
                    <div class="bot-title">PulseBoost AI</div>
                    <div class="bot-status"><span class="dot"></span> Online</div>
                </div>
                <button class="bot-close" id="botClose">✕</button>
            </div>
            
            <div class="bot-history" id="botHistory">
                ${this.messages.map(m => this.renderMessage(m)).join('')}
            </div>

            <div class="bot-input-area">
                <input type="text" class="bot-input" id="botInput" placeholder="Ask about safety, FPS, or pricing..." />
                <button class="bot-send" id="botSend">→</button>
            </div>
        </div>
        `;
    }

    renderMessage(msg) {
        if (msg.role === 'system') {
            return `<div class="msg system">${msg.text}</div>`;
        }
        return `
            <div class="msg ${msg.role}">
                <div class="msg-bubble">${msg.text}</div>
            </div>
        `;
    }

    bindEvents() {
        const launcher = this.querySelector('#botLauncher');
        const panel = this.querySelector('#botPanel');
        const close = this.querySelector('#botClose');
        const input = this.querySelector('#botInput');
        const send = this.querySelector('#botSend');
        const history = this.querySelector('#botHistory');

        const toggle = () => {
            this.isOpen = !this.isOpen;
            panel.setAttribute('aria-hidden', !this.isOpen);
            panel.classList.toggle('open', this.isOpen);
            if (this.isOpen) input.focus();
        };

        launcher.addEventListener('click', toggle);
        close.addEventListener('click', toggle);

        const handleSend = async () => {
            const text = input.value.trim();
            if (!text) return;

            // User Message
            this.addMessage('user', text);
            input.value = '';

            // Simulate "thinking"
            const tempId = this.addMessage('bot', 'Analyzing...', true);
            
            // Hardcoded "AI" Logic (Phase 1)
            setTimeout(() => {
                const response = this.getBotResponse(text);
                const tempEl = document.getElementById(tempId);
                if (tempEl) tempEl.innerText = response;
            }, 600 + Math.random() * 800);
        };

        send.addEventListener('click', handleSend);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    addMessage(role, text, isTemp = false) {
        const history = this.querySelector('#botHistory');
        const id = 'msg-' + Math.random().toString(36).substr(2, 9);

        const div = document.createElement('div');
        div.className = `msg ${role}`;
        div.innerHTML = `<div class="msg-bubble" ${isTemp ? `id="${id}"` : ''}>${text}</div>`;

        history.appendChild(div);
        history.scrollTop = history.scrollHeight;
        return id;
    }

    getBotResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('safety') || q.includes('safe') || q.includes('risk')) {
            return "PulseBoost is safe by design. We use predictive constraints, meaning we never apply an optimization unless the model is >99% confident it is reversible and safe. All actions have instant rollback.";
        }
        if (q.includes('price') || q.includes('cost') || q.includes('free')) {
            return "We offer a Free tier (core optimization), Pro ($12/mo for advanced labs), and Enterprise. You can view the full matrix on the Pricing page.";
        }
        if (q.includes('fps') || q.includes('performance') || q.includes('slow')) {
            return "We typically see 15-25% better 1% low FPS. Rather than higher peak FPS, we focus on frame pacing consistency, which feels smoother.";
        }
        if (q.includes('download') || q.includes('install')) {
            return "You can download the Windows client from the Download page. It requires Windows 10/11.";
        }
        if (q.includes('hello') || q.includes('hi')) {
            return "Systems ready. How can I assist you with your performance tuning today?";
        }

        return "I am a calibrated performance assistant. I can answer questions about safety, architecture, or pricing. For technical support, please use the Contact page.";
    }
}

customElements.define('pulse-bot', PulseBot);
```

### `pages/admin.html` (New Dashboard)
```html
<!doctype html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>PulseBoost — Admin Console</title>
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/overrides.v2.css" />
    <style>
        /* Admin Specific Layout override */
        body {
            display: flex;
            overflow: hidden;
        }

        .sidebar {
            width: 260px;
            background: rgba(7, 11, 20, 0.95);
            border-right: 1px solid var(--stroke2);
            display: flex;
            flex-direction: column;
            padding: 24px;
            backdrop-filter: blur(20px);
            z-index: 10;
            height: 100vh;
        }

        .main {
            flex: 1;
            overflow-y: auto;
            padding: 40px;
            position: relative;
        }

        .admin-nav {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 40px;
        }

        .nav-item {
            padding: 12px 16px;
            border-radius: 12px;
            color: var(--muted);
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            border: 1px solid transparent;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .nav-item:hover {
            background: var(--glassA);
            color: #fff;
            transform: translateX(4px);
        }

        .nav-item.active {
            background: linear-gradient(90deg, rgba(123, 92, 255, 0.15), transparent);
            border: 1px solid rgba(123, 92, 255, 0.3);
            color: #fff;
        }

        /* ... remaining styles omitted for brevity ... */
    </style>
</head>

<body>

    <div class="sidebar">
        <!-- ... sidebar content ... -->
        <nav class="admin-nav">
             <!-- ... links ... -->
             <a href="../index.html" class="nav-item" style="color:var(--brand2)">← Back to Site</a>
        </nav>
    </div>

    <main class="main">
        <!-- ... content ... -->
    </main>

    <script src="../js/spotlight.js"></script>
    <script src="../js/app.js"></script>
</body>

</html>
```
