"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border hairline px-5 py-3 text-xs uppercase tracking-[.16em]"
    >
      Sign out
    </button>
  );
}
