/**
 * /api/leads — lightweight lead capture + CSV export.
 *
 * - POST /api/leads          → create lead (Contact + Newsletter forms)
 * - GET  /api/leads/export   → download all leads as CSV
 *
 * No auth system; an optional shared-secret env var (`LEADS_EXPORT_TOKEN`)
 * gates the export endpoint when set. Document the recommendation in
 * `DEPLOYMENT.md` so production deployments enable it.
 */
import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { getDb } from "../lib/db.ts";
import { LeadCreate, type Lead } from "../types/lead.ts";

export const leadsRouter = new Hono();

leadsRouter.post("/", async (c) => {
  const raw = await c.req.json().catch(() => null);
  const parsed = LeadCreate.safeParse(raw);
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

  const lead: Lead = {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    ...parsed.data,
    email: parsed.data.email.trim().toLowerCase(),
  };

  const db = await getDb();
  await db.collection("leads").insertOne({ ...lead });

  return c.json(lead, 201);
});

leadsRouter.get("/export", async (c) => {
  const expected = process.env.LEADS_EXPORT_TOKEN;
  if (expected) {
    const provided = c.req.header("x-export-token");
    if (!provided || provided !== expected) {
      return c.json({ detail: "Forbidden" }, 403);
    }
  }

  const fields = [
    "id",
    "timestamp",
    "source",
    "name",
    "email",
    "company",
    "role",
    "interest",
    "describes_you",
    "message",
  ] as const;

  // Minimal RFC 4180-ish CSV escaping (handles commas, quotes, newlines).
  const esc = (v: unknown): string => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const db = await getDb();
  const cursor = db
    .collection("leads")
    .find({}, { projection: { _id: 0 } })
    .sort({ timestamp: -1 });

  const lines: string[] = [fields.join(",")];
  for await (const doc of cursor) {
    lines.push(fields.map((k) => esc((doc as Record<string, unknown>)[k])).join(","));
  }

  const today = new Date().toISOString().slice(0, 10);
  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="leads-${today}.csv"`,
    },
  });
});
