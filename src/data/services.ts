import type { LucideIcon } from "lucide-react";
import { Bot, CloudCog, Code2, Layers3, Palette, Smartphone } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
  icon: LucideIcon;
}

export const services: ServiceItem[] = [
  {
    id: "01",
    title: "Custom software development",
    summary: "Business-critical platforms, internal systems and APIs engineered for reliability and long-term scale.",
    capabilities: ["Product architecture", "Web platforms", "API ecosystems"],
    icon: Code2,
  },
  {
    id: "02",
    title: "AI automation and agents",
    summary: "Applied AI systems that remove repetitive work, accelerate decisions and connect fragmented operations.",
    capabilities: ["AI agents", "Workflow automation", "Knowledge systems"],
    icon: Bot,
  },
  {
    id: "03",
    title: "SaaS product development",
    summary: "From product strategy to production-ready multi-tenant software with measurable commercial outcomes.",
    capabilities: ["MVP to scale", "Subscription systems", "Product analytics"],
    icon: Layers3,
  },
  {
    id: "04",
    title: "Mobile applications",
    summary: "Native-quality mobile products with focused user journeys, robust architecture and refined interaction.",
    capabilities: ["iOS and Android", "Flutter", "Mobile product design"],
    icon: Smartphone,
  },
  {
    id: "05",
    title: "UI/UX and digital experiences",
    summary: "High-performance interfaces where Nordic clarity meets expressive motion and conversion-focused design.",
    capabilities: ["Product design", "Design systems", "Creative development"],
    icon: Palette,
  },
  {
    id: "06",
    title: "Cloud and integrations",
    summary: "Secure infrastructure, system integrations and deployment pipelines built for operational confidence.",
    capabilities: ["Cloud architecture", "Third-party integrations", "DevOps"],
    icon: CloudCog,
  },
];
