export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  services: string[];
  metric: string;
  accent: string;
  chapters: { label: string; title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "astra-objects",
    title: "Astra Objects",
    category: "Digital flagship",
    year: "2026",
    summary: "A spatial commerce experience for collectible industrial objects.",
    services: ["Strategy", "Art direction", "WebGL", "Development"],
    metric: "+42% product exploration",
    accent: "#d8ff61",
    chapters: [
      { label: "Context", title: "A catalogue that behaved like a gallery.", body: "The interface removes conventional product-grid rhythm and replaces it with guided spatial discovery." },
      { label: "System", title: "One motion language across DOM and WebGL.", body: "A shared progress model coordinates typography, scene rotation and project transitions." },
      { label: "Result", title: "More exploration without sacrificing clarity.", body: "The final system retains direct access to product information while creating a memorable browsing signature." },
    ],
  },
  {
    slug: "monument",
    title: "Monument",
    category: "Interactive identity",
    year: "2026",
    summary: "A kinetic identity and launch platform for an experimental architecture practice.",
    services: ["Identity", "Motion", "Creative development"],
    metric: "3.1× longer sessions",
    accent: "#ff7058",
    chapters: [
      { label: "Context", title: "Architecture needed a digital material.", body: "The visual language was translated into shifting mass, scale and negative space rather than decorative transitions." },
      { label: "System", title: "Typography acts as structure.", body: "Headlines define the layout, then deform through scroll-linked timing and responsive constraints." },
      { label: "Result", title: "A launch platform with a distinct physical presence.", body: "The website became a presentation tool used in pitches, exhibitions and recruitment." },
    ],
  },
  {
    slug: "parallel-form",
    title: "Parallel Form",
    category: "Commerce experience",
    year: "2025",
    summary: "Editorial commerce for a limited-run apparel label.",
    services: ["UX", "E-commerce", "Motion system"],
    metric: "+31% conversion",
    accent: "#8fa7ff",
    chapters: [
      { label: "Context", title: "A store designed like a moving publication.", body: "Campaign storytelling and purchase paths were merged into the same page rhythm." },
      { label: "System", title: "Reusable sections with controlled variation.", body: "A modular content model allows each collection to feel unique without rebuilding the platform." },
      { label: "Result", title: "Editorial impact with production stability.", body: "The system supports frequent launches while preserving motion quality and mobile performance." },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
