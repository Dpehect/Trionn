import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { inquiryRepository } from "@/server/inquiry-repository";
import { rateLimit } from "@/lib/rate-limit";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const items = await inquiryRepository.list();
  return NextResponse.json({ items, count: items.length });
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "local";
  const limited = rateLimit(`inquiry:${ip}`, 5, 60_000);

  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 20_000) {
    return NextResponse.json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const item = await inquiryRepository.create(parsed.data);
  return NextResponse.json({ ok: true, item }, { status: 201 });
}
