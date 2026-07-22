"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SupabaseSignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);

    await fetch("/api/auth/sign-out", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={signOut}
      className="btn-secondary disabled:opacity-50"
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
