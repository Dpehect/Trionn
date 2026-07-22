import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth-session";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  allowedMediaTypes,
  MAX_MEDIA_BYTES,
  mediaMetadataSchema,
} from "@/lib/media-schema";
import { mediaRepository } from "@/server/media-repository";

export async function POST(request: Request) {
  await requireRole(["admin", "editor"]);

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "STORAGE_NOT_CONFIGURED" }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "");
  const folder = String(formData.get("folder") ?? "projects");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "FILE_REQUIRED" }, { status: 400 });
  }

  const metadata = mediaMetadataSchema.safeParse({ altText, folder });
  if (!metadata.success) {
    return NextResponse.json({ error: "INVALID_METADATA" }, { status: 400 });
  }

  if (!allowedMediaTypes.includes(file.type as any)) {
    return NextResponse.json({ error: "UNSUPPORTED_MEDIA_TYPE" }, { status: 415 });
  }

  if (file.size > MAX_MEDIA_BYTES) {
    return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 413 });
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const storagePath = `${metadata.data.folder}/${crypto.randomUUID()}-${safeName}`;

  const buffer = await file.arrayBuffer();
  const { error } = await supabaseAdmin.storage
    .from("project-media")
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: "UPLOAD_FAILED" }, { status: 500 });
  }

  const item = await mediaRepository.create({
    storagePath,
    mimeType: file.type,
    altText: metadata.data.altText,
  });

  return NextResponse.json({ ok: true, item }, { status: 201 });
}
