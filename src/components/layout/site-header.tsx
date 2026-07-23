"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/cursor/magnetic";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > previous && current > 120);
      previous = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="site-container mt-4 flex h-16 items-center justify-between rounded-full border border-white/[0.09] bg-black/50 px-5 backdrop-blur-xl sm:px-6">
        <Link href="/" data-cursor="link" className="relative z-10 font-semibold tracking-[-0.045em] text-white">
          SOFTBRIDGE<span className="text-accent">.</span><span className="ml-2 text-[9px] font-normal uppercase tracking-[0.18em] text-white/35">Finland</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <Magnetic key={item.href} strength={0.18}>
              <a href={item.href} data-cursor="link" className="nav-link text-[10px] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white">{item.label}</a>
            </Magnetic>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Magnetic className="hidden sm:block">
            <a href="/contact" data-cursor="link" className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent hover:text-black">Start a project</a>
          </Magnetic>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
