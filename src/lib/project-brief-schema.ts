import { z } from "zod";

export const projectBriefSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(120),
  projectType: z.enum([
    "Brand platform",
    "Product experience",
    "Campaign",
    "Commerce",
    "Other",
  ]),
  budget: z.enum(["10-25k", "25-50k", "50-100k", "100k+"]),
  timeline: z.enum(["ASAP", "1-3 months", "3-6 months", "Flexible"]),
  services: z.array(z.string()).min(1),
  message: z.string().trim().min(30).max(4000),
  website: z.string().url().optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

export type ProjectBriefInput = z.infer<typeof projectBriefSchema>;
