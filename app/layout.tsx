import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftBridge Solutions Finland | AI, Software & Digital Products",
  description: "SoftBridge Solutions Finland delivers AI software development, enterprise platforms, cloud applications, web and mobile products for companies across Finland, the Nordics and Europe.",
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
