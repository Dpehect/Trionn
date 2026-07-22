import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { features } from "@/config/phase";

export const metadata: Metadata = {
  title: { default: "Studio Freight", template: "%s — Studio Freight" },
  description: "Independent design and digital studio presenting selected work through an interactive editorial mosaic.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={features.customCursor ? "has-custom-cursor" : undefined}>
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
