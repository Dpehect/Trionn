import type { Metadata, Viewport } from "next";
import "./globals.css";
import { COMPANY, primaryKeywords, SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Software Company Finland | SoftBridge Solutions",
    template: "%s | SoftBridge Solutions",
  },
  description: COMPANY.description,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: SITE_URL }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  category: "technology",
  keywords: primaryKeywords,
  alternates: {
    canonical: "/",
    languages: {
      "en-FI": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: COMPANY.locale,
    url: SITE_URL,
    siteName: COMPANY.name,
    title: "Software Company Finland | SoftBridge Solutions",
    description: COMPANY.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SoftBridge Solutions — software and AI development in Finland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Company Finland | SoftBridge Solutions",
    description: COMPANY.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-FI">
      <body>{children}</body>
    </html>
  );
}
