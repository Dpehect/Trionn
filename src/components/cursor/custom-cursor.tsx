"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const size = useMotionValue(14);
  const label = useRef("");
  const springX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.25 });
  const springSize = useSpring(size, { stiffness: 420, damping: 30 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      label.current = target.dataset.cursor ?? "";
      size.set(target.dataset.cursor === "view" ? 84 : 48);
    };
    const out = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      label.current = "";
      size.set(14);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [size, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-[9px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md mix-blend-difference md:flex"
      style={{ x: springX, y: springY, width: springSize, height: springSize }}
    >
      {label.current}
    </motion.div>
  );
}
