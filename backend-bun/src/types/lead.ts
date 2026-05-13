import { z } from "zod";

/**
 * Lead capture models. Wire-compatible with FastAPI's `/api/leads` endpoint
 * so the frontend cannot tell which backend it is talking to.
 */
export const LeadSource = z.enum(["contact", "newsletter", "other"]);

export const LeadCreate = z.object({
  // `email` is the only strictly required field — newsletter form has only it.
  email: z.string().email().max(320),
  name: z.string().max(200).optional().or(z.literal("")).transform((v) => v || undefined),
  company: z.string().max(200).optional().or(z.literal("")).transform((v) => v || undefined),
  role: z.string().max(200).optional().or(z.literal("")).transform((v) => v || undefined),
  interest: z.string().max(200).optional().or(z.literal("")).transform((v) => v || undefined),
  describes_you: z.string().max(200).optional().or(z.literal("")).transform((v) => v || undefined),
  message: z.string().max(5000).optional().or(z.literal("")).transform((v) => v || undefined),
  source: LeadSource.default("contact"),
});
export type LeadCreate = z.infer<typeof LeadCreate>;

export type Lead = LeadCreate & {
  id: string;
  timestamp: string; // ISO-8601
};
