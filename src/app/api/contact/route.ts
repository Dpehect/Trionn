import { NextResponse } from "next/server";
import { validateProjectEnquiry } from "@/lib/contact-schema";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map<string, number[]>();

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = validateProjectEnquiry(input);
  if (result.errors) {
    return NextResponse.json({ ok: false, message: "Please review the highlighted fields.", errors: result.errors }, { status: 422 });
  }

  const enquiry = result.data!;
  if (enquiry.website) {
    return NextResponse.json({ ok: true, message: "Thank you. Your enquiry has been received." });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Softbridge Website <onboarding@resend.dev>";

  if (!resendKey || !destination) {
    if (process.env.NODE_ENV === "development") {
      console.info("Project enquiry", { ...enquiry, website: undefined });
      return NextResponse.json({ ok: true, message: "Development submission recorded. Configure email variables before launch." });
    }
    return NextResponse.json({ ok: false, message: "The contact service is not configured. Please email us directly." }, { status: 503 });
  }

  const body = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company || "Not provided"}`,
    `Project: ${enquiry.projectType}`,
    `Budget: ${enquiry.budget}`,
    `Launch: ${enquiry.launchWindow}`,
    "",
    enquiry.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [destination], reply_to: enquiry.email, subject: `New project enquiry — ${enquiry.company || enquiry.name}`, text: body }),
  });

  if (!response.ok) {
    console.error("Contact delivery failed", response.status, await response.text());
    return NextResponse.json({ ok: false, message: "We could not send your enquiry. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: "Thank you. We will review your project and reply within two business days." });
}
