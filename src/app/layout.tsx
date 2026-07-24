import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionShell } from "@/components/motion-shell";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Softbridge — Senior product engineering",
    template: "%s — Softbridge",
  },
  description: site.description,
  keywords: [
    "product engineering studio Helsinki",
    "software development Finland",
    "AI product studio Helsinki",
    "senior software team Europe",
    "digital product development",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/logo-mark.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Softbridge — software that works better" }],
    title: "Softbridge — Senior product engineering",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#062a1f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: site.name,
        url: site.url,
        areaServed: ["Helsinki", "Finland", "Nordic countries", "Europe"],
        serviceType: ["Product engineering", "Software development", "AI systems", "Product design"],
        provider: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionShell>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionShell>
      </body>
    </html>
  );
}
