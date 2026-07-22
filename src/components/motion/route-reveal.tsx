"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { phaseFeatures } from "@/config/phase";

export function RouteReveal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (!phaseFeatures.conversionSystem) return children;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
