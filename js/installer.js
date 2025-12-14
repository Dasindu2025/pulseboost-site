
/**
 * installer.js
 * Implements the "System Check" Download Interstitial.
 * Simulates a hardware analysis before "granting" the download.
 */

class Downloader {
    constructor() {
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'dlModal';
        modal.className = 'dl-modal-backdrop';
        modal.innerHTML = `
            <div class="dl-modal">
                <div class="dl-header">
                    <span class="dot pulse"></span> SYSTEM INTEGRITY CHECK
                </div>
                <div class="dl-body">
                    <div class="dl-step" id="step1">
                        <div class="dl-label">Analyzing Hardware ID...</div>
                        <div class="dl-bar-bg"><div class="dl-bar" id="bar1"></div></div>
                    </div>
                    <div class="dl-step" id="step2" style="opacity:0.3">
                        <div class="dl-label">Verifying TPM Status...</div>
                        <div class="dl-bar-bg"><div class="dl-bar" id="bar2"></div></div>
                    </div>
                    <div class="dl-step" id="step3" style="opacity:0.3">
                        <div class="dl-label">Generating Secure Hash...</div>
                        <div class="dl-bar-bg"><div class="dl-bar" id="bar3"></div></div>
                    </div>
                    
                    <div class="dl-status" id="dlStatus">Waiting for authorization...</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
    }

    bindEvents() {
        // Intercept all download links
        const links = document.querySelectorAll('a[href*="download.html"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // If it's the actual download page, don't intercept logic there yet, 
                // but if it's "Get App" buttons on landing, intercept.
                // For now, let's intercept everything except if we are already ON the download page.
                if (window.location.href.includes('download.html')) return;

                e.preventDefault();
                this.startSequence(link.href);
            });
        });
    }

    startSequence(targetUrl) {
        this.modal.classList.add('active');
        const status = document.getElementById('dlStatus');
        const bar1 = document.getElementById('bar1');
        const bar2 = document.getElementById('bar2');
        const bar3 = document.getElementById('bar3');
        const s2 = document.getElementById('step2');
        const s3 = document.getElementById('step3');

        // Step 1
        status.innerText = "Querying CPU instruction sets...";
        bar1.style.width = '100%';

        setTimeout(() => {
            // Step 2
            s2.style.opacity = '1';
            status.innerText = "Checking secure boot environment...";
            bar2.style.width = '100%';
        }, 800);

        setTimeout(() => {
            // Step 3
            s3.style.opacity = '1';
            status.innerText = "Allocating secure tunnel...";
            bar3.style.width = '100%';
        }, 1800);

        setTimeout(() => {
            status.innerHTML = "<span style='color:#0f0'>Environment Verified. Redirecting...</span>";
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Downloader();
});
