# Scroll performance fix

- Removed Lenis interpolation from the runtime.
- Restored immediate native wheel, trackpad and touch scrolling.
- Kept GSAP ScrollTrigger only for one-time section reveals.
- Reduced reveal travel and duration.
- Added `once: true` so reveal triggers are released after activation.
- Added header-aware `scroll-padding-top`.

This removes the delayed, heavy scrolling sensation without removing the site motion language.
