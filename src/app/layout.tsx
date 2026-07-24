import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { SiteShell } from "@/components/layout/site-shell";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Softbridge Solutions — Digital Agency Finland", template: "%s — Softbridge Solutions" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { title: "Softbridge Solutions", description: siteConfig.description, type: "website", locale: "en_FI", url: siteConfig.url, siteName: siteConfig.name, images: [{ url: "/og-softbridge.svg", width: 1200, height: 630, alt: "Softbridge Solutions" }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/og-softbridge.svg"] },
  icons: { icon: "/softbridge-mark.svg" },
  robots: { index: true, follow: true },
};

const organisationJsonLd = { "@context": "https://schema.org", "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.url, email: siteConfig.email, areaServed: { "@type": "Country", name: "Finland" }, description: siteConfig.description };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${geist.variable} ${mono.variable}`}><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }} /><SiteShell>{children}</SiteShell></body></html>;
}
