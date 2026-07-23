import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://softbridge.fi"),
  title: "Softbridge — Product Engineering Studio in Helsinki",
  description: "Senior product engineering, AI systems and scalable software for ambitious teams in Finland and Europe. Helsinki strategy, Türkiye engineering delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Softbridge — Senior Product Engineering",
    description: "Independent product engineering studio serving Finland and Europe.",
    url: "https://softbridge.fi",
    siteName: "Softbridge",
    locale: "en_FI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Softbridge — Senior Product Engineering",
    description: "Senior teams for software that has to work."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-FI" className={`${geist.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
