"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useExperienceStore } from "@/store/experience-store";

export function SiteHeader() {
  const pathname = usePathname();
  const setMenu = useExperienceStore((state) => state.setMenu);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-x flex h-20 items-center justify-between border-b hairline bg-[color:rgba(8,9,8,.52)] backdrop-blur-xl">
        <Link href="/" className="text-2xl font-black tracking-[-.06em]">
          ATELIER/X
        </Link>

        <nav className="hidden gap-8 text-xs uppercase tracking-[.16em] md:flex">
          {[
            ["/work", "Work"],
            ["/studio", "Studio"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={
                pathname.startsWith(href)
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenu(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          className="grid h-11 w-11 place-items-center rounded-full border hairline transition-transform hover:scale-105"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
