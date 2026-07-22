"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="container-x grid min-h-screen place-items-center py-20">
      <form action={submit} className="w-full max-w-xl border hairline p-8 md:p-12">
        <p className="eyebrow">Secure access</p>
        <h1 className="mt-6 text-6xl tracking-[-.07em] md:text-8xl">LOGIN</h1>

        <div className="mt-12 grid gap-5">
          <input name="email" type="email" required placeholder="Email" className="border-b hairline bg-transparent py-4 outline-none" />
          <input name="password" type="password" required placeholder="Password" className="border-b hairline bg-transparent py-4 outline-none" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="mt-4 rounded-full bg-[var(--acid)] px-7 py-4 text-xs uppercase tracking-[.16em] text-black disabled:opacity-50">
            {loading ? "Signing in…" : "Enter control room"}
          </button>
        </div>
      </form>
    </main>
  );
}
