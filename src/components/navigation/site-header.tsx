"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "@/store/use-product-store";

const links = [
  ["Product", "/#product"],
  ["Workflow", "/#workflow"],
  ["Systems", "/#systems"],
  ["Pricing", "/pricing"],
  ["Changelog", "/changelog"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const setRequestOpen = useProductStore((state) => state.setRequestOpen);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Trionn home">
        <span className="wordmark-symbol">T/</span>
        <span>TRIONN</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>

      <button className="header-cta" type="button" onClick={() => setRequestOpen(true)}>
        Request access <span aria-hidden>↗</span>
      </button>

      <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map(([label, href]) => <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          <button type="button" onClick={() => { setMenuOpen(false); setRequestOpen(true); }}>Request access</button>
        </div>
      )}
    </header>
  );
}
