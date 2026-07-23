import type { Metadata } from "next";
import Link from "next/link";

import { CareersSection } from "@/components/careers/careers-section";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Careers — Softbridge Solutions Finland",
  description:
    "Join Softbridge Solutions Finland across engineering, product design and AI automation roles.",
};

export default function CareersPage() {
  return (
    <main className="standalone-page">
      <header className="standalone-nav">
        <Link href="/">Softbridge Finland</Link>
        <Link href="/">Back to studio</Link>
      </header>
      <CareersSection />
      <SiteFooter />
    </main>
  );
}
