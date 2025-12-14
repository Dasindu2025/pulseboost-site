
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
