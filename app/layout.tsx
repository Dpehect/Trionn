import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { FinnishTranslationLayer } from "@/components/finnish-translation-layer";
import "./globals.css";

const englishMetadata: Metadata = {
  title: {
    default: "Software Company Finland | SoftBridge Solutions",
    template: "%s | SoftBridge Solutions",
  },
  description:
    "SoftBridge Solutions builds AI software, custom platforms, SaaS products, web applications and mobile products for Finland, the Nordics and Europe.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://trionn-vert.vercel.app",
  ),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      "en-FI": "/",
      fi: "/fi",
    },
  },
};

const finnishMetadata: Metadata = {
  title: {
    default: "Ohjelmistoyritys Suomessa | SoftBridge Solutions",
    template: "%s | SoftBridge Solutions",
  },
  description:
    "SoftBridge Solutions kehittää tekoälyohjelmistoja, räätälöityjä alustoja, SaaS-tuotteita, verkkosovelluksia ja mobiilituotteita Suomeen, Pohjoismaihin ja Eurooppaan.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://trionn-vert.vercel.app",
  ),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/fi",
    languages: {
      "en-FI": "/",
      fi: "/fi",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const locale = headerStore.get("x-softbridge-locale");

  return locale === "fi" ? finnishMetadata : englishMetadata;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1117",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const locale = headerStore.get("x-softbridge-locale");
  const language = locale === "fi" ? "fi" : "en-FI";

  return (
    <html lang={language} suppressHydrationWarning>
      <body>
        <FinnishTranslationLayer />
        {children}
      </body>
    </html>
  );
}
