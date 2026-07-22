import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { PageShell } from "@/components/motion/page-shell";
import { siteConfig } from "@/config/site";
import { SkipLink } from "@/components/ui/skip-link";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "SABLE — Independent Clothing", template: "%s — SABLE" },
  description: siteConfig.description,
  openGraph: { title: "SABLE", description: siteConfig.description, type: "website", images: ["/editorial/hero.svg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers><SkipLink/><Header/><div id="main-content"><PageShell>{children}</PageShell></div><Footer/></Providers></body></html>;
}
