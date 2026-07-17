# AllianceOne — Product Media Capture Spec

The site is wired to build around real product captures (Cursor-style). Every
slot below accepts a still, a muted looping video, or both (the still doubles
as the video's poster). Drop files into `ao-vite/public/` and fill the fields
in `src/App.jsx` (`HERO_MEDIA` and the `stages` array in `TheProduct`).

## The shot list

| Slot | What to capture | File names (suggested) |
|---|---|---|
| HERO (money shot) | The engagement workspace at its most impressive: a populated engagement with the lifecycle tabs visible. This is the first product frame a visitor sees. | `hero-product.png`, `hero-loop.mp4` |
| Stage 01 · Discover | A new pursuit opening; similar engagements surfacing ranked with their context. | `stage-discover.png`, `stage-discover.mp4` |
| Stage 02 · Scope | Have a still already (`worked-example.png`). Recapture alongside the others for consistency if convenient; a short scope-generation loop is the ideal upgrade. | `stage-scope.png`, `stage-scope.mp4` |
| Stage 03 · Propose | The proposal assembling from shipped deliverables. | `stage-propose.png`, `stage-propose.mp4` |
| Stage 04 · Deliver | Delivery/close-out: decisions and outcomes feeding back in. | `stage-deliver.png`, `stage-deliver.mp4` |

## Stills

- Capture at 2x density if possible (2560x1440 or a retina display); PNG.
- 100% browser zoom, hide OS chrome/bookmarks (use a clean maximized window
  or an app-only capture).
- Light product theme, populated with clean illustrative data (Worx-style
  firm names are fine; the captions already say "firm names shown are
  illustrative").
- Keep a consistent viewport size across all captures so the frames match.

## Screen recordings

- 10 to 20 seconds per loop, no audio, 24 to 30 fps.
- MP4 (H.264) is required; a WebM copy is a nice-to-have. Target under
  ~8 MB per clip (the page autoplays them muted).
- Slow, deliberate cursor movement; one clear action per clip (e.g. Scope:
  click Generate scope, watch the draft assemble). Start and end on a calm
  frame so the loop doesn't jump.
- Every video slot should ship with its matching still (used as the poster
  and as the reduced-motion fallback).

## Wiring (after files land in public/)

- Hero: set `HERO_MEDIA = { img: "/hero-product.png", video: "/hero-loop.mp4",
  alt: "...", caption: "AllianceOne · engagement workspace" }` in App.jsx.
- Stages: fill the `img` / `video` fields per stage in the `stages` array.
- Nothing else to touch: frames, captions, autoplay, poster fallback, and
  prefers-reduced-motion handling are already built (`MediaFrame`).
