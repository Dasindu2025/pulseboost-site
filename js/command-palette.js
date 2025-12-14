
/**
 * command-palette.js
 * Implements a "True Command Mode" with keyboard-first navigation (Priority #2).
 */
class CommandPalette {
    constructor() {
        this.isOpen = false;
        this.selectedIndex = 0;
        this.commands = [
            { id: 'home', label: 'Go Home', tags: 'index main landing', url: '/' },
            { id: 'pricing', label: 'View Pricing', tags: 'cost plans pro enterprise', url: '/pages/pricing.html' },
            { id: 'games', label: 'Games Lab', tags: 'supported profiles valorant apex', url: '/pages/games.html' },
            { id: 'docs', label: 'Documentation', tags: 'help how it works manual', url: '/pages/how-it-works.html' },
            { id: 'download', label: 'Download PulseBoost', tags: 'installer windows get', url: '/pages/download.html' },
            { id: 'contact', label: 'Contact Support', tags: 'email help bugs', url: '/pages/contact.html' },
            { id: 'security', label: 'Security Center', tags: 'trust safety whitepaper', url: '/pages/security.html' },
            { id: 'privacy', label: 'Privacy Policy', tags: 'data legal', url: '/pages/privacy.html' },
            { id: 'terms', label: 'Terms of Service', tags: 'legal tos', url: '/pages/terms.html' },
            { id: 'changelog', label: 'Changelog', tags: 'updates versions news', url: '/pages/changelog.html' },
            { id: 'theme', label: 'Toggle Theme', tags: 'dark light mode', action: 'toggleTheme' },
            { id: 'demo', label: 'Run Live Demo', tags: 'simulate matrix', action: 'runDemo' }
        ];
        this.filteredCommands = [...this.commands];

        this.init();
    }

    init() {
        // Inject HTML if not present (handled by components.js, but we hook into it)
        this.paletteEl = document.getElementById('palette');
        this.inputEl = document.getElementById('palInput');
        this.listEl = this.paletteEl.querySelector('.drawerNav') || this.createListContainer();

        this.bindEvents();
    }

    createListContainer() {
        // Fallback if structure is different
        const list = document.createElement('div');
        list.className = 'drawerNav';
        this.paletteEl.querySelector('.drawerBody').appendChild(list);
        return list;
    }

    bindEvents() {
        // Global Keyboard Shortcut (Ctrl+K or /)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Input Handling
        if (this.inputEl) {
            this.inputEl.addEventListener('input', (e) => this.filter(e.target.value));
            this.inputEl.addEventListener('keydown', (e) => this.handleInputKey(e));
        }

        // Click Handling (Delegation)
        this.listEl.addEventListener('click', (e) => {
            const item = e.target.closest('[data-cmd-id]');
            if (item) {
                this.execute(this.filteredCommands[item.dataset.index]);
            }
        });

        // Close on backdrop
        this.paletteEl.addEventListener('click', (e) => {
            if (e.target === this.paletteEl || e.target.matches('[data-action="closePalette"]')) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.paletteEl.setAttribute('data-open', 'true');
        this.paletteEl.setAttribute('aria-hidden', 'false');
        this.inputEl.value = '';
        this.filter('');
        this.inputEl.focus();
        document.body.style.overflow = 'hidden'; // Lock scroll
    }

    close() {
        this.isOpen = false;
        this.paletteEl.setAttribute('data-open', 'false');
        this.paletteEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    filter(query) {
        const q = query.toLowerCase();
        if (!q) {
            this.filteredCommands = this.commands;
        } else {
            // Simple fuzzy-ish matching
            this.filteredCommands = this.commands.filter(cmd =>
                cmd.label.toLowerCase().includes(q) ||
                cmd.tags.includes(q)
            );
        }
        this.selectedIndex = 0;
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';
        if (this.filteredCommands.length === 0) {
            this.listEl.innerHTML = '<div class="small muted" style="padding:12px">No results found.</div>';
            return;
        }

        this.filteredCommands.forEach((cmd, index) => {
            const item = document.createElement('a');
            item.className = 'cmdItem';
            if (index === this.selectedIndex) item.classList.add('selected');
            item.dataset.index = index;
            item.dataset.cmdId = cmd.id;

            // Highlight match
            item.innerHTML = `
                <span class="cmdLabel">${cmd.label}</span>
                <span class="cmdTag">${cmd.tags.split(' ')[0]}</span>
            `;

            // Mouse hover selection
            item.addEventListener('mouseenter', () => {
                this.selectedIndex = index;
                this.updateSelection();
            });

            this.listEl.appendChild(item);
        });
    }

    updateSelection() {
        const items = this.listEl.querySelectorAll('.cmdItem');
        items.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    handleInputKey(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
            this.updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
            this.updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.filteredCommands[this.selectedIndex]) {
                this.execute(this.filteredCommands[this.selectedIndex]);
            }
        }
    }

    execute(cmd) {
        if (!cmd) return;
        this.close();

        if (cmd.action) {
            // Internal actions
            if (cmd.action === 'toggleTheme') {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                try { localStorage.setItem('pb_theme', next); } catch (e) { }
            } else if (cmd.action === 'runDemo') {
                if (window.startPulseBoostDemo) window.startPulseBoostDemo();
            }
        } else if (cmd.url) {
            // Navigation
            // Fix relative paths if needed. Currently assuming simplified absolute for prototype, 
            // but we can make it robust by checking current location.
            const isLocal = window.location.protocol === 'file:';
            let target = cmd.url;

            if (window.location.pathname.includes('/pages/')) {
                if (target === '/') target = '../index.html';
                // pages to pages is fine if we keep structure
            } else {
                // root to pages
                if (target === '/') target = 'index.html';
                else target = '.' + target;
            }
            // A simple rough fix for proper linking given the two-level structure
            // Real routing would be better but this is vanilla.
            if (cmd.id === 'home') window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : './index.html';
            else if (cmd.url.includes('/pages/')) window.location.href = window.location.pathname.includes('/pages/') ? '.' + cmd.url.replace('/pages', '') : '.' + cmd.url;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.cmdPalette = new CommandPalette();
});
