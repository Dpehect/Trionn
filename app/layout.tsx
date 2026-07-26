import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftBridge Solutions",
  description: "Software and AI development for Finland and Europe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
