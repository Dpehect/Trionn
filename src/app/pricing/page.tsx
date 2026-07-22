import type { Metadata } from "next";
import { ContentShell } from "@/components/navigation/content-shell";
import { PricingBlocks } from "@/components/product/pricing-blocks";
import { FaqSection } from "@/components/product/faq-section";

export const metadata: Metadata = { title: "Pricing", description: "Trionn workspace plans for product teams." };

export default function PricingPage() {
  return <ContentShell><main className="content-page"><header className="content-hero"><span>PRICING / 2026</span><h1>One product system.<br /><em>Three ways to scale.</em></h1><p>Every plan includes the live product map, interface context and structured decision history.</p></header><PricingBlocks /><FaqSection /></main></ContentShell>;
}
