"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-stage bg-white p-6 md:p-10">
      <div className="grid gap-x-8 md:grid-cols-2">
        <label><span className="eyebrow text-forest/45">Name</span><input required name="name" className="form-field" autoComplete="name" /></label>
        <label><span className="eyebrow text-forest/45">Work email</span><input required type="email" name="email" className="form-field" autoComplete="email" /></label>
        <label><span className="eyebrow text-forest/45">Company</span><input name="company" className="form-field" autoComplete="organization" /></label>
        <label><span className="eyebrow text-forest/45">Budget range</span><select name="budget" className="form-field" defaultValue=""><option value="" disabled>Select</option><option>€25k–€60k</option><option>€60k–€150k</option><option>€150k+</option><option>Not defined</option></select></label>
      </div>
      <label className="mt-8 block"><span className="eyebrow text-forest/45">What decision or delivery problem needs attention?</span><textarea required name="brief" className="form-field min-h-36 resize-y" /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"} className="magnetic-button button-dark mt-8 min-w-44">
        {status === "sending" ? "Sending…" : "Send project brief"}
      </button>
      <p className="mt-4 text-sm text-forest/55" aria-live="polite">
        {status === "sent" && "Thank you. We will reply with a useful next step."}
        {status === "error" && "The form could not be sent. Email hello@softbridge.fi instead."}
      </p>
    </form>
  );
}
