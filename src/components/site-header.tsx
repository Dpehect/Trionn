"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const links = [
  ["Services", "/services"],
  ["Work", "/work"],
  ["Studio", "/studio"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[120] px-2.5 pt-2.5 md:px-5 md:pt-4">
      <motion.div
        className="absolute left-5 right-5 top-2.5 h-[3px] origin-left rounded-full bg-lime md:left-10 md:right-10 md:top-4"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 38 }}
        className={`header-shell mx-auto flex max-w-[1500px] items-center justify-between rounded-2xl px-4 md:px-5 ${compact ? "h-[58px]" : "h-[68px]"}`}
      >
        <Link href="/" className="relative z-10 text-[1.18rem] font-black tracking-[-0.06em]">
          Softbridge
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`text-[0.78rem] font-bold transition-opacity hover:opacity-60 ${pathname === href ? "opacity-100" : "opacity-75"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="mr-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-forest/55">EN · EET</span>
          <Link href="/work" className="magnetic-button bg-lime px-4 py-2 text-forest">See our work</Link>
          <Link href="/contact" className="magnetic-button bg-forest px-4 py-2 text-white">Start a project</Link>
        </div>

        <button
          type="button"
          className="relative z-10 grid size-10 place-items-center rounded-full bg-forest text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-forest px-5 pb-8 pt-28 text-white lg:hidden"
          >
            <nav className="flex h-full flex-col justify-between">
              <div>
                {links.map(([label, href], index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + index * 0.06 }}
                    className="border-b border-white/20 py-4"
                  >
                    <Link href={href} className="text-5xl font-black tracking-[-0.06em]">{label}</Link>
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-3">
                <Link href="/contact" className="magnetic-button button-lime w-full">Start a project</Link>
                <p className="text-sm text-white/50">Helsinki strategy · Türkiye delivery</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
