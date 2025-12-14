
/**
 * spotlight.js
 * Adds a premium "mouse tracking glow" effect to all cards.
 * Also handles the custom "magnetic" cursor logic.
 */

// 1. SPOTLIGHT EFFECT
// -------------------
class Spotlight {
    constructor(selector) {
        this.targets = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        if (window.matchMedia("(hover: hover)").matches) {
            document.addEventListener("mousemove", (e) => this.update(e));
        }
    }

    update(e) {
        this.targets.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Only light up if close (optimization) or set to specific radius
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    }
}

// 2. CUSTOM CURSOR
// ----------------
function initCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";

    const dot = document.createElement("div");
    dot.className = "cursor-dot";

    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    // Add class to body to hide default cursor
    document.body.classList.add("has-custom-cursor");

    // Movement Logic
    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth trail for the ring
    function animate() {
        // Lerp (Linear Interpolation) for smoothness
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Interaction Hover States (Event Delegation)
    // We use delegation so dynamic elements (web components) work too.
    const interactiveSelector = "a, button, [role='button'], input, .card, .menuBtn, .pill, .chipBtn";

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursor.classList.add("hovering");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursor.classList.remove("hovering");
        }
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Apply spotlight to anything with 'card' or 'feature' class
    new Spotlight(".card, .feature, .mini, .labCard, .plan, .diagCard");

    // Init cursor (screens larger than touch)
    if (window.matchMedia("(min-width: 900px)").matches) {
        initCustomCursor();
    }
});
