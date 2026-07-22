import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiRole } from "@/server/api-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const schema = z.object({
  filename: z.string().min(1).max(180),
  folder: z.string().default("projects"),
});

export async function POST(request: Request) {
  const authorization = await requireApiRole(["admin", "editor"]);

  if (!authorization.ok) {
    return NextResponse.json(authorization, {
      status: authorization.error.code === "FORBIDDEN" ? 403 : 401,
    });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "STORAGE_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const safeFilename = parsed.data.filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-");

  const storagePath =
    `${parsed.data.folder}/${crypto.randomUUID()}-${safeFilename}`;

  const { data, error } = await supabaseAdmin.storage
    .from("project-media")
    .createSignedUploadUrl(storagePath);

  if (error || !data) {
    return NextResponse.json(
      { error: "SIGNED_URL_FAILED" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    storagePath,
    signedUrl: data.signedUrl,
    token: data.token,
  });
}
