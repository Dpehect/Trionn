export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  client: string;
  year: string;
  industry: string;
  services: string[];
  stack: string[];
  summary: string;
  challenge: string;
  solution: string;
  impact: { value: string; label: string; basis: "project target" | "representative benchmark" | "verified client result" }[];
  disclosure: string;
  status: "Representative case study" | "Client engagement" | "Internal product study";
  gradient: string;
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northstar-ai",
    number: "01",
    title: "Northstar AI",
    client: "Nordic operations team",
    year: "2026",
    industry: "AI Automation / SaaS",
    services: ["Product strategy", "AI engineering", "UX design"],
    stack: ["Next.js", "TypeScript", "Python", "PostgreSQL"],
    summary: "An intelligent operations platform that turns complex workflows into measurable, automated systems.",
    challenge: "Teams were losing time across disconnected tools, repetitive approvals and opaque operational data.",
    solution: "We designed a focused command center with guided automations, human review checkpoints and transparent analytics.",
    impact: [{ value: "42%", label: "less manual coordination", basis: "representative benchmark" }, { value: "3.1×", label: "faster task completion", basis: "project target" }, { value: "8 wk", label: "MVP to pilot", basis: "project target" }],
    status: "Representative case study",
    disclosure: "A representative product engagement used to demonstrate our delivery approach. Metrics are clearly labelled as targets or benchmarks, not public client claims.",
    gradient: "linear-gradient(135deg,#557cff 0%,#9368ff 48%,#ff8069 100%)",
    accent: "#557cff",
  },
  {
    slug: "aurora-commerce",
    number: "02",
    title: "Aurora Commerce",
    client: "European retail group",
    year: "2025",
    industry: "Commerce / Product Engineering",
    services: ["Commerce architecture", "Design system", "Performance"],
    stack: ["Next.js", "Sanity", "Stripe", "Vercel"],
    summary: "A high-performance commerce ecosystem built for faster discovery, conversion and international growth.",
    challenge: "A fragmented storefront and slow editorial workflow made international launches expensive and inconsistent.",
    solution: "We created a modular commerce platform with reusable campaign blocks, localized content and edge-first delivery.",
    impact: [{ value: "+31%", label: "conversion uplift", basis: "project target" }, { value: "1.2s", label: "median LCP", basis: "representative benchmark" }, { value: "6", label: "markets launched", basis: "project target" }],
    status: "Representative case study",
    disclosure: "A representative commerce engagement. Outcomes are presented as delivery targets and industry benchmarks unless independently verified.",
    gradient: "linear-gradient(135deg,#ff765e 0%,#ffae6f 48%,#c8f65a 100%)",
    accent: "#ff765e",
  },
  {
    slug: "sisu-mobile",
    number: "03",
    title: "Sisu Mobile",
    client: "Consumer technology venture",
    year: "2026",
    industry: "Mobile / Digital Product",
    services: ["Product discovery", "Mobile UX", "Platform engineering"],
    stack: ["React Native", "Expo", "Node.js", "Supabase"],
    summary: "A focused mobile experience combining native interaction patterns with scalable product architecture.",
    challenge: "The early product had strong demand but onboarding friction and an architecture that could not support growth.",
    solution: "We rebuilt the experience around progressive onboarding, offline-first flows and a shared modular platform.",
    impact: [{ value: "+56%", label: "activation rate", basis: "project target" }, { value: "4.8", label: "store rating", basis: "project target" }, { value: "34%", label: "lower support load", basis: "representative benchmark" }],
    status: "Internal product study",
    disclosure: "An internal mobile product study showing our product and engineering standards. Metrics are prototype targets, not public marketplace claims.",
    gradient: "linear-gradient(135deg,#946bff 0%,#5b86ff 50%,#62dfe7 100%)",
    accent: "#946bff",
  },
  {
    slug: "helix-health",
    number: "04",
    title: "Helix Health",
    client: "Digital health provider",
    year: "2025",
    industry: "Health / Service Design",
    services: ["Service design", "Accessible UI", "Platform build"],
    stack: ["Next.js", "Node.js", "FHIR", "Azure"],
    summary: "A secure care journey that helps patients and professionals coordinate decisions with less friction.",
    challenge: "Patients faced fragmented communication while professionals lacked a coherent view of the care journey.",
    solution: "We delivered an accessible patient portal and structured clinical workspace connected through secure APIs.",
    impact: [{ value: "-38%", label: "missed appointments", basis: "project target" }, { value: "AA", label: "WCAG compliance", basis: "project target" }, { value: "27%", label: "faster case review", basis: "representative benchmark" }],
    status: "Representative case study",
    disclosure: "A representative healthcare product engagement. No patient or client data is shown; metrics are targets and sector benchmarks.",
    gradient: "linear-gradient(135deg,#caef63 0%,#82dfb0 48%,#5b86ff 100%)",
    accent: "#80c968",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
