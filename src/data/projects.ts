export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  year: string;
  sector: string;
  services: string[];
  stack: string[];
  summary: string;
  challenge: string;
  solution: string;
  outcomes: { value: string; label: string }[];
  palette: [string, string, string];
};

export const projects: Project[] = [
  {
    slug: "northstar-ai",
    index: "01",
    title: "Northstar AI",
    client: "Nordic logistics platform",
    year: "2026",
    sector: "AI / Logistics",
    services: ["Product strategy", "AI engineering", "Platform development"],
    stack: ["Next.js", "Python", "OpenAI", "PostgreSQL"],
    summary: "An operational intelligence layer that turns fragmented shipment data into fast, explainable decisions.",
    challenge: "Teams were switching between disconnected dashboards and spreadsheets while high-impact exceptions were discovered too late.",
    solution: "We designed a single decision workspace with predictive alerts, explainable recommendations and role-based operational views.",
    outcomes: [
      { value: "42%", label: "faster exception handling" },
      { value: "3.1x", label: "more automated decisions" },
      { value: "99.95%", label: "platform availability" },
    ],
    palette: ["#b7ff4a", "#22310f", "#050505"],
  },
  {
    slug: "aurora-commerce",
    index: "02",
    title: "Aurora Commerce",
    client: "Finnish design retailer",
    year: "2026",
    sector: "Retail / Commerce",
    services: ["Experience design", "Commerce engineering", "Motion direction"],
    stack: ["Next.js", "Shopify", "GSAP", "Vercel"],
    summary: "A high-performance editorial commerce experience built for international growth without losing Nordic restraint.",
    challenge: "The previous store was slow, rigid and unable to express the product quality that defined the physical retail experience.",
    solution: "We built a composable storefront with cinematic product storytelling, fast navigation and a flexible content system.",
    outcomes: [
      { value: "+31%", label: "conversion rate" },
      { value: "1.2s", label: "median LCP" },
      { value: "+46%", label: "international revenue" },
    ],
    palette: ["#d9d5ff", "#3a355f", "#08070c"],
  },
  {
    slug: "helix-health",
    index: "03",
    title: "Helix Health",
    client: "Digital healthcare company",
    year: "2025",
    sector: "HealthTech",
    services: ["UX architecture", "Web application", "Design system"],
    stack: ["React", "TypeScript", "Node.js", "Azure"],
    summary: "A clinical workflow platform that makes complex patient journeys clearer for professionals and patients.",
    challenge: "Legacy workflows created duplicate work, weak visibility and inconsistent communication across care teams.",
    solution: "We consolidated the journey into a modular platform with accessible interfaces, live status and secure collaboration.",
    outcomes: [
      { value: "-37%", label: "administrative time" },
      { value: "87", label: "design-system components" },
      { value: "AA", label: "accessibility standard" },
    ],
    palette: ["#72e7ff", "#123842", "#05090a"],
  },
  {
    slug: "sisu-mobile",
    index: "04",
    title: "Sisu Mobile",
    client: "Consumer finance startup",
    year: "2025",
    sector: "FinTech / Mobile",
    services: ["Mobile product", "Brand experience", "Backend integration"],
    stack: ["Flutter", "Kotlin", "Firebase", "AWS"],
    summary: "A confident mobile finance experience designed around clarity, control and everyday momentum.",
    challenge: "The product needed to communicate complex financial states without anxiety, while supporting rapid feature expansion.",
    solution: "We created a modular mobile system with clear financial storytelling, secure flows and an extensible interaction language.",
    outcomes: [
      { value: "4.8", label: "store rating" },
      { value: "+58%", label: "weekly engagement" },
      { value: "-24%", label: "support requests" },
    ],
    palette: ["#ff835f", "#542117", "#090504"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
