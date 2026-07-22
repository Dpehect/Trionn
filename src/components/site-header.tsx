"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useExperienceStore } from "@/store/experience-store";

export function SiteHeader() {
  const setMenu = useExperienceStore((state) => state.setMenu);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x flex h-20 items-center justify-between border-b hairline bg-[var(--bg)]/45 backdrop-blur-md">
        <Link href="/" className="text-2xl font-black tracking-[-.06em]">ATELIER/X</Link>
        <nav className="hidden gap-8 text-xs uppercase tracking-[.16em] text-[var(--muted)] md:flex">
          <Link href="/work">Work</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <button onClick={() => setMenu(true)} aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full border hairline">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
