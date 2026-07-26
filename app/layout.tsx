import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftBridge Solutions Finland | AI & Software Development",
  description: "SoftBridge Solutions Finland provides AI software development, custom software, web applications, mobile products, cloud platforms and enterprise digital solutions for Finland, the Nordics and Europe.",
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
