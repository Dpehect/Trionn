import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { Cursor } from "@/components/cursor";
import { ExperienceShell } from "@/components/experience-shell";
import { RouteCurtain } from "@/components/route-curtain";

export const metadata: Metadata = {
  title: { default: "ATELIER/X", template: "%s — ATELIER/X" },
  description: "Original cinematic digital studio experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <RouteCurtain />
        <ExperienceShell>{children}</ExperienceShell>
        <div className="noise" />
      </body>
    </html>
  );
}
