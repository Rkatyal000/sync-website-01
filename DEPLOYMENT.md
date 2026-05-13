# SYNC Media — Deployment Guide

This document covers running the project locally, in the Emergent preview
container, and in production. The codebase contains two deployable units:

- **`frontend/`** — React 19 + Vite SPA (replaces the previous CRA setup).
- **`backend/`** — FastAPI service. Used by the Emergent preview container and
  still fully production-grade.
- **`backend-bun/`** — Parallel Bun + TypeScript implementation of the same
  API surface, intended for new/modern production deployments where a smaller
  memory footprint and faster cold starts are valuable.

Both backends expose the **identical** REST surface, so the frontend can be
pointed at either implementation without modification.

---

## 1. Recommended infrastructure

|              | Minimum (single-region)             | Recommended (production)                 |
|--------------|--------------------------------------|------------------------------------------|
| **Frontend** | Static hosting (Vercel / Netlify / Cloudflare Pages / S3+CloudFront) | CDN-fronted static (Cloudflare Pages or CloudFront + S3) with HTTP/3, immutable cache |
| **Backend**  | 1× container, 256 MB RAM             | 2× containers behind LB, auto-scale 2→10 on CPU 60% / RPS 200 |
| **Database** | MongoDB Atlas M0/M2                  | MongoDB Atlas M10+ replica set, region-pinned to backend, daily snapshot backups |
| **DNS / TLS**| Cloudflare proxied                   | Cloudflare proxied with HSTS, mTLS option for `/api` |
| **Logs / metrics** | stdout JSON                   | Loki + Grafana / Datadog / CloudWatch    |
| **Uptime**   | UptimeRobot ping `/healthz`          | Pingdom + on-call rotation, SLO 99.9%    |

### Suggested deployment targets

- **Frontend SPA** → Cloudflare Pages or Vercel (free → cheap), zero ops.
- **Bun backend** (`backend-bun/`) → Railway, Fly.io (auto-stop saves $$),
  Render, or DigitalOcean App Platform. ~$5–10/month at low traffic.
- **FastAPI backend** (`backend/`) → Same providers as above (all support
  Docker / Python). Use when you need Python libs (`pandas`, integrations).
- **MongoDB** → MongoDB Atlas (managed). Self-hosting is not recommended.

---

## 2. Environment variables

### `frontend/.env`

| Variable                    | Purpose                                          |
|-----------------------------|--------------------------------------------------|
| `REACT_APP_BACKEND_URL`     | **Required.** Public URL of the backend, no trailing slash. The frontend appends `/api`. |
| `WDS_SOCKET_PORT`           | CRA legacy; ignored by Vite, safe to remove.     |
| `ENABLE_HEALTH_CHECK`       | CRA legacy; ignored by Vite, safe to remove.     |

> Vite reads `REACT_APP_*` and `VITE_*` prefixed variables. Existing code
> using `process.env.REACT_APP_*` continues to work unchanged thanks to
> compile-time `define` (see `frontend/vite.config.js`).

### `backend/.env` (FastAPI)

| Variable        | Required | Description                              |
|-----------------|:--------:|------------------------------------------|
| `MONGO_URL`     | yes      | MongoDB connection string                |
| `DB_NAME`       | yes      | MongoDB database name                    |
| `CORS_ORIGINS`  | no       | Comma-separated origins, default `*`     |

### `backend-bun/.env` (Bun)

Same as above, plus:

| Variable        | Required | Default     | Description                          |
|-----------------|:--------:|-------------|--------------------------------------|
| `HOST`          | no       | `0.0.0.0`   | Bind interface                       |
| `PORT`          | no       | `8001`      | Listen port                          |
| `LOG_LEVEL`     | no       | `info`      | `debug` / `info` / `warn` / `error`  |

---

## 3. Local development

### Frontend

```bash
cd frontend
cp .env.example .env  # or edit existing .env
yarn install
yarn start            # Vite dev server on http://localhost:3000
```

Hot Module Replacement is enabled. The dev server is configured for the
Emergent preview proxy (HMR over wss://…:443) — in your own environment you
may want to remove `server.hmr.clientPort` from `vite.config.js`.

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Backend (Bun)

```bash
curl -fsSL https://bun.sh/install | bash
cd backend-bun
cp .env.example .env
bun install
bun run dev
```

---

## 4. Production builds

### Frontend

```bash
cd frontend
yarn install --frozen-lockfile
REACT_APP_BACKEND_URL=https://api.example.com yarn build
# Output: frontend/build/   (static, deploy anywhere)
```

Recommended cache headers for the CDN:

```
/index.html              Cache-Control: public, max-age=0, must-revalidate
/assets/*                Cache-Control: public, max-age=31536000, immutable
```

### Bun backend

```bash
docker build -t sync/backend-bun:$(git rev-parse --short HEAD) backend-bun/
docker push  registry.example.com/sync/backend-bun:...
```

### FastAPI backend

```bash
docker build -t sync/backend-fastapi:$(git rev-parse --short HEAD) backend/
```

(A `Dockerfile` for the FastAPI service can be added; until then, deploy
with the platform's auto-detected Python buildpack — `requirements.txt` and
the start command `uvicorn server:app --host 0.0.0.0 --port 8001` are
sufficient on Railway / Render / Fly / Heroku.)

---

## 5. Sample `docker-compose.yml` (production-style local stack)

```yaml
services:
  mongo:
    image: mongo:7
    restart: unless-stopped
    volumes: ["mongo-data:/data/db"]
    ports: ["27017:27017"]

  backend:
    build: ./backend-bun
    restart: unless-stopped
    environment:
      MONGO_URL: mongodb://mongo:27017
      DB_NAME: sync
      CORS_ORIGINS: "https://www.example.com"
    depends_on: [mongo]
    ports: ["8001:8001"]

  frontend:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - ./frontend/build:/usr/share/nginx/html:ro
      - ./deploy/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    ports: ["80:80"]
    depends_on: [backend]

volumes:
  mongo-data: {}
```

---

## 6. Scaling & uptime

- **Horizontal scaling**: the backend is stateless; scale the container
  horizontally behind any HTTP load balancer. Sticky sessions are not
  required.
- **Vertical baseline**: 0.25 vCPU / 256 MB is enough for ~100 RPS on the Bun
  backend. For FastAPI use 0.5 vCPU / 512 MB minimum.
- **Connection pool**: `backend-bun` uses `maxPoolSize: 20`. Tune in
  `src/lib/db.ts` if your Atlas tier has a different connection limit.
- **Graceful shutdown**: both backends honour SIGTERM; configure platforms
  to wait ≥10 s during rolling updates.
- **Liveness probe**:    `GET /healthz` → 200 if Mongo `ping` succeeds.
- **Readiness probe**:   `GET /api/`    → 200 always once routes are wired.
- **SLO target**: 99.9% monthly (≈ 43 min downtime budget). Use multi-region
  fail-over only if you need 99.95%+.

---

## 7. CI/CD outline

A minimal pipeline (GitHub Actions, GitLab CI, etc.) should:

1. `yarn --frozen-lockfile && yarn build` (frontend) — fail on warnings.
2. `bunx tsc --noEmit`                 (backend-bun) — fail on TS errors.
3. `pip install -r backend/requirements.txt && pytest` (FastAPI tests).
4. Build & push Docker images tagged with the commit SHA.
5. Deploy via platform API (Railway/Fly/Render/K8s rollout).
6. Run a post-deploy smoke test: `curl -fsS $URL/healthz`.

---

## 8. Operational checklist

- [ ] MongoDB Atlas backups enabled (daily, 7-day retention minimum).
- [ ] CORS origins set to actual production hosts (not `*`).
- [ ] HTTPS-only on frontend CDN; HSTS enabled.
- [ ] Secrets stored in platform secret manager (never in the repo).
- [ ] `/healthz` wired to UptimeRobot / Pingdom.
- [ ] Application logs streamed to Loki / Datadog / CloudWatch.
- [ ] Alerts configured for `5xx > 1% over 5 min` and `mongoOk=false`.

---

## 9. Migration notes (CRA → Vite, FastAPI → optional Bun)

### Frontend (already migrated)

- Replaced CRA / `react-scripts` / CRACO with **Vite 5 + @vitejs/plugin-react**.
- Removed: `react-scripts`, `@craco/craco`, `@babel/plugin-proposal-private-property-in-object`, `cra-template`, `@emergentbase/visual-edits`, `next-themes`, `react-day-picker`, all unused `shadcn/ui` components and their Radix dependencies, `tailwindcss-animate`.
- Kept: React 19, react-router-dom v7, framer-motion, sonner (only toast lib),
  react-helmet-async, lucide-react, axios.
- Public API to application code is identical:
  - `import "@/..."` path alias still works.
  - `process.env.REACT_APP_BACKEND_URL` still resolves at build time.
  - `yarn start` still launches a dev server on `:3000` (now via Vite).

### Backend

- FastAPI service is unchanged and remains the default in the Emergent
  preview container.
- A parallel Bun + TypeScript service has been added under `backend-bun/`,
  byte-compatible at the HTTP layer. Switch the frontend at deploy time
  simply by pointing `REACT_APP_BACKEND_URL` at whichever backend is live.

There are no visual, behavioural, or API changes in this refactor.
