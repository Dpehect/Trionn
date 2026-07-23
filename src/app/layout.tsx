import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trionn-vert.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Yunus Emre Gürlek — Creative Developer", template: "%s — Yunus Emre Gürlek" },
  description: "Creative developer focused on interaction, motion and three-dimensional digital experiences.",
  applicationName: "Yunus Emre Gürlek Portfolio",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Yunus Emre Gürlek — Creative Developer", description: "Creative development, motion and 3D portfolio.", siteName: "Yunus Emre Gürlek" },
  twitter: { card: "summary_large_image", title: "Yunus Emre Gürlek — Creative Developer", description: "Creative development, motion and 3D portfolio." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}
