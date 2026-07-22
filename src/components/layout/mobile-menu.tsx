"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { useUIStore } from "@/store/ui-store";
export function MobileMenu() {
  const open = useUIStore((s) => s.menuOpen); const close = useUIStore((s) => s.closeMenu);
  return <AnimatePresence>{open ? <motion.div className="fixed inset-0 z-50 bg-[var(--foreground)] text-[var(--background)]" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .65, ease: [0.76,0,0.24,1] }}>
    <div className="container-shell flex h-16 items-center justify-between"><span className="text-xl tracking-[.18em]">SABLE</span><button aria-label="Close menu" onClick={close}><X/></button></div>
    <nav className="container-shell mt-16 grid gap-5">{siteConfig.navigation.map((item, index) => <motion.div key={item.href} initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:.25+index*.06 }}><Link onClick={close} href={item.href} className="headline">{item.label}</Link></motion.div>)}</nav>
  </motion.div> : null}</AnimatePresence>;
}
