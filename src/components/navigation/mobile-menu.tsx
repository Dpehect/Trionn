"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { easings } from "@/lib/animation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button type="button" className="relative z-[82] grid size-11 place-items-center rounded-full border border-white/15 bg-black/40" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-[#070707]" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease: easings.editorial }}>
            <div className="site-container flex h-full flex-col justify-end pb-10 pt-28">
              <nav className="grid gap-1">
                {siteConfig.nav.map((item, index) => (
                  <motion.a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-[clamp(2.5rem,13vw,5rem)] font-medium uppercase leading-none tracking-[-0.06em]" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + index * 0.07 }}>
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-14 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/45"><span>Helsinki</span><span>Available for new work</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
