type Result = { success: boolean; remaining: number; resetAt: number };

export async function distributedRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): Promise<Result> {
  // Adapter point for Upstash/Vercel KV.
  // Falls back to process-local protection when no distributed store is configured.
  const { rateLimit } = await import("@/lib/rate-limit");
  return rateLimit(key, limit, windowMs);
}
