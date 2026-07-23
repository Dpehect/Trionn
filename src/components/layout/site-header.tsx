"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";

const links = [
  ["Services", "/#services"],
  ["Work", "/projects"],
  ["Studio", "/#about"],
  ["Careers", "/#careers"],
];

export function SiteHeader() {
  return (
    <header className="creative-header">
      <Link href="/" className="brand-lockup">
        <span className="brand-mark">S</span>
        <span><strong>Softbridge</strong><small>Solutions Finland</small></span>
      </Link>
      <nav className="creative-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Magnetic key={label} strength={0.12}><Link href={href}>{label}</Link></Magnetic>
        ))}
      </nav>
      <Magnetic strength={0.14}>
        <Link href="/#contact" className="header-cta">Start a project <ArrowUpRight size={15} /></Link>
      </Magnetic>
    </header>
  );
}
