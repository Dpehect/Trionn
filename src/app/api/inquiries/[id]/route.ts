import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { inquiryRepository } from "@/server/inquiry-repository";

const schema = z.object({
  status: z.enum(["new", "reviewing", "closed"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { id } = await params;
  const item = await inquiryRepository.updateStatus(id, parsed.data.status);
  return NextResponse.json({ ok: true, item });
}
