"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Magnetic } from "@/components/motion/magnetic";

gsap.registerPlugin(Flip);

const links = [
  ["Services", "/#services"],
  ["Work", "/projects"],
  ["Studio", "/#about"],
  ["Careers", "/#careers"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeHash, setActiveHash] = useState("");


  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setCompact(current > 40);
      if (!headerRef.current || open) return;
      gsap.to(headerRef.current, {
        y: current > last && current > 180 ? -120 : 0,
        duration: 0.45,
        ease: "power3.out",
      });
      last = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useGSAP(() => {
    if (!menuRef.current) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(menuRef.current, { display: "grid" });
      gsap.fromTo(menuRef.current, { clipPath: "circle(0% at 92% 6%)" }, { clipPath: "circle(145% at 92% 6%)", duration: 0.85, ease: "power4.inOut" });
      gsap.fromTo("[data-mobile-link]", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.22, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, { clipPath: "circle(0% at 92% 6%)", duration: 0.55, ease: "power3.inOut", onComplete: () => {
          gsap.set(menuRef.current, { display: "none" });
        } });
    }
  }, [open]);

  return (
    <>
      <header ref={headerRef} className={`creative-header ${compact ? "is-compact" : ""}`}>
        <Link href="/" className="brand-lockup" aria-label="Softbridge Solutions Finland home">
          <span className="brand-mark">S</span>
          <span><strong>Softbridge</strong><small>Solutions Finland</small></span>
        </Link>
        <nav className="creative-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Magnetic key={label} strength={0.12}>
              <Link className={(href.startsWith("/#") ? activeHash === href.slice(1) : pathname === href) ? "is-active" : ""} href={href}>{label}</Link>
            </Magnetic>
          ))}
        </nav>
        <div className="header-actions">
          <Magnetic strength={0.14}>
            <Link href="/#contact" className="header-cta">Start a project <ArrowUpRight size={15} /></Link>
          </Magnetic>
          <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu__wash" />
        <nav>
          {links.map(([label, href], index) => (
            <Link data-mobile-link key={label} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{label}<ArrowUpRight />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <span>Helsinki / EET</span><span>Available for selected projects</span>
        </div>
      </div>
    </>
  );
}
