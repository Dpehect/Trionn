import { NextResponse } from "next/server";
import { projectAdminSchema } from "@/lib/project-admin-schema";
import { projectAdminRepository } from "@/server/project-admin-repository";
import { requireRole } from "@/server/auth-session";

export async function GET() {
  await requireRole(["admin", "editor", "viewer"]);
  const items = await projectAdminRepository.list();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  await requireRole(["admin", "editor"]);

  const body = await request.json().catch(() => null);
  const parsed = projectAdminSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const item = await projectAdminRepository.create(parsed.data);
  return NextResponse.json({ ok: true, item }, { status: 201 });
}
