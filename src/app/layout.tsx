import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { CustomCursor } from "@/components/motion/custom-cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://softbridge.fi"),
  title: "Softbridge Solutions Finland — Digital Products & AI",
  description: "Premium software studio building digital products, AI automation and high-performance platforms for companies in Finland and Europe.",
  openGraph: {
    title: "Softbridge Solutions Finland",
    description: "Digital products, AI automation and premium software experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <AppProviders>
          {children}
          <CustomCursor />
        </AppProviders>
      </body>
    </html>
  );
}
