import { NextResponse } from "next/server";
import { hasSupabaseConfig } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "atelier-x",
    timestamp: new Date().toISOString(),
    databaseConfigured: hasSupabaseConfig(),
    runtime: process.env.NEXT_RUNTIME ?? "nodejs",
  });
}
