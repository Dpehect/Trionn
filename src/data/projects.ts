import type { HomeTile, Project } from "@/lib/types";

const homeRects = [
  [86.03, 3.3, 13.42, 16.56],
  [0.55, 23.87, 13.42, 16.56], [14.79, 23.87, 13.42, 16.56],
  [57.53, 23.87, 13.42, 16.56], [71.78, 23.87, 13.42, 16.56], [86.03, 23.87, 13.42, 16.56],
  [0.55, 42.02, 13.42, 16.62], [86.03, 42.02, 13.42, 16.62],
  [0.55, 60.24, 13.42, 16.56], [14.79, 60.24, 13.42, 16.62], [29.04, 60.24, 13.42, 16.56], [43.29, 60.24, 13.42, 16.56],
  [71.78, 60.24, 13.42, 16.56], [86.03, 60.24, 13.42, 16.56],
  [57.53, 78.32, 13.42, 16.62], [71.78, 78.32, 13.42, 16.62], [0.55, 78.39, 13.42, 16.56], [14.79, 78.39, 13.42, 16.56], [43.29, 78.39, 13.42, 16.56], [86.03, 78.39, 13.42, 16.56],
] as const;

const tileProjectMap = [
  "argus-labs", "hyperbolic", "apple", "lege", "hyperbolic", "argus-labs",
  "pele-foundation", "esther", "lege", "esther", "pele-foundation", "apple",
  "lege", "pele-foundation", "esther", "hyperbolic", "apple", "argus-labs", "argus-labs", "apple",
] as const;

export const homeTiles: HomeTile[] = homeRects.map((rect, index) => ({
  id: index + 1,
  src: `/media/home/${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Selected studio work ${index + 1}`,
  projectSlug: tileProjectMap[index],
  layout: { x: rect[0], y: rect[1], w: rect[2], h: rect[3] },
}));

export const projects: Project[] = [
  {
    slug: "apple",
    title: "Apple Creative",
    client: "Apple",
    year: "2026",
    discipline: "Digital direction, motion and launch systems",
    summary: "A restrained product world built from precise typography, tactile devices and quiet motion.",
    homeTileIds: [3, 12, 17, 20],
    focusMedia: [1, 2, 3, 4, 5].map((n) => `/media/projects/apple/${String(n).padStart(2, "0")}.webp`),
    focusLayout: [
      { x: 17.2, y: 23.9, w: 13.4, h: 28.9 }, { x: 49.0, y: 23.9, w: 25.5, h: 31.0 },
      { x: 75.3, y: 23.9, w: 13.4, h: 34.8 }, { x: 0.55, y: 60.2, w: 24.1, h: 30.9 },
      { x: 44.6, y: 60.2, w: 12.1, h: 16.6 },
    ],
  },
  {
    slug: "hyperbolic",
    title: "Hyperbolic",
    client: "Hyperbolic",
    year: "2026",
    discipline: "Brand platform and product experience",
    summary: "A spatial identity system for distributed intelligence, expressed through charts, devices and motion.",
    homeTileIds: [2, 5, 16],
    focusMedia: [1, 2, 3, 4, 5].map((n) => `/media/projects/hyperbolic/${String(n).padStart(2, "0")}.webp`),
    focusLayout: [
      { x: 0.55, y: 23.9, w: 13.4, h: 34.8 }, { x: 25.5, y: 23.9, w: 13.4, h: 34.8 },
      { x: 57.5, y: 23.9, w: 13.4, h: 16.6 }, { x: 58.7, y: 42.0, w: 24.1, h: 31.0 },
      { x: 33.8, y: 60.2, w: 24.1, h: 30.9 },
    ],
  },
  {
    slug: "argus-labs",
    title: "Argus Labs",
    client: "Argus Labs",
    year: "2026",
    discipline: "Identity, interfaces and world building",
    summary: "A modular graphic universe joining game infrastructure with a precise, technical visual language.",
    homeTileIds: [1, 6, 18, 19],
    focusMedia: [1, 2, 3, 4, 5].map((n) => `/media/projects/argus-labs/${String(n).padStart(2, "0")}.webp`),
    focusLayout: [
      { x: 0.55, y: 2.0, w: 24.1, h: 34.7 }, { x: 25.5, y: 23.8, w: 13.4, h: 34.8 },
      { x: 83.7, y: 23.9, w: 13.4, h: 34.8 }, { x: 58.7, y: 42.0, w: 24.1, h: 31.0 },
      { x: 8.9, y: 60.2, w: 13.4, h: 34.7 },
    ],
  },
  {
    slug: "esther",
    title: "Esther",
    client: "Esther",
    year: "2026",
    discipline: "Campaign, editorial and packaging",
    summary: "A vivid visual system pairing typographic insistence with product-led editorial storytelling.",
    homeTileIds: [8, 10, 15],
    focusMedia: [1, 2, 3, 4, 5, 6].map((n) => `/media/projects/esther/${String(n).padStart(2, "0")}.webp`),
    focusLayout: [
      { x: 0.55, y: 2.0, w: 15.8, h: 44.6 }, { x: 17.2, y: 5.7, w: 15.8, h: 40.9 },
      { x: 67.0, y: 5.7, w: 24.1, h: 62.4 }, { x: 33.8, y: 23.8, w: 24.1, h: 31.0 },
      { x: 14.8, y: 60.2, w: 13.4, h: 16.6 }, { x: 44.9, y: 63.8, w: 18.4, h: 23.7 },
    ],
  },
  {
    slug: "pele-foundation",
    title: "Pelé Foundation",
    client: "Pelé Foundation",
    year: "2026",
    discipline: "Foundation identity and digital archive",
    summary: "A celebratory identity balancing cultural memory, global recognition and contemporary utility.",
    homeTileIds: [7, 11, 14],
    focusMedia: [1, 2, 3, 4, 5].map((n) => `/media/projects/pele-foundation/${String(n).padStart(2, "0")}.webp`),
    focusLayout: [
      { x: 0.55, y: 2.0, w: 24.1, h: 34.7 }, { x: 25.5, y: 23.8, w: 13.4, h: 34.8 },
      { x: 58.7, y: 23.8, w: 24.1, h: 31.0 }, { x: 8.9, y: 60.2, w: 13.4, h: 34.7 },
      { x: 33.8, y: 60.2, w: 24.1, h: 31.0 },
    ],
  },
  {
    slug: "lege",
    title: "Lege",
    client: "Lege",
    year: "2026",
    discipline: "Strategy, identity and digital product",
    summary: "A quiet editorial system for a legal technology platform, built around confidence and clarity.",
    homeTileIds: [4, 9, 13],
    focusMedia: [1, 2, 3, 4].map((n) => `/media/projects/lege/${String(n).padStart(2, "0")}.webp`),
    focusLayout: [
      { x: 0.55, y: 23.9, w: 13.4, h: 16.6 }, { x: 33.8, y: 23.9, w: 19.1, h: 34.8 },
      { x: 8.9, y: 42.0, w: 13.4, h: 34.8 }, { x: 58.7, y: 42.0, w: 24.1, h: 31.0 },
    ],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
