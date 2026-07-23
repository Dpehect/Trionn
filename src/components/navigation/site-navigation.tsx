"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site-data";

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav className="nav dark-nav" aria-label="Primary navigation" data-reveal>
      {navigation.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return <Link key={item.href} href={item.href} className={active ? "is-active" : ""}>{item.label}</Link>;
      })}
    </nav>
  );
}
