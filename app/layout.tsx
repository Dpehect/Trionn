import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Software Company Finland | SoftBridge Solutions",
    template: "%s | SoftBridge Solutions",
  },
  description:
    "SoftBridge Solutions builds AI software, custom platforms, SaaS products, web applications and mobile products for Finland, the Nordics and Europe.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://softbridge-solutions.com",
  ),
  robots: {
    index: true,
    follow: true,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-FI">
      <body>{children}</body>
    </html>
  );
}
