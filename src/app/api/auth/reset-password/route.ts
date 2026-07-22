import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { distributedRateLimit } from "@/lib/distributed-rate-limit";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({error:"VALIDATION_ERROR"},{status:400});

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = await distributedRateLimit(`reset:${ip}`, 3, 3600000);
  if (!limit.success) return NextResponse.json({error:"RATE_LIMITED"},{status:429});

  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({error:"AUTH_NOT_CONFIGURED"},{status:503});

  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  });

  return NextResponse.json({ok:true});
}
