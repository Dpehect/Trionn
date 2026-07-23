"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "@/providers/motion-provider";
import { ScrollProvider } from "@/providers/scroll-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <ScrollProvider>{children}</ScrollProvider>
    </MotionProvider>
  );
}
