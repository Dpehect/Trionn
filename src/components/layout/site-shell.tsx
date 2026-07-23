import type { ReactNode } from "react";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SiteLoader } from "@/components/loaders/site-loader";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/transitions/page-transition";
import { VelocityIndicator } from "@/components/animation/velocity-indicator";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteLoader />
      <CustomCursor />
      <VelocityIndicator />
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
