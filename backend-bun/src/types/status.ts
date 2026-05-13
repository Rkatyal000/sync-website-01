import { z } from "zod";

/**
 * Status check models — wire-compatible with the FastAPI Pydantic models so
 * the frontend cannot tell which backend is responding.
 *
 *   POST /api/status   { client_name }
 *   GET  /api/status   -> StatusCheck[]
 *
 * `timestamp` is stored on MongoDB as an ISO-8601 string (matches the Python
 * implementation in /app/backend/server.py).
 */
export const StatusCheckCreate = z.object({
  client_name: z.string().min(1).max(256),
});
export type StatusCheckCreate = z.infer<typeof StatusCheckCreate>;

export const StatusCheck = z.object({
  id: z.string(),
  client_name: z.string(),
  timestamp: z.string(), // ISO-8601
});
export type StatusCheck = z.infer<typeof StatusCheck>;
