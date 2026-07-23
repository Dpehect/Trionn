"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 500, damping: 35, mass: 0.18 });
  const y = useSpring(pointerY, { stiffness: 500, damping: 35, mass: 0.18 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: MouseEvent) => {
      pointerX.set(event.clientX - 10);
      pointerY.set(event.clientY - 10);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a,button,[data-cursor]")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-5 rounded-full border border-white/70 mix-blend-difference md:block"
      style={{ x, y }}
      animate={{ scale: active ? 2.2 : 1, backgroundColor: active ? "rgba(255,255,255,.16)" : "rgba(255,255,255,0)" }}
    />
  );
}
