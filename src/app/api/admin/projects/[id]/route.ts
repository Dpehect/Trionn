import { NextResponse } from "next/server";
import { projectAdminSchema } from "@/lib/project-admin-schema";
import { projectAdminRepository } from "@/server/project-admin-repository";
import { requireRole } from "@/server/auth-session";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;

  const body = await request.json().catch(() => null);
  const parsed = projectAdminSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }

  const item = await projectAdminRepository.update(id, parsed.data);
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireRole(["admin"]);
  const { id } = await params;
  await projectAdminRepository.remove(id);
  return NextResponse.json({ ok: true });
}
