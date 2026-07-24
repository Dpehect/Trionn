import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: { default: "Softbridge — Product Engineering Studio", template: "%s | Softbridge" },
  description: "Senior product, software and AI teams for systems that have to work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  );
}
