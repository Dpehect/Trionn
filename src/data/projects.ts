export type TextCaseStudyBlock = {
  type: "text";
  eyebrow: string;
  title: string;
  body: string;
};

export type MetricCaseStudyBlock = {
  type: "metric";
  items: Array<{ label: string; value: string }>;
};

export type MediaCaseStudyBlock = {
  type: "media";
  title: string;
  ratio: "16/9" | "4/3" | "1/1";
  accent: string;
};

export type QuoteCaseStudyBlock = {
  type: "quote";
  quote: string;
  attribution: string;
};

export type CaseStudyBlock =
  | TextCaseStudyBlock
  | MetricCaseStudyBlock
  | MediaCaseStudyBlock
  | QuoteCaseStudyBlock;

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  services: string[];
  metric: string;
  accent: string;
  cover: string;
  index: string;
};

export const projects: Project[] = [
  { slug:"neural-archive", title:"NEURAL ARCHIVE", category:"AI / Cultural platform", year:"2026", summary:"A living visual archive where machine intelligence reorganizes cultural memory in real time.", services:["Strategy","Art direction","Creative development"], metric:"4.8× exploration", accent:"#ff4d00", cover:"/art/neural-archive.svg", index:"01" },
  { slug:"monument-zero", title:"MONUMENT ZERO", category:"Architecture / Identity", year:"2026", summary:"A digital identity system built from pressure, mass and responsive architectural typography.", services:["Identity","Motion","WebGL"], metric:"+61% qualified leads", accent:"#c7ff00", cover:"/art/monument-zero.svg", index:"02" },
  { slug:"orbital-systems", title:"ORBITAL SYSTEMS", category:"Aerospace / Product", year:"2025", summary:"A mission interface translating complex orbital data into a cinematic product narrative.", services:["Product design","Data visualization","Engineering"], metric:"2.7× session depth", accent:"#85a8ff", cover:"/art/orbital-systems.svg", index:"03" },
  { slug:"brutal-bloom", title:"BRUTAL BLOOM", category:"Fashion / Commerce", year:"2025", summary:"Editorial commerce where every collection mutates the interface into a new visual organism.", services:["Commerce","Campaign","Motion system"], metric:"+38% conversion", accent:"#ff89c7", cover:"/art/brutal-bloom.svg", index:"04" },
  { slug:"echo-chamber", title:"ECHO CHAMBER", category:"Music / Digital venue", year:"2025", summary:"A spatial release platform turning sound, typography and audience behavior into one instrument.", services:["Experience design","Audio-reactive art","Development"], metric:"1.9M interactions", accent:"#00e5ff", cover:"/art/echo-chamber.svg", index:"05" },
  { slug:"matter-language", title:"MATTER LANGUAGE", category:"Research / Publication", year:"2024", summary:"An experimental publication system examining the border between physical matter and code.", services:["Editorial","Digital identity","Interaction"], metric:"12 design awards", accent:"#ffdb3d", cover:"/art/matter-language.svg", index:"06" },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
