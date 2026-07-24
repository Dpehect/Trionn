export type WorkLabel = "Verified" | "Anonymised" | "Representative";

export type Capability = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  signals: string[];
  risks: string[];
  length: string;
  team: string;
};

export const capabilities: Capability[] = [
  {
    slug: "product",
    index: "01",
    title: "Product",
    summary: "Product strategy, discovery and delivery for decisions that need evidence.",
    description: "We turn ambiguous product questions into a sequence of testable decisions. The work combines user evidence, commercial constraints, technical reality and delivery planning so teams can commit with less guesswork.",
    outcomes: ["Validated scope", "Prioritised backlog", "Production release"],
    deliverables: ["Decision brief and opportunity map", "Research and prototype evidence", "Outcome-based roadmap", "Release plan and product operating rhythm"],
    signals: ["The roadmap contains more assumptions than evidence", "A new product needs a credible first release", "Stakeholders disagree on what should be built first"],
    risks: ["Premature commitment", "Feature-led roadmaps", "Unclear product ownership"],
    length: "8–24 weeks",
    team: "Product lead, designer, 2–4 engineers",
  },
  {
    slug: "experience",
    index: "02",
    title: "Experience",
    summary: "Interfaces that reduce friction, support complex work and remain clear at scale.",
    description: "We design product experiences around real tasks, operating conditions and accessibility requirements. The result is not a collection of screens, but a coherent interaction system that engineering teams can maintain.",
    outcomes: ["Design system", "Accessible flows", "Measured usability"],
    deliverables: ["Task and journey models", "Information architecture", "Interactive prototypes", "Production-ready design system"],
    signals: ["Users rely on workarounds outside the product", "The interface has grown without a shared system", "Complex workflows create support or training overhead"],
    risks: ["Design debt", "Inconsistent interaction patterns", "Accessibility regressions"],
    length: "6–16 weeks",
    team: "Design lead, product designer, frontend engineer",
  },
  {
    slug: "intelligence",
    index: "03",
    title: "Intelligence",
    summary: "Useful AI systems grounded in your data, workflows and operational constraints.",
    description: "We identify where AI can improve a real workflow, then build the evaluation, retrieval, permissions, review and observability layers required for responsible production use.",
    outcomes: ["Evaluated use case", "Guardrailed system", "Observable production workflow"],
    deliverables: ["Use-case and risk assessment", "Evaluation dataset and scorecard", "Retrieval and orchestration architecture", "Human review and monitoring workflow"],
    signals: ["A prototype works but cannot be trusted in production", "Teams need answers grounded in internal knowledge", "Manual review work is repetitive but high consequence"],
    risks: ["Untraceable answers", "Weak evaluation", "Sensitive-data leakage"],
    length: "8–20 weeks",
    team: "AI lead, backend engineer, product engineer",
  },
  {
    slug: "platform",
    index: "04",
    title: "Platform",
    summary: "Reliable application foundations, integrations and cloud systems for long-term ownership.",
    description: "We modernise or establish the technical foundations behind a product: architecture, delivery pipelines, observability, integrations, security boundaries and operational documentation.",
    outcomes: ["Clear architecture", "Stable deployment", "Lower operational risk"],
    deliverables: ["Architecture decision record", "Delivery and environment strategy", "Observability and incident baseline", "Ownership and migration plan"],
    signals: ["Releases are slow or unpredictable", "The team is afraid to change critical areas", "Growth depends on fragile integrations or manual operations"],
    risks: ["Hidden coupling", "Operational blind spots", "Vendor or individual dependency"],
    length: "10–28 weeks",
    team: "Technical lead, full-stack and platform engineers",
  },
];

export const work = [
  {
    slug: "operations-control",
    label: "Anonymised" as WorkLabel,
    sector: "Industrial software",
    title: "A single operating view for a fragmented service network",
    summary: "Replaced spreadsheet-led coordination with one role-aware operations platform.",
    result: "Dispatch preparation reduced from hours to minutes in pilot teams.",
    metrics: ["One backlog across 4 operational roles", "Audit-ready event history", "Progressive rollout without service interruption"],
    context: "Regional teams coordinated jobs, assets, availability and exceptions through spreadsheets, calls and local knowledge. Management lacked a reliable operating picture and frontline teams repeated the same reconciliation work every day.",
    challenge: "The platform had to support different operational roles without forcing one rigid workflow. It also had to coexist with existing systems during rollout and preserve an auditable history of operational decisions.",
    approach: ["Mapped decisions and hand-offs before designing screens", "Defined a shared operational data model", "Prototyped dispatch and exception flows with pilot users", "Released role by role with migration checkpoints"],
    contribution: ["Product framing", "Service and interaction design", "Application architecture", "Incremental delivery"],
    evidence: "The client identity and commercially sensitive figures are withheld. The operating model, delivery approach and directional outcome are based on completed work.",
  },
  {
    slug: "knowledge-workflow",
    label: "Representative" as WorkLabel,
    sector: "AI-enabled workflow",
    title: "Evidence-first knowledge retrieval for regulated teams",
    summary: "A representative architecture showing how retrieval, citations and human review can work together.",
    result: "Designed to make every generated answer traceable to an approved source.",
    metrics: ["Source-level citations", "Permission-aware retrieval", "Human approval checkpoints"],
    context: "Regulated teams often need faster access to policies, case material and internal guidance, but cannot accept answers that hide their source or bypass access controls.",
    challenge: "The system needed to be useful without presenting probabilistic output as authority. Permissions, document freshness, citations and review status had to remain visible throughout the workflow.",
    approach: ["Separated retrieval quality from answer quality", "Defined evaluation cases before interface design", "Made source and permission state part of the product UI", "Added explicit human review for high-impact outputs"],
    contribution: ["AI product strategy", "Evaluation design", "Retrieval architecture", "Workflow and interface design"],
    evidence: "This is a representative engagement model, not a claim about a named client deployment or measured commercial result.",
  },
  {
    slug: "commerce-foundation",
    label: "Verified" as WorkLabel,
    sector: "Digital commerce",
    title: "A faster product and content foundation for multi-market growth",
    summary: "Reworked the storefront architecture, content model and release process.",
    result: "Improved release confidence and reduced repeated frontend implementation.",
    metrics: ["Shared component system", "Market-aware content model", "Performance budgets in CI"],
    context: "Market teams needed greater content flexibility while engineering was repeatedly rebuilding similar storefront patterns. Release confidence declined as regional variation increased.",
    challenge: "The new foundation had to support local market needs without forking the product, and improve delivery speed without weakening performance or accessibility standards.",
    approach: ["Audited repeated implementation and content bottlenecks", "Defined composable content and UI contracts", "Introduced shared quality gates in CI", "Migrated high-value journeys before long-tail pages"],
    contribution: ["Frontend architecture", "Design system engineering", "Content modelling", "Performance governance"],
    evidence: "The engagement and described delivery outputs are verified. Public metrics are limited to avoid disclosing client-sensitive commercial data.",
  },
];

export const principles = [
  ["Clarity before code", "We define the decision, constraint and evidence before increasing delivery speed."],
  ["Senior people stay involved", "The people shaping the work remain accountable through delivery."],
  ["One team, one backlog", "Strategy, design and engineering work from the same priorities and trade-offs."],
  ["Show the work", "Risks, assumptions, progress and commercial impact stay visible."],
  ["Build for ownership", "Documentation, observability and handover are part of the product."],
  ["No dependency theatre", "We use the simplest architecture that can meet the real requirement."],
];

export const process = [
  { n: "01", title: "Frame", text: "Align on the business decision, users, constraints and proof required.", outputs: ["Decision brief", "Risk register", "Evidence plan"] },
  { n: "02", title: "De-risk", text: "Prototype the uncertain parts before committing the full build.", outputs: ["Testable prototype", "Architecture spikes", "Updated scope"] },
  { n: "03", title: "Deliver", text: "Ship in small, reviewable increments from one prioritised backlog.", outputs: ["Working releases", "Weekly decision log", "Quality evidence"] },
  { n: "04", title: "Operate", text: "Measure the system in production and transfer ownership deliberately.", outputs: ["Observability baseline", "Runbook", "Ownership plan"] },
];

export const engagementModels = [
  { title: "Framing engagement", duration: "2–4 weeks", fit: "A material decision is blocked by uncertainty.", outcome: "Evidence, scope, risks, team shape and a proceed / pause recommendation." },
  { title: "Product delivery team", duration: "8–28 weeks", fit: "A defined product outcome needs integrated senior delivery.", outcome: "One accountable team from product direction through production release." },
  { title: "Technical intervention", duration: "3–10 weeks", fit: "Architecture, performance or delivery risk needs focused correction.", outcome: "A diagnosed problem, implemented improvements and an ownership plan." },
];

export const trustPractices = [
  ["Weekly decision log", "Important decisions, owners, evidence and consequences are written down."],
  ["Visible commercial position", "Burn, forecast and scope movement are reviewed before they become surprises."],
  ["Quality evidence", "Accessibility, performance, security and release checks are part of delivery, not a final audit."],
  ["Deliberate handover", "Documentation, environments, credentials and operational knowledge transfer with the product."],
];
