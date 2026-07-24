export const contexts = [
  "FINTECH",
  "HEALTH",
  "INDUSTRIAL",
  "COMMERCE",
  "PUBLIC SERVICES",
  "AI OPERATIONS",
];

export const capabilities = [
  {
    number: "01",
    title: "Product",
    subtitle: "Make the right thing clear before building it.",
    body: "Product strategy, service design and evidence-led discovery for decisions that are expensive to reverse.",
    detail: "Roadmaps, prototypes, prioritised backlogs and measurable release plans.",
    tone: "forest",
  },
  {
    number: "02",
    title: "Experience",
    subtitle: "Complex software should still feel obvious.",
    body: "Accessible interfaces, design systems and interaction models for products used every day.",
    detail: "Research, UX architecture, product design and frontend systems.",
    tone: "ochre",
  },
  {
    number: "03",
    title: "Intelligence",
    subtitle: "AI with evidence, controls and an owner.",
    body: "Useful AI workflows grounded in approved data, human review and measurable operational outcomes.",
    detail: "Retrieval, workflow automation, evaluations, observability and guardrails.",
    tone: "coral",
  },
];

export const outcomes = [
  {
    title: "Clarity",
    text: "One prioritised backlog and a visible record of the decisions behind it.",
    tag: "Before speed",
    className: "bg-lavender text-ink",
  },
  {
    title: "Reliability",
    text: "Quality budgets, observability and release discipline designed into delivery.",
    tag: "In production",
    className: "bg-[#fff0ec] text-coral",
  },
  {
    title: "Momentum",
    text: "Small reviewable releases instead of long periods of invisible implementation.",
    tag: "Every week",
    className: "bg-sky text-[#133d58]",
  },
  {
    title: "Ownership",
    text: "Documentation, environments and system knowledge transfer with the product.",
    tag: "No lock-in",
    className: "bg-mint text-forest",
  },
];

export const cases = [
  {
    slug: "operations-control",
    label: "Anonymised",
    sector: "Industrial software",
    title: "One operating view for a fragmented service network.",
    summary:
      "A role-aware platform replaced spreadsheet-led coordination across dispatch, field operations and finance.",
    result: "Pilot teams moved dispatch preparation from hours to minutes.",
    art: "/art/work-ops.svg",
    color: "bg-[#c9ddd0]",
  },
  {
    slug: "knowledge-workflow",
    label: "Representative",
    sector: "AI workflow",
    title: "Evidence-first retrieval for regulated knowledge work.",
    summary:
      "A reference architecture connected approved source material, citations, permissions and human review.",
    result: "Every generated answer remains traceable to an approved source.",
    art: "/art/work-ai.svg",
    color: "bg-[#e5e1ed]",
  },
  {
    slug: "commerce-foundation",
    label: "Verified",
    sector: "Digital commerce",
    title: "A faster product and content foundation for multi-market growth.",
    summary:
      "A shared storefront system aligned content, components, releases and market variation.",
    result: "Repeated frontend implementation was replaced by reusable product patterns.",
    art: "/art/work-commerce.svg",
    color: "bg-[#eadbd5]",
  },
];

export const testimonials = [
  {
    quote:
      "Softbridge turned a vague transformation brief into a sequence our leadership and delivery teams could both act on.",
    name: "Product director",
    company: "Anonymised Nordic services group",
  },
  {
    quote:
      "The strongest part was not raw delivery speed. It was the visibility of risks, decisions and production trade-offs.",
    name: "Technology lead",
    company: "Anonymised B2B platform",
  },
  {
    quote:
      "The team stayed senior throughout. Discovery did not disappear once implementation started.",
    name: "COO",
    company: "European growth company",
  },
];

export const faqs = [
  {
    q: "Where is Softbridge based?",
    a: "Client strategy and product leadership are anchored in Helsinki. Senior product, design, software and AI delivery extends through Türkiye. The work runs as one integrated team.",
  },
  {
    q: "What is a typical engagement?",
    a: "Most work starts with a focused 2–4 week framing engagement, then moves into an 8–24 week product delivery phase when the evidence supports it.",
  },
  {
    q: "Do you take over existing products?",
    a: "Yes. We can stabilise an existing product, clarify architecture and delivery risks, then work with your internal team from one backlog.",
  },
  {
    q: "Can you work under NDA?",
    a: "Yes. We can review and sign a mutual NDA before commercially sensitive product details are shared.",
  },
  {
    q: "How do you price work?",
    a: "We prefer a fixed fee for short framing engagements and a transparent monthly team fee for product delivery. Scope, assumptions and change rules are stated before commitment.",
  },
];
