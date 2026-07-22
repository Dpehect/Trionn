"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useExperienceStore } from "@/store/experience-store";

export function VelocityCursor() {
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const x = useSpring(useMotionValue(-100), { stiffness: 450, damping: 34 });
  const y = useSpring(useMotionValue(-100), { stiffness: 450, damping: 34 });
  const velocity = useMotionValue(0);
  const scaleX = useTransform(velocity, [0, 80], [1, 1.8]);

  useEffect(() => {
    if (reducedMotion) return;

    let previousX = 0;
    let previousTime = performance.now();

    const move = (event: PointerEvent) => {
      const now = performance.now();
      const delta = Math.max(1, now - previousTime);
      const speed = Math.min(80, Math.abs(event.clientX - previousX) / delta * 16);

      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
      velocity.set(speed);

      previousX = event.clientX;
      previousTime = now;
    };

    const settle = window.setInterval(() => {
      velocity.set(0);
    }, 120);

    window.addEventListener("pointermove", move);

    return () => {
      window.clearInterval(settle);
      window.removeEventListener("pointermove", move);
    };
  }, [reducedMotion, velocity, x, y]);

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y, scaleX }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-5 w-5 origin-center rounded-full border border-[var(--accent-primary)] mix-blend-difference md:block"
    />
  );
}
