import { z } from "zod";

export const projectAdminSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/),
  summary: z.string().trim().min(20).max(500),
  category: z.string().trim().min(2).max(80),
  year: z.string().regex(/^20\d{2}$/),
  client: z.string().trim().max(120).optional().or(z.literal("")),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  services: z.array(z.string()).min(1),
  metric: z.string().trim().max(120).optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),
  seoTitle: z.string().trim().max(70).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(160).optional().or(z.literal("")),
});

export type ProjectAdminInput = z.infer<typeof projectAdminSchema>;
