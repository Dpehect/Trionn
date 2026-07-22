import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ ok:true, mode:"local" });
  }
  const { error } = await supabaseAdmin.from("projects").select("id").limit(1);
  return NextResponse.json(
    { ok: !error, database: error ? "unavailable" : "ready" },
    { status: error ? 503 : 200 }
  );
}
