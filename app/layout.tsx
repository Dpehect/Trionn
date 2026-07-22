import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA / Heavyweight Hoodie",
  description:
    "An immersive 3D fashion product showcase built with Next.js, React Three Fiber, GSAP and Lenis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
