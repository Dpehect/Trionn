"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SupabaseLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Invalid credentials or authentication is not configured.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form action={submit} className="w-full max-w-xl border hairline p-8 md:p-12">
      <p className="eyebrow">Secure access</p>
      <h1 className="display-lg mt-6">LOGIN</h1>

      <div className="mt-12 grid gap-5">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="border-b hairline bg-transparent py-4 outline-none"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="border-b hairline bg-transparent py-4 outline-none"
        />
        {error && <p className="text-sm text-[var(--status-error)]">{error}</p>}
        <button
          disabled={loading}
          className="btn-primary mt-4 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Enter control room"}
        </button>
      </div>
    </form>
  );
}
