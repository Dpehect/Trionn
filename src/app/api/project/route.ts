import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "ENDPOINT_MOVED",
      message: "Use POST /api/inquiries.",
    },
    {
      status: 410,
      headers: { Location: "/api/inquiries" },
    }
  );
}
