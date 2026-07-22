import { z } from "zod";

export const mediaMetadataSchema = z.object({
  altText: z.string().trim().min(2).max(240),
  folder: z.string().trim().max(120).default("projects"),
});

export const allowedMediaTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "video/webm",
] as const;

export const MAX_MEDIA_BYTES = 25 * 1024 * 1024;
