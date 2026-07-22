"use client";
import { useState } from "react";

export function UpdatePasswordForm() {
  const [message,setMessage]=useState("");
  async function submit(formData:FormData){
    const password=String(formData.get("password")||"");
    const response=await fetch("/api/auth/update-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
    setMessage(response.ok?"Password updated.":"Password update failed.");
  }
  return <form action={submit} className="w-full max-w-xl border hairline p-8">
    <p className="eyebrow">Account security</p>
    <h1 className="display-lg mt-6">NEW PASSWORD</h1>
    <input name="password" type="password" minLength={12} required className="mt-10 w-full border-b hairline bg-transparent py-4" />
    {message && <p className="mt-4 text-sm">{message}</p>}
    <button className="btn-primary mt-8">Update password</button>
  </form>
}
