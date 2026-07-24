import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftBridge Solutions Finland",
  description: "SoftBridge Solutions Finland — software, AI and digital product engineering for European businesses",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
