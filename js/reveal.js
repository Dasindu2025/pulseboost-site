
/**
 * reveal.js
 * Implements "Priority #3: Cinematic Scroll Reveal".
 * A lightweight observer that reveals elements as they scroll into view.
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Identify targets
    // We want sections, cards, and major headings to reveal
    const targets = document.querySelectorAll("section, .card, .feature, .heroGrid, .timeline, .h2, .miniGrid");

    // 2. Add initial class (hidden)
    targets.forEach((el) => el.classList.add("reveal"));

    // 3. Setup Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on order if they are siblings (optional refinement)
                    // For now, just reveal instantly for snappy feel
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        },
        {
            root: null,
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: "0px 0px -50px 0px", // Trigger slightly before bottom
        }
    );

    // 4. Observe
    targets.forEach((el) => observer.observe(el));
});
