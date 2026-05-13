# backend-bun

A production-grade **Bun + TypeScript** backend that is wire-compatible with
the original **FastAPI** implementation in `/app/backend/`. It exists in
parallel so the Emergent preview environment can continue running FastAPI
unchanged while production deployments can move to Bun for:

- **Cold start** ~60 ms (vs ~1.5–3 s for uvicorn).
- **Idle memory** ~30–50 MB RSS (vs ~120–180 MB).
- **Native TypeScript** — no transpile step in production.
- **Single binary deploy** (Bun ships its runtime) — no Python interpreter
  / virtualenv / wheels on the production host.

## Route surface (matches FastAPI 1:1)

| Method | Path           | Description                                  |
|-------:|----------------|----------------------------------------------|
|  GET   | `/api/`        | Health/hello payload                         |
|  GET   | `/api/status`  | List status checks (Mongo `status_checks`)   |
|  POST  | `/api/status`  | Create status check                          |
|  GET   | `/healthz`     | Liveness + Mongo ping (operational only)     |

Request/response bodies are byte-identical to the Python service so the
frontend in `/app/frontend/` works against either backend without changes.

## Project layout

```
backend-bun/
├── src/
│   ├── server.ts          # Hono app, middleware, lifecycle
│   ├── lib/
│   │   ├── config.ts      # Strict env parsing
│   │   ├── db.ts          # Singleton MongoClient
│   │   └── logger.ts      # JSON structured logger
│   ├── routes/
│   │   └── status.ts      # /api/status handlers
│   └── types/
│       └── status.ts      # Zod schemas
├── Dockerfile             # Multi-stage, alpine, non-root
├── tsconfig.json
├── package.json
└── .env.example
```

## Local development

```bash
# Install Bun if you don't have it:
curl -fsSL https://bun.sh/install | bash

cd /app/backend-bun
cp .env.example .env       # then edit MONGO_URL / DB_NAME

bun install
bun run dev                # hot-reload on src/ changes
```

The server listens on `0.0.0.0:8001` by default — the same port as the
FastAPI service — so you can stop one and start the other transparently.

## Production

### Docker

```bash
docker build -t sync/backend-bun:latest /app/backend-bun
docker run --rm -p 8001:8001 \
  -e MONGO_URL="mongodb+srv://user:pass@cluster/..." \
  -e DB_NAME="sync_prod" \
  -e CORS_ORIGINS="https://www.example.com,https://app.example.com" \
  sync/backend-bun:latest
```

### Bun directly

```bash
NODE_ENV=production bun run src/server.ts
```

## Environment variables

| Variable        | Required | Default     | Purpose                              |
|-----------------|:--------:|-------------|--------------------------------------|
| `MONGO_URL`     |   yes    | —           | MongoDB connection string            |
| `DB_NAME`       |   yes    | —           | MongoDB database name                |
| `HOST`          |    no    | `0.0.0.0`   | Bind interface                       |
| `PORT`          |    no    | `8001`      | Listen port                          |
| `CORS_ORIGINS`  |    no    | `*`         | Comma-separated allowed origins      |
| `LOG_LEVEL`     |    no    | `info`      | `debug` / `info` / `warn` / `error`  |

See `/app/DEPLOYMENT.md` for full infrastructure / scaling recommendations.
