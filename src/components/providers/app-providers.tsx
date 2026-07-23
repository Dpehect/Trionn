"use client";

import type { ReactNode } from "react";
import { MotionProvider } from "./motion-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionProvider>
  );
}
