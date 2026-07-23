import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2), email: z.string().email(), company: z.string().min(2),
  service: z.string().min(1), budget: z.string().min(1), message: z.string().min(20),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ ok: false, issues: parsed.error.flatten() }, { status: 400 });
  // Connect Resend, HubSpot or your CRM here. Never initialize external SDKs at module scope.
  console.info("New project inquiry", { ...parsed.data, message: "[redacted in logs]" });
  return NextResponse.json({ ok: true });
}
