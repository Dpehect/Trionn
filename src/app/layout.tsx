import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://trionn.example"),
  title: { default: "TRIONN — Independent Clothing & Footwear", template: "%s — TRIONN" },
  description: "Independent clothing, footwear and limited editorial collections from Istanbul.",
  openGraph: { title: "TRIONN — Independent Clothing & Footwear", description: "Small-run clothing and footwear objects built around form, surface and movement.", type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#dfff38" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body><SmoothScrollProvider>{children}</SmoothScrollProvider><Toaster position="bottom-center" closeButton theme="dark" /></body></html>;
}
