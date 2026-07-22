import { NextResponse } from "next/server";
import { z } from "zod";
import { inquiryRepository } from "@/server/inquiry-repository";
import { requireApiRole } from "@/server/api-auth";

const schema = z.object({
  status: z.enum(["new", "reviewing", "closed"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorization = await requireApiRole(["admin", "editor"]);

  if (!authorization.ok) {
    return NextResponse.json(authorization, {
      status: authorization.error.code === "FORBIDDEN" ? 403 : 401,
    });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const { id } = await params;
  const item = await inquiryRepository.updateStatus(id, parsed.data.status);

  return NextResponse.json({ ok: true, item });
}
