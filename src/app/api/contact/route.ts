import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  if (body.website) return NextResponse.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const brief = typeof body.brief === "string" ? body.brief.trim() : "";

  if (!name || !email.includes("@") || brief.length < 20) {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  // Production integration point: send to Resend, HubSpot or the client's CRM.
  console.info("Softbridge project enquiry", { name, email, briefLength: brief.length });
  return NextResponse.json({ ok: true });
}
