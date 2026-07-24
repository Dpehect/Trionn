"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-500", scrolled && "border-b border-black/15 bg-paper/92 backdrop-blur-md")}>
        <div className="container-shell flex h-20 items-center justify-between">
          <Link href="/" className="focus-ring flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-foreground text-xs font-bold text-background">S</span>
            <span className="text-sm font-semibold tracking-[-.03em]">Softbridge Solutions</span>
          </Link>
          <nav className="hidden items-center gap-7 xl:flex">
            {siteConfig.nav.slice(0, 5).map((item) => (
              <Link className="text-[.66rem] font-semibold uppercase tracking-[.14em] text-black/55 transition-colors hover:text-black" key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden border-b border-black pb-1 text-xs font-semibold uppercase tracking-[.1em] sm:block">Start a project</Link>
            <button aria-expanded={open} aria-label="Open menu" onClick={() => setOpen(true)} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em]">
              <span className="hidden sm:inline">Menu</span><Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }} className="fixed inset-0 z-[80] bg-foreground text-background">
            <div className="container-shell flex h-full flex-col py-6">
              <div className="flex items-center justify-between border-b border-white/20 pb-5">
                <span className="eyebrow">Softbridge / Finland</span>
                <button className="p-2" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
              </div>
              <div className="my-auto grid lg:grid-cols-2">
                {siteConfig.nav.map((item, index) => (
                  <motion.div key={item.href} initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .12 + index * .055 }}>
                    <Link onClick={() => setOpen(false)} href={item.href} className="group flex items-center justify-between border-b border-white/20 py-4 text-[clamp(2.7rem,6.2vw,6.8rem)] font-medium leading-none tracking-[-.065em] lg:mr-8">
                      <span>{item.label}</span><ArrowUpRight className="opacity-25 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between border-t border-white/20 pt-5 text-[10px] uppercase tracking-[.16em] text-white/45">
                <span>Strategy / Design / Engineering</span><span>Finland-focused / Global delivery</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
