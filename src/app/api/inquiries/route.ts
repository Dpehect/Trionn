import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { inquiryRepository } from "@/server/inquiry-repository";

export async function GET() {
  const items = await inquiryRepository.list();
  return NextResponse.json({ items, count: items.length });
}

export async function POST(request: Request) {
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
