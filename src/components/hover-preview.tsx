"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function HoverPreview({ active, accent }: { active: boolean; accent: string }) {
  const x = useSpring(useMotionValue(0), { stiffness:180, damping:22 });
  const y = useSpring(useMotionValue(0), { stiffness:180, damping:22 });

  useEffect(() => {
    const move = (e: PointerEvent) => { x.set(e.clientX - 150); y.set(e.clientY - 100); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x,y]);

  return (
    <motion.div
      aria-hidden
      style={{ x,y, background:`radial-gradient(circle,${accent},#111 70%)` }}
      animate={{ opacity:active ? 1 : 0, scale:active ? 1 : .85 }}
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-52 w-72 rounded-[var(--radius-md)] border hairline md:block"
    />
  );
}
