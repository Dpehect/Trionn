export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  outcomes: string[];
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "digital-products",
    index: "01",
    title: "Digital products",
    short: "Product strategy and interfaces built around real customer behaviour.",
    description: "We turn uncertain product opportunities into coherent systems: research, positioning, user journeys, interaction design and implementation decisions shaped together.",
    outcomes: ["Clear product direction", "Validated customer journeys", "Scalable interface system"],
    capabilities: ["Discovery", "Product strategy", "UX research", "Interface design", "Design systems"]
  },
  {
    slug: "web-platforms",
    index: "02",
    title: "Web platforms",
    short: "High-performance brand and commerce platforms where motion serves meaning.",
    description: "We create expressive websites without sacrificing speed, accessibility or maintainability. Every interaction has a communication purpose and a performance budget.",
    outcomes: ["Distinctive brand experience", "Fast production platform", "Measurable conversion paths"],
    capabilities: ["Creative direction", "Next.js development", "Motion design", "CMS architecture", "Technical SEO"]
  },
  {
    slug: "ai-systems",
    index: "03",
    title: "AI systems",
    short: "Practical automation integrated into accountable business workflows.",
    description: "We identify useful automation opportunities, design human review points and build interfaces that make AI outputs understandable, controllable and operationally valuable.",
    outcomes: ["Reduced repetitive work", "Human-supervised automation", "Traceable decision flows"],
    capabilities: ["Workflow mapping", "AI product design", "Agent systems", "Data integration", "Evaluation"]
  },
  {
    slug: "growth-foundations",
    index: "04",
    title: "Growth foundations",
    short: "Analytics, SEO and experimentation designed into the product from day one.",
    description: "Growth becomes more reliable when measurement, discoverability and iteration are embedded in the platform rather than added after launch.",
    outcomes: ["Search-ready architecture", "Decision-grade analytics", "Experimentation roadmap"],
    capabilities: ["Technical SEO", "Analytics strategy", "Conversion design", "Content structure", "Performance optimisation"]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
