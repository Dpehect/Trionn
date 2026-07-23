"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.75 }}
    >
      {children}
    </MotionConfig>
  );
}
