"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { easings } from "@/lib/animation";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: easings.soft }}>
      {children}
    </MotionConfig>
  );
}
