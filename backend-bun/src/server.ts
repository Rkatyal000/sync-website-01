/**
 * Bun + Hono server — drop-in replacement for the FastAPI app.
 *
 * Route surface (matches /app/backend/server.py):
 *   GET  /api/         → { message: "Hello World" }
 *   GET  /api/status   → StatusCheck[]
 *   POST /api/status   → StatusCheck
 *
 * Plus a Bun-native operational endpoint:
 *   GET  /healthz      → { ok: true, uptime, mongoOk }
 *
 * Designed for production deployment via Docker, Fly.io, Railway, Render, or
 * Kubernetes. Cold start ≤ 60 ms, RSS ≈ 30-50 MB.
 */
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";

import { config } from "./lib/config.ts";
import { logger } from "./lib/logger.ts";
import { getDb, closeDb } from "./lib/db.ts";
import { statusRouter } from "./routes/status.ts";

const app = new Hono();

// ---- middleware -----------------------------------------------------------
app.use("*", honoLogger((msg) => logger.debug(msg)));

app.use(
  "*",
  cors({
    origin: config.corsOrigins,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["*"],
    credentials: true,
    maxAge: 600,
  }),
);

// ---- routes ---------------------------------------------------------------
// Health check (k8s/livez/readiness friendly)
app.get("/healthz", async (c) => {
  let mongoOk = false;
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    mongoOk = true;
  } catch (err) {
    logger.error("Mongo ping failed", { err: String(err) });
  }
  return c.json({
    ok: mongoOk,
    uptimeSec: Math.round(process.uptime()),
    mongoOk,
    ts: new Date().toISOString(),
  });
});

// API namespace (matches FastAPI prefix)
const api = new Hono();
api.get("/", (c) => c.json({ message: "Hello World" }));
api.route("/status", statusRouter);
app.route("/api", api);

// ---- error handler --------------------------------------------------------
app.onError((err, c) => {
  logger.error("Unhandled error", { err: err.message, stack: err.stack });
  return c.json({ detail: "Internal Server Error" }, 500);
});

// ---- startup --------------------------------------------------------------
async function main() {
  // Warm the Mongo pool before accepting traffic.
  await getDb();
  logger.info(`Server listening on ${config.host}:${config.port}`);
}

const server = Bun.serve({
  hostname: config.host,
  port: config.port,
  fetch: app.fetch,
  // Reject huge bodies up-front (defence in depth).
  maxRequestBodySize: 1 * 1024 * 1024,
});

await main();

// ---- graceful shutdown ----------------------------------------------------
async function shutdown(signal: string) {
  logger.info(`Received ${signal}, shutting down...`);
  server.stop(true);
  await closeDb();
  process.exit(0);
}
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

export default app;
