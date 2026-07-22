import type { Metadata } from "next";
import "./globals.css";
import { Preloader } from "@/components/preloader";
import { ExperienceShell } from "@/components/experience-shell";
import { RouteCurtain } from "@/components/route-curtain";
import { ExperienceProvider } from "@/components/experience-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { QualityBadge } from "@/components/quality-badge";
import { VelocityCursor } from "@/components/velocity-cursor";

export const metadata: Metadata = {
  title: { default: "ATELIER/X", template: "%s — ATELIER/X" },
  description: "Original cinematic digital studio experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ExperienceProvider>
          <Preloader />
          <VelocityCursor />
          <RouteCurtain />
          <ScrollProgress />
          <ExperienceShell>{children}</ExperienceShell>
          <QualityBadge />
          <div className="noise" />
        </ExperienceProvider>
      </body>
    </html>
  );
}
