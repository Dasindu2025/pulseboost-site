
/**
 * interactive-console.js
 * Implements a cinematic "Hacker/Dev" console takeover.
 * Used for the "Run Live Demo" button to create an immersive moment.
 */

class InteractiveConsole extends HTMLElement {
    constructor() {
        super();
        this.close = this.close.bind(this);
        this.logs = [
            { t: 0, msg: "Initializing heuristic engine v4.2...", type: "system" },
            { t: 400, msg: "Connecting to local telemetry agent...", type: "info" },
            { t: 800, msg: "SUCCESS: Agent connected (PID: 9284)", type: "success" },
            { t: 1100, msg: "Scanning process threads...", type: "info" },
            { t: 1600, msg: "WARN: Primary thread contention detected (Chrome.exe)", type: "warn" },
            { t: 1800, msg: "WARN: Background I/O saturation > 85%", type: "warn" },
            { t: 2200, msg: "Applying optimization heuristics...", type: "system" },
            { t: 2800, msg: " Rebalancing CPU affinity...", type: "info" },
            { t: 3100, msg: " Isolating render threads...", type: "info" },
            { t: 3600, msg: " Flush I/O buffers...", type: "info" },
            { t: 4500, msg: "OPTIMIZATION COMPLETE", type: "success" },
            { t: 4600, msg: "Results: +14% FPS stability restored.", type: "highlight" }
        ];
    }

    connectedCallback() {
        this.innerHTML = `
      <div class="console-overlay" aria-hidden="true">
        <div class="console-window">
          <div class="con-header">
            <span class="dot red" id="btnClose"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="con-title">PulseBoost Terminal</span>
          </div>
          <div class="con-body">
            <div id="conLogs"></div>
            <div class="con-cursor">_</div>
          </div>
        </div>
      </div>
      <style>
        .console-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; visibility: hidden;
          transition: all 0.2s ease;
        }
        .console-overlay.active { opacity: 1; visibility: visible; }
        
        .console-window {
          width: 90%; max-width: 600px;
          background: #0C0C0C;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          font-family: 'JetBrains Mono', monospace;
          overflow: hidden;
          transform: scale(0.95);
          transition: transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .console-overlay.active .console-window { transform: scale(1); }

        .con-header {
          background: #1A1A1A;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; opacity: 0.8; }
        .red { background: #FF5F56; cursor: pointer; }
        .yellow { background: #FFBD2E; }
        .green { background: #27C93F; }
        .con-title { margin-left: 12px; font-size: 13px; color: #888; opacity: 0.6; }

        .con-body {
          padding: 20px;
          min-height: 320px;
          color: #eee;
          font-size: 14px;
          line-height: 1.6;
        }
        .log-line { margin-bottom: 4px; opacity: 0; animation: fadeIn 0.1s forwards; }
        .log-system { color: #888; font-weight: bold; }
        .log-info { color: #ccc; }
        .log-warn { color: #FFBD2E; }
        .log-success { color: #27C93F; font-weight: bold; }
        .log-highlight { color: #00D4FF; font-weight: 900; margin-top: 12px; font-size: 16px; }

        .con-cursor { display: inline-block; width: 8px; height: 16px; background: #00D4FF; animation: blink 1s infinite; vertical-align: middle; }
        
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn { to { opacity: 1; } }
      </style>
    `;

        this.overlay = this.querySelector(".console-overlay");
        this.logContainer = this.querySelector("#conLogs");
        this.querySelector("#btnClose").addEventListener("click", this.close);

        // Expose method to window for simple call
        window.startPulseBoostDemo = () => this.run();
    }

    run() {
        this.overlay.classList.add("active");
        this.logContainer.innerHTML = "";

        this.logs.forEach((log) => {
            setTimeout(() => {
                const div = document.createElement("div");
                div.className = `log-line log-${log.type}`;
                div.textContent = `> ${log.msg}`;
                this.logContainer.appendChild(div);

                // Auto scroll
                this.logContainer.scrollTop = this.logContainer.scrollHeight;
            }, log.t);
        });

        // Auto close after finish
        setTimeout(this.close, 6500);
    }

    close() {
        this.overlay.classList.remove("active");
    }
}

customElements.define('interactive-console', InteractiveConsole);
