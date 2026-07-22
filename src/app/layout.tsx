import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://trionn.example"),
  title: { default: "Trionn — Product Operating System", template: "%s — Trionn" },
  description: "An AI-native product operating system connecting evidence, interface logic and launch readiness.",
  openGraph: {
    title: "Trionn — Product Operating System",
    description: "From first signal to final release, keep the product in one coherent system.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#efff47" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Toaster position="bottom-center" closeButton theme="dark" />
      </body>
    </html>
  );
}
