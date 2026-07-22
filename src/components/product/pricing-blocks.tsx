"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useProductStore } from "@/store/use-product-store";

const tiers = [
  {
    name: "Core",
    price: "$24",
    cadence: "per member / month",
    description: "For small product teams connecting evidence, flows and interface decisions.",
    features: ["Live product map", "Interface state system", "Unlimited viewers", "Decision history"],
  },
  {
    name: "Scale",
    price: "$46",
    cadence: "per member / month",
    description: "For cross-functional teams operating product systems and launch readiness together.",
    features: ["Everything in Core", "Launch rooms", "AI product intelligence", "Advanced permissions", "Priority onboarding"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual workspace",
    description: "For organizations requiring controlled rollout, governance and dedicated support.",
    features: ["Everything in Scale", "SAML / SSO", "Audit exports", "Custom retention", "Dedicated product partner"],
  },
];

export function PricingBlocks({ compact = false }: { compact?: boolean }) {
  const setRequestOpen = useProductStore((state) => state.setRequestOpen);
  return (
    <div className={`pricing-grid ${compact ? "is-compact" : ""}`}>
      {tiers.map((tier, index) => (
        <article className={`pricing-card ${tier.featured ? "is-featured" : ""}`} key={tier.name}>
          <div className="pricing-card-index">{String(index + 1).padStart(2, "0")} / {tier.name.toUpperCase()}</div>
          <div className="pricing-price"><strong>{tier.price}</strong><span>{tier.cadence}</span></div>
          <p>{tier.description}</p>
          <ul>{tier.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
          <button className={`button ${tier.featured ? "button-primary" : "button-secondary"}`} type="button" onClick={() => setRequestOpen(true)}>Request access <ArrowUpRight size={17} /></button>
        </article>
      ))}
    </div>
  );
}
