"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

export function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.45 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.45 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}
