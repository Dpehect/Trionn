export const capabilities = [
  {
    key: "product",
    label: "Product",
    title: "Product engineering",
    outcome: "Turn a business-critical problem into software that can be shipped, measured and extended.",
    engagement: "10–18 weeks",
    team: "Product lead · Tech lead · 2–4 engineers",
    services: ["Product discovery", "Custom software", "SaaS foundations", "Domain architecture"],
    signals: ["Release scope defined in 2–3 weeks", "One measurable outcome per engagement"]
  },
  {
    key: "experience",
    label: "Experience",
    title: "Product experience",
    outcome: "Make complex software easier to understand, faster to operate and harder to abandon.",
    engagement: "6–14 weeks",
    team: "Product designer · Frontend lead · Product engineer",
    services: ["Product UX", "Web applications", "Mobile applications", "Design systems"],
    signals: ["WCAG 2.2 AA minimum", "Performance budget agreed before build"]
  },
  {
    key: "intelligence",
    label: "Intelligence",
    title: "AI systems",
    outcome: "Automate high-friction work without removing human control or operational accountability.",
    engagement: "6–12 weeks",
    team: "AI engineer · Integration lead · Product engineer",
    services: ["Workflow automation", "Retrieval systems", "Human-in-the-loop agents", "Evaluation"],
    signals: ["Every automated action is traceable", "Human approval retained for material decisions"]
  },
  {
    key: "platform",
    label: "Platform",
    title: "Platform engineering",
    outcome: "Build a technical foundation that remains reliable as usage and product complexity grow.",
    engagement: "8–16 weeks or ongoing",
    team: "Tech lead · Platform engineer · QA",
    services: ["Cloud architecture", "API integrations", "Performance engineering", "Scaling"],
    signals: ["99.95% availability target where required", "Defined recovery paths and observable releases"]
  }
] as const;

export const cases = [
  {
    label: "Verified client work",
    title: "Operations platform for a European service business",
    problem: "Onboarding depended on email, spreadsheets and repeated manual validation across four teams.",
    approach: "We consolidated the workflow, connected the CRM and introduced structured approval states.",
    outcomes: ["38% less manual coordination", "One operational source of truth", "Faster pipeline visibility"],
    proof: "Results supplied by the client and reviewed after release."
  },
  {
    label: "Anonymised client work",
    title: "AI-assisted document operations",
    problem: "Specialists manually classified, checked and routed a high volume of business documents.",
    approach: "We introduced a human-controlled workflow for extraction, validation, escalation and audit logging.",
    outcomes: ["Less repetitive processing", "Traceable AI actions", "Mandatory human review for exceptions"],
    proof: "Client identity and exact operational metrics remain confidential."
  },
  {
    label: "Representative study",
    title: "Northstar operations system",
    problem: "Operational teams need automation without losing control over decisions and exceptions.",
    approach: "A command centre combining workflow orchestration, approval queues and observability.",
    outcomes: ["12 representative workflows", "Human review built into material actions", "One operating view"],
    proof: "Internal product study. Metrics illustrate system behaviour, not client results."
  }
] as const;

export const faq = [
  {
    q: "Who is Softbridge?",
    a: "Softbridge is an independent product engineering studio serving ambitious teams in Finland and Europe. Client strategy is led from Helsinki, while senior product and engineering delivery is supported by a Türkiye-based hub."
  },
  {
    q: "What does Softbridge build?",
    a: "Softbridge designs and builds business-critical software, SaaS products, digital product experiences, AI workflow systems and scalable platform foundations."
  },
  {
    q: "Where is Softbridge based?",
    a: "Softbridge operates through a Helsinki and Türkiye delivery model in the EET and EEST time zones. The legal contracting entity is disclosed in every commercial proposal."
  },
  {
    q: "How does a Softbridge engagement work?",
    a: "Engagements begin with discovery and shaping, continue through iterative product delivery and validation, and finish with a controlled release or ongoing engineering partnership."
  }
] as const;
