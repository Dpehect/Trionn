"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easings } from "@/lib/animation";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 8% 0)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.95, ease: easings.soft, delay: 1.65 }}
    >
      {children}
    </motion.div>
  );
}
