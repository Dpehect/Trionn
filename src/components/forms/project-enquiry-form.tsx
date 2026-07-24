"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { budgetRanges, launchWindows, projectTypes, type ValidationErrors } from "@/lib/contact-schema";

const fieldClass = "w-full rounded-2xl border border-black/15 bg-white px-4 py-3.5 text-base outline-none transition placeholder:text-black/35 focus:border-black focus:ring-4 focus:ring-black/5";

export function ProjectEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading"); setMessage(""); setErrors({});
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) {
        setStatus("error"); setMessage(result.message || "Submission failed."); setErrors(result.errors || {}); return;
      }
      setStatus("success"); setMessage(result.message); form.reset();
    } catch {
      setStatus("error"); setMessage("Network error. Please email us directly.");
    }
  }

  return <form onSubmit={handleSubmit} className="border hairline bg-white p-5 sm:p-8" noValidate>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" error={errors.name}><input className={fieldClass} name="name" autoComplete="name" placeholder="Your name" required /></Field>
      <Field label="Work email" error={errors.email}><input className={fieldClass} name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></Field>
      <Field label="Company" error={errors.company}><input className={fieldClass} name="company" autoComplete="organization" placeholder="Company or organisation" /></Field>
      <Field label="Project type" error={errors.projectType}><select className={fieldClass} name="projectType" defaultValue="" required><option value="" disabled>Select one</option>{projectTypes.map((item)=><option key={item}>{item}</option>)}</select></Field>
      <Field label="Indicative budget" error={errors.budget}><select className={fieldClass} name="budget" defaultValue="" required><option value="" disabled>Select one</option>{budgetRanges.map((item)=><option key={item}>{item}</option>)}</select></Field>
      <Field label="Desired launch" error={errors.launchWindow}><select className={fieldClass} name="launchWindow" defaultValue="" required><option value="" disabled>Select one</option>{launchWindows.map((item)=><option key={item}>{item}</option>)}</select></Field>
    </div>
    <div className="mt-5"><Field label="Project context" error={errors.message}><textarea className={`${fieldClass} min-h-44 resize-y`} name="message" placeholder="What are you building, what is blocking progress and what would a successful outcome change?" required minLength={30} maxLength={4000}/></Field></div>
    <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-md text-sm leading-relaxed text-black/50">By submitting, you agree that we may use these details to respond to your enquiry. No marketing list is created.</p>
      <button disabled={status === "loading"} className="inline-flex min-h-13 items-center justify-center gap-3 bg-ink px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
        {status === "loading" ? <LoaderCircle className="animate-spin" size={18}/> : status === "success" ? <Check size={18}/> : <ArrowRight size={18}/>} {status === "loading" ? "Sending" : "Send enquiry"}
      </button>
    </div>
    <div aria-live="polite" className={`mt-5 border-l-2 px-4 py-3 text-sm ${status === "success" ? "bg-aurora/25" : status === "error" ? "bg-red-50 text-red-800" : "hidden"}`}>{message}</div>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span>{children}{error && <span className="text-xs text-red-700">{error}</span>}</label>;
}
