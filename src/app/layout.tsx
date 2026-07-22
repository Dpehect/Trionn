import type { Metadata } from "next";
import "./globals.css";
import { Preloader } from "@/components/preloader";
import { ExperienceShell } from "@/components/experience-shell";
import { RouteCurtain } from "@/components/route-curtain";
import { ExperienceProvider } from "@/components/experience-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { QualityBadge } from "@/components/quality-badge";
import { VelocityCursor } from "@/components/velocity-cursor";
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer";
import { StructuredData } from "@/components/structured-data";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: "ATELIER/X", template: "%s — ATELIER/X" },
  description: "Independent digital studio combining strategy, motion and creative technology.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: base,
    title: "ATELIER/X",
    description: "Independent digital studio combining strategy, motion and creative technology.",
    siteName: "ATELIER/X",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATELIER/X",
    description: "Independent digital studio combining strategy, motion and creative technology.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <ExperienceProvider>
          <AccessibilityAnnouncer />
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
