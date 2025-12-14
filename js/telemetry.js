
class TelemetryGraph extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.width = 0;
        this.height = 0;
        this.data = { cpu: [], gpu: [] };
        this.maxPoints = 200;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          background: #050505;
          border-radius: 6px;
          overflow: hidden;
        }
        canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
        .scanline {
          position: absolute;
          top: 0; bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          pointer-events: none;
          display: none;
        }
        .label {
            position: absolute;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            padding: 2px 4px;
            border-radius: 2px;
            opacity: 0.8;
        }
        .label.cpu { color: #bf94ff; top: 4px; left: 4px; border: 1px solid #bf94ff33; background: #bf94ff11; }
        .label.gpu { color: #00d4ff; top: 20px; left: 4px; border: 1px solid #00d4ff33; background: #00d4ff11; }
      </style>
      <canvas></canvas>
      <div class="scanline"></div>
      <div class="label cpu">CPU Frame Time</div>
      <div class="label gpu">GPU Frame Time</div>
    `;

        this.canvas = this.shadowRoot.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.scanline = this.shadowRoot.querySelector(".scanline");

        // Initialize random data
        for (let i = 0; i < this.maxPoints; i++) {
            this.data.cpu.push(16 + Math.random() * 4);
            this.data.gpu.push(14 + Math.random() * 3);
        }

        // Resize observer
        this.ro = new ResizeObserver(() => this.resize());
        this.ro.observe(this);

        this.animate();
    }

    resize() {
        this.width = this.offsetWidth;
        this.height = this.offsetHeight;
        this.canvas.width = this.width * window.devicePixelRatio;
        this.canvas.height = this.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    animate() {
        this.updateData();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    updateData() {
        // Simulate slight jitter (normal state)
        let cpuNext = this.data.cpu[this.data.cpu.length - 1] + (Math.random() - 0.5) * 2;
        let gpuNext = this.data.gpu[this.data.gpu.length - 1] + (Math.random() - 0.5) * 1.5;

        // Simulate event (random glitches)
        if (Math.random() > 0.98) {
            cpuNext += (Math.random() * 10); // Spike
        }

        // Constraints
        cpuNext = Math.max(5, Math.min(40, cpuNext));
        gpuNext = Math.max(5, Math.min(30, gpuNext));

        // Rolling buffer
        this.data.cpu.shift();
        this.data.cpu.push(cpuNext);
        this.data.gpu.shift();
        this.data.gpu.push(gpuNext);
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // Draw Grid
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < this.width; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, this.height); }
        for (let y = 0; y < this.height; y += 20) { ctx.moveTo(0, y); ctx.lineTo(this.width, y); }
        ctx.stroke();

        // Helper: Draw Line
        const drawSeries = (data, color, offY) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            const step = this.width / (this.maxPoints - 1);

            data.forEach((val, i) => {
                const x = i * step;
                // Map value (0-50ms) to height
                const y = this.height - (val / 50 * this.height) + offY;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Glow
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset
        };

        drawSeries(this.data.cpu, "#bf94ff", 0);
        drawSeries(this.data.gpu, "#00d4ff", 5);
    }

    disconnectedCallback() {
        this.ro?.disconnect();
    }
}

customElements.define("telemetry-graph", TelemetryGraph);
