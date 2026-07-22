import { NextResponse } from "next/server";
import { projectBriefSchema } from "@/lib/project-brief-schema";
import { rateLimit } from "@/lib/rate-limit";
import { inquiryRepository } from "@/server/inquiry-repository";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

  const limited = rateLimit(`brief:${ip}`, 4, 60_000);
  if (!limited.success) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = projectBriefSchema.safeParse(body);

  if (!parsed.success || parsed.data.honeypot) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const item = await inquiryRepository.create({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    budget: parsed.data.budget,
    message: JSON.stringify({
      projectType: parsed.data.projectType,
      timeline: parsed.data.timeline,
      services: parsed.data.services,
      website: parsed.data.website,
      message: parsed.data.message,
    }),
  });

  return NextResponse.json({ ok: true, item }, { status: 201 });
}
