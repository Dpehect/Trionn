"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  company: z.string().min(2, "Please enter your company."),
  service: z.string().min(1, "Select a service."),
  budget: z.string().min(1, "Select a budget range."),
  message: z.string().min(20, "Tell us a little more about the project."),
});

type Inquiry = z.infer<typeof inquirySchema>;

export function ProjectInquiryForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Inquiry>({ resolver: zodResolver(inquirySchema) });

  const submit = async (values: Inquiry) => {
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (!response.ok) throw new Error("Unable to send inquiry");
    setSent(true);
    reset();
  };

  if (sent) return <div className="contact-success"><span>Inquiry received</span><h3>Thank you. We&apos;ll reply within two business days.</h3><button onClick={() => setSent(false)}>Send another inquiry</button></div>;

  return (
    <form className="inquiry-form" onSubmit={handleSubmit(submit)} noValidate>
      <label><span>Your name</span><input {...register("name")} placeholder="Jane Doe" />{errors.name && <small>{errors.name.message}</small>}</label>
      <label><span>Work email</span><input {...register("email")} type="email" placeholder="jane@company.com" />{errors.email && <small>{errors.email.message}</small>}</label>
      <label><span>Company</span><input {...register("company")} placeholder="Company Oy" />{errors.company && <small>{errors.company.message}</small>}</label>
      <label><span>What do you need?</span><select {...register("service")} defaultValue=""><option value="" disabled>Select service</option><option>Custom software</option><option>AI automation</option><option>SaaS product development</option><option>Mobile application</option><option>UX and digital experience</option><option>Cloud and integrations</option></select>{errors.service && <small>{errors.service.message}</small>}</label>
      <label><span>Estimated budget</span><select {...register("budget")} defaultValue=""><option value="" disabled>Select range</option><option>€15k–€35k</option><option>€35k–€75k</option><option>€75k–€150k</option><option>€150k+</option></select>{errors.budget && <small>{errors.budget.message}</small>}</label>
      <label className="inquiry-form__wide"><span>Project context</span><textarea {...register("message")} rows={6} placeholder="What are you building, what needs to change, and when do you want to launch?" />{errors.message && <small>{errors.message.message}</small>}</label>
      <button className="inquiry-submit" disabled={isSubmitting} data-cursor="link">{isSubmitting ? "Sending…" : "Send project inquiry ↗"}</button>
    </form>
  );
}
