# SoftBridge Solutions Finland — Matte Layer Visuals & Transition Fix

## Visual changes
- First-section layer visuals are now matte and monochrome.
- Removed colorful gradients and saturated dashboard accents.
- Added neutral warm-grey panels, restrained shadows and dark graphite variants.
- Intro auroras and grid are also desaturated.

## Video issue fixed
The final sticky layer was running out of scroll container space before the next
section entered. This caused a white strip and unstable end transition.

Fixes:
- Added a full-viewport hold spacer after the layer stack.
- Added `100dvh` handling to avoid fractional viewport gaps.
- Ensured the final layer has an opaque background.
- Added clipping and isolation to the layer stack.
- Existing GSAP start/end, scrub and ease values are unchanged.

## Run
```bash
npm install
npm run build
npm run dev
```
