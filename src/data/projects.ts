export type CaseStudyBlock =
  | {
      type: "text";
      eyebrow: string;
      title: string;
      body: string;
    }
  | {
      type: "metric";
      items: { label: string; value: string }[];
    }
  | {
      type: "media";
      title: string;
      ratio: "16/9" | "4/3" | "1/1";
      accent: string;
    }
  | {
      type: "quote";
      quote: string;
      attribution: string;
    };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  services: string[];
  metric: string;
  accent: string;
  blocks: CaseStudyBlock[];
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
    blocks: [
      {
        type: "text",
        eyebrow: "Context",
        title: "A catalogue that behaved like a gallery.",
        body: "The interface removes conventional product-grid rhythm and replaces it with guided spatial discovery.",
      },
      {
        type: "media",
        title: "Spatial product field",
        ratio: "16/9",
        accent: "#d8ff61",
      },
      {
        type: "metric",
        items: [
          { label: "Exploration", value: "+42%" },
          { label: "Session depth", value: "2.8×" },
          { label: "Launch regions", value: "12" },
        ],
      },
      {
        type: "quote",
        quote: "The website finally feels like the objects we make.",
        attribution: "Creative Director, Astra Objects",
      },
      {
        type: "text",
        eyebrow: "System",
        title: "One motion language across DOM and WebGL.",
        body: "A shared progress model coordinates typography, scene rotation and project transitions.",
      },
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
    blocks: [
      {
        type: "text",
        eyebrow: "Context",
        title: "Architecture needed a digital material.",
        body: "The visual language was translated into shifting mass, scale and negative space rather than decorative transitions.",
      },
      {
        type: "media",
        title: "Kinetic identity study",
        ratio: "4/3",
        accent: "#ff7058",
      },
      {
        type: "metric",
        items: [
          { label: "Session time", value: "3.1×" },
          { label: "Press mentions", value: "48" },
          { label: "Markets", value: "7" },
        ],
      },
      {
        type: "text",
        eyebrow: "Result",
        title: "A launch platform with a physical presence.",
        body: "The website became a presentation tool used in pitches, exhibitions and recruitment.",
      },
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
    blocks: [
      {
        type: "text",
        eyebrow: "Context",
        title: "A store designed like a moving publication.",
        body: "Campaign storytelling and purchase paths were merged into the same page rhythm.",
      },
      {
        type: "media",
        title: "Editorial commerce sequence",
        ratio: "16/9",
        accent: "#8fa7ff",
      },
      {
        type: "metric",
        items: [
          { label: "Conversion", value: "+31%" },
          { label: "Return visits", value: "+22%" },
          { label: "Drop cadence", value: "Monthly" },
        ],
      },
      {
        type: "quote",
        quote: "It feels like a magazine without slowing down the purchase.",
        attribution: "Founder, Parallel Form",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
