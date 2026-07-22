import "server-only";
import { z } from "zod";

const optionalUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().url().optional()
);

const optionalSecret = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().min(20).optional()
);

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  AUTH_SECRET: z.string().min(16).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalSecret,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalSecret,
  SUPABASE_SERVICE_ROLE_KEY: optionalSecret,
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  AUTH_SECRET: process.env.AUTH_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = parsed.data;

export function getSupabasePublicKey() {
  return (
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export function hasSupabaseConfig() {
  return Boolean(
    env.NEXT_PUBLIC_SUPABASE_URL &&
      getSupabasePublicKey() &&
      env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function assertAuthConfig() {
  if (!env.AUTH_SECRET || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error(
      "Authentication is not configured. Set AUTH_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD."
    );
  }

  return {
    authSecret: env.AUTH_SECRET,
    adminEmail: env.ADMIN_EMAIL,
    adminPassword: env.ADMIN_PASSWORD,
  };
}
