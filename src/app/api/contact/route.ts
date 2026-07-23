import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  service: z.string().min(1),
  message: z.string().min(20).max(2000)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid brief" }, { status: 400 });
  console.info("Project brief received", { ...parsed.data, email: "[redacted]" });
  return NextResponse.json({ ok: true });
}
