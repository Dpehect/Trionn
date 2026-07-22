export type LayoutRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  summary: string;
  homeTileIds: number[];
  focusMedia: string[];
  focusLayout: LayoutRect[];
};

export type HomeTile = {
  id: number;
  src: string;
  alt: string;
  projectSlug: string;
  layout: LayoutRect;
};
