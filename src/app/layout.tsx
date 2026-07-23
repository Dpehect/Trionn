import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "YEG — Creative Developer", template: "%s — YEG" },
  description: "A cinematic, interaction-led creative developer portfolio.",
  applicationName: "YEG Portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "YEG — Creative Developer",
    description: "A cinematic, interaction-led creative developer portfolio.",
    siteName: "YEG Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "YEG — Creative Developer",
    description: "A cinematic, interaction-led creative developer portfolio.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
