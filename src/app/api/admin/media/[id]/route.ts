import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth-session";
import { mediaRepository } from "@/server/media-repository";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireRole(["admin"]);
  const { id } = await params;
  const url = new URL(request.url);
  const storagePath = url.searchParams.get("storagePath");

  if (!storagePath) {
    return NextResponse.json({ error: "STORAGE_PATH_REQUIRED" }, { status: 400 });
  }

  await mediaRepository.remove(id, storagePath);
  return NextResponse.json({ ok: true });
}
