/**
 * Application configuration loaded from process.env.
 *
 * Strict-by-default: required variables fail fast at startup so misconfigured
 * deployments crash loudly instead of running with implicit defaults.
 */

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

function optional(name: string, fallback: string): string {
  const v = process.env[name];
  return v && v.trim() !== "" ? v : fallback;
}

export const config = {
  mongoUrl: required("MONGO_URL"),
  dbName: required("DB_NAME"),
  port: Number.parseInt(optional("PORT", "8001"), 10),
  host: optional("HOST", "0.0.0.0"),
  corsOrigins: optional("CORS_ORIGINS", "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  logLevel: optional("LOG_LEVEL", "info"),
} as const;

export type AppConfig = typeof config;
