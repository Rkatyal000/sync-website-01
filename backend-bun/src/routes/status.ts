/**
 * /api/status routes — mirror the FastAPI implementation.
 *
 * Document shape stored in MongoDB:
 *   { id: string (uuid), client_name: string, timestamp: string (ISO-8601) }
 *
 * `_id` is excluded from every read because it is BSON ObjectId and is not
 * JSON-serialisable / not part of the public response model.
 */
import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { getDb } from "../lib/db.ts";
import { StatusCheckCreate, type StatusCheck } from "../types/status.ts";

export const statusRouter = new Hono();

statusRouter.get("/", async (c) => {
  const db = await getDb();
  const docs = await db
    .collection<StatusCheck>("status_checks")
    .find({}, { projection: { _id: 0 } })
    .limit(1000)
    .toArray();
  return c.json(docs);
});

statusRouter.post("/", async (c) => {
  const raw = await c.req.json().catch(() => null);
  const parsed = StatusCheckCreate.safeParse(raw);
  if (!parsed.success) {
    return c.json(
      {
        detail: parsed.error.issues.map((i) => ({
          loc: i.path,
          msg: i.message,
          type: i.code,
        })),
      },
      422,
    );
  }

  const doc: StatusCheck = {
    id: randomUUID(),
    client_name: parsed.data.client_name,
    timestamp: new Date().toISOString(),
  };

  const db = await getDb();
  await db.collection("status_checks").insertOne({ ...doc });

  return c.json(doc);
});
