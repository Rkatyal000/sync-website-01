# syntax=docker/dockerfile:1.7
# ------------------------------------------------------------------
# Multi-stage Bun image — tiny, distroless-style runtime.
# ------------------------------------------------------------------

# ---- build stage ----------------------------------------------------------
FROM oven/bun:1.1-alpine AS build
WORKDIR /app

# Install dependencies separately so they are cached when only src/ changes.
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

# Copy source + types
COPY tsconfig.json ./
COPY src ./src

# Type-check to fail the build on TS errors.
RUN bunx tsc --noEmit

# ---- runtime stage --------------------------------------------------------
FROM oven/bun:1.1-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8001 \
    LOG_LEVEL=info

# Run as a non-root user (Bun's image ships an `bun` user)
USER bun

COPY --from=build --chown=bun:bun /app/node_modules ./node_modules
COPY --from=build --chown=bun:bun /app/src         ./src
COPY --from=build --chown=bun:bun /app/package.json ./package.json
COPY --from=build --chown=bun:bun /app/tsconfig.json ./tsconfig.json

EXPOSE 8001

HEALTHCHECK --interval=20s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/healthz | grep -q '"ok":true' || exit 1

CMD ["bun", "run", "src/server.ts"]
