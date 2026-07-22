"use client";
import { FormEvent } from "react";
import { toast } from "sonner";
export function ContactForm() {
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); event.currentTarget.reset(); toast.success("Message prepared", { description: "The demo form is ready for your email or CRM endpoint." }); };
  return <form className="contact-form" onSubmit={submit}><label>Name<input name="name" required /></label><label>Email<input type="email" name="email" required /></label><label>Mission<textarea name="message" required /></label><button type="submit">Send enquiry</button></form>;
}
