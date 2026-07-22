"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticLink({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  return <motion.button ref={ref} style={{x,y}}
    onMouseMove={(e) => {
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      x.set((e.clientX-r.left-r.width/2)*.25); y.set((e.clientY-r.top-r.height/2)*.25);
    }}
    onMouseLeave={() => { x.set(0); y.set(0); }}
    className="rounded-full bg-[var(--acid)] text-black px-7 py-4 text-xs uppercase tracking-[.16em]">
      {children}
  </motion.button>;
}
