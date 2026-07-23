"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site-data";

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav className="nav" aria-label="Primary navigation" data-reveal>
      {navigation.map((item, index) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? "is-active" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
