"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useScrollStore } from "@/providers/scroll-provider";

export function VelocityIndicator() {
  const velocity = useScrollStore((state) => state.velocity);
  const scaleX = useSpring(0, { stiffness: 130, damping: 24, mass: 0.3 });

  useEffect(() => {
    scaleX.set(Math.min(Math.abs(velocity) / 14, 1));
  }, [scaleX, velocity]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-white/5">
      <motion.div className="h-full origin-left bg-accent" style={{ scaleX }} />
    </div>
  );
}
