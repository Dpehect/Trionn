export type ProjectTone = "aurora" | "ice" | "ember";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  services: string[];
  tone: ProjectTone;
  location: string;
  quote: string;
};

export const projects: Project[] = [
  {
    slug: "northstar",
    title: "Northstar",
    client: "Northstar Mobility",
    category: "Digital product platform",
    year: "2026",
    summary: "A calmer operating layer for a fast-growing Nordic mobility company.",
    challenge: "Northstar's teams were working across disconnected tools, fragmented customer journeys and inconsistent brand touchpoints.",
    solution: "We shaped one product language across the public platform, customer portal and internal operations. The system pairs editorial storytelling with a modular interface architecture.",
    impact: ["Unified customer and operations experience", "Reusable product design system", "Performance-first publishing foundation"],
    services: ["Product strategy", "UX/UI design", "Web engineering", "Motion system"],
    tone: "aurora",
    location: "Helsinki, Finland",
    quote: "Softbridge made a complex platform feel inevitable and clear."
  },
  {
    slug: "sisu-systems",
    title: "Sisu Systems",
    client: "Sisu Systems",
    category: "AI operations",
    year: "2026",
    summary: "An intelligent workflow system that turns operational noise into decisions.",
    challenge: "A specialist service team was spending too much time classifying requests, preparing repetitive documentation and routing work manually.",
    solution: "We designed a human-supervised AI workflow with clear confidence states, audit trails and a focused operator interface rather than a generic chatbot experience.",
    impact: ["Faster request triage", "Transparent human review", "Scalable workflow architecture"],
    services: ["AI workflow design", "Interface design", "Full-stack development", "Analytics"],
    tone: "ice",
    location: "Espoo, Finland",
    quote: "The system supports our experts instead of trying to replace them."
  },
  {
    slug: "baltic-house",
    title: "Baltic House",
    client: "Baltic House",
    category: "Commerce experience",
    year: "2025",
    summary: "A warm editorial commerce experience for contemporary Nordic living.",
    challenge: "The brand had a strong physical identity but its online store felt transactional and failed to communicate material quality.",
    solution: "We combined cinematic product stories, restrained interaction and a low-friction shopping architecture with a reusable campaign system.",
    impact: ["Stronger product discovery", "Campaign-ready content system", "Improved mobile purchase flow"],
    services: ["Commerce strategy", "Art direction", "Frontend engineering", "Conversion design"],
    tone: "ember",
    location: "Turku, Finland",
    quote: "Our digital presence finally feels like the spaces we create."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
