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


## Iteration 3 — Text visibility fixes on dark sections (May 2026)
- Philosophy section ("Media is now cross-screen / Measurement should be too"): h2 was invisible in light mode because `h1-h4 { color: var(--fg-strong) }` resolved to near-black against the fixed `#0a0a0a` background.
  - Added `.tile-dark h1-h4 { color: #f5f5f7 }` and scoped overrides for `.philosophy-tile` text in `index.css`.
- Dark product cards (`See the same people...`, `Reports your stakeholders...`): same root cause. Added `.product-card.dark h1-h4 { color: #f5f5f7 }`.

## Iteration 4 — Engineering modernization (May 2026)
### Frontend — CRA → Vite
- Replaced `react-scripts` + CRACO + `@emergentbase/visual-edits` + Babel plugin + `cra-template` with **Vite 5 + @vitejs/plugin-react**.
- New `vite.config.js` preserves CRA semantics: `@/...` alias, `process.env.REACT_APP_*` via build-time `define`, `envPrefix: ['REACT_APP_', 'VITE_']`, esbuild `.js` JSX loader (avoids renaming the entire codebase), HMR over wss://…:443 for Emergent preview proxy.
- `index.html` moved from `public/` to project root; new `src/index.jsx` entry; old `src/index.js` removed.
- `package.json` scripts: `start`/`dev`/`build`/`preview` → vite. `yarn start` (used by supervisor) still works.
- Cleaned 45+ unused shadcn/ui components (no app code imported them), `hooks/use-toast.js`, `lib/utils.js`, `next-themes`, `react-day-picker`, all unused `@radix-ui/*` deps, `tailwindcss-animate`, `cra-template`, CRACO health-check plugin.
- Toast system consolidated to Sonner (already the sole user-facing toast in `App.js`, Admin/Contact/Footer).
- Tailwind config simplified: kept only base reset because no utility classes are used in app code (purely custom CSS in `index.css`).
- ESLint flat config (`eslint.config.js`).
- Verified: production build succeeds (`vite build`, ~673 KB JS gzipped to 205 KB). All 9 routes render with content in the live preview, no app-level console errors.

### Backend — parallel Bun+TS implementation
- FastAPI in `/app/backend` is unchanged (Emergent supervisor is read-only and pinned to uvicorn).
- New `/app/backend-bun/` mirrors all routes:
  - `GET /api/`, `GET /api/status`, `POST /api/status` — byte-identical wire format.
  - Plus `GET /healthz` for k8s liveness.
- Stack: **Hono + Bun + mongodb + zod**. Strict env parsing in `lib/config.ts`, singleton Mongo client in `lib/db.ts`, JSON structured logger in `lib/logger.ts`.
- Multi-stage Alpine `Dockerfile` (non-root `bun` user, healthcheck wired).
- `tsc --noEmit` passes clean.

### Deployment docs
- New `/app/DEPLOYMENT.md` — infra table, env vars per component, local dev steps, production builds, docker-compose example, scaling/uptime/SLO guidance, CI/CD outline, ops checklist, migration notes.

### Files touched
- Added: `frontend/vite.config.js`, `frontend/index.html`, `frontend/src/index.jsx`, `frontend/eslint.config.js`, entire `backend-bun/` tree, `DEPLOYMENT.md`.
- Overwritten: `frontend/package.json`, `frontend/tailwind.config.js`, `frontend/postcss.config.js`.
- Removed: `frontend/craco.config.js`, `frontend/plugins/`, `frontend/jsconfig.json`, `frontend/public/index.html`, `frontend/src/index.js`, `frontend/src/components/ui/`, `frontend/src/hooks/`, `frontend/src/lib/`.

### Verified
- `curl /api/` → `{"message":"Hello World"}` ✓
- `POST /api/status` and `GET /api/status` round-trip a doc ✓
- Frontend preview renders identically; all 8 sub-pages return 200 with main content ✓
- Production `vite build` succeeds ✓
- No UI/UX/animation regressions.
