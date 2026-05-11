# Sync Media Website — Iteration Notes

## Original Problem
User shared the GitHub repo `Sync-media-Website-3` and asked to:
1. Fix the floating popup notifications ("Push alert" / "Outcome lift") on the Sync Pulse section so they look good across mobile/tablet/laptop.
2. Add the missing Kantar logo in the "Powered in partnership with Kantar" trust badge.

## Changes (May 2026)
- **Kantar logo**: added `/app/frontend/public/kantar-logo.png`; updated `SyncPulse.jsx` to reference it; tweaked `.sp-trust-logo` CSS in `index.css` (removed grayscale `saturate(0)` so the Kantar yellow accent renders).
- **Floating chips responsiveness**: Repositioned `.sp-chip-a` and `.sp-chip-b` to anchor inside the stage canvas (`left: 0` and `right: 0` of the 660px design canvas) instead of extending outward via `right: 100%` / `left: 100%`. This keeps the chips visually attached to the phone edges across desktop, laptop, tablet, and mobile (they now scale together with the phone via the existing canvas-scaling logic).
- Installed `react-helmet-async` and `framer-motion` (missing dependencies in the imported codebase).

## Files Touched
- `/app/frontend/src/components/SyncPulse.jsx`
- `/app/frontend/src/index.css`
- `/app/frontend/public/kantar-logo.png` (new)
- `/app/frontend/package.json` (deps added via yarn)

## Backlog / Next
- None requested.

## Iteration 2 — Fill blank space in Sync Pulse section
- Added a 3-tile "proof stats" strip below the Kantar trust badge in `SyncPulse.jsx` (TV · CTV / < 60s refresh / Android + iOS coming soon) — fills the vertical gap between the phone column and the shorter left copy.
- New CSS `.sp-stats` + `.sp-stat` in `index.css` with responsive breakpoint at 520px (single column) for clean wrap on mobile.
- Tightened mobile gap from 64px to 32px and reduced section top padding so text wraps cleanly without awkward blank regions.
