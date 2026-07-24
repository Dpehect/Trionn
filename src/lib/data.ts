export type WorkLabel = "Verified" | "Anonymised" | "Representative";
export const capabilities = [
 {slug:"product",index:"01",title:"Product",summary:"Product strategy, discovery and delivery for decisions that need evidence.",outcomes:["Validated scope","Prioritised backlog","Production release"],length:"8–24 weeks",team:"Product lead, designer, 2–4 engineers"},
 {slug:"experience",index:"02",title:"Experience",summary:"Interfaces that reduce friction, support complex work and remain clear at scale.",outcomes:["Design system","Accessible flows","Measured usability"],length:"6–16 weeks",team:"Design lead, product designer, frontend engineer"},
 {slug:"intelligence",index:"03",title:"Intelligence",summary:"Useful AI systems grounded in your data, workflows and operational constraints.",outcomes:["Evaluated use case","Guardrailed system","Observable production workflow"],length:"8–20 weeks",team:"AI lead, backend engineer, product engineer"},
 {slug:"platform",index:"04",title:"Platform",summary:"Reliable application foundations, integrations and cloud systems for long-term ownership.",outcomes:["Clear architecture","Stable deployment","Lower operational risk"],length:"10–28 weeks",team:"Technical lead, full-stack and platform engineers"}
];
export const work = [
 {slug:"operations-control",label:"Anonymised" as WorkLabel,sector:"Industrial software",title:"A single operating view for a fragmented service network",summary:"Replaced spreadsheet-led coordination with one role-aware operations platform.",result:"Dispatch preparation reduced from hours to minutes in pilot teams.",metrics:["One backlog across 4 operational roles","Audit-ready event history","Progressive rollout without service interruption"]},
 {slug:"knowledge-workflow",label:"Representative" as WorkLabel,sector:"AI-enabled workflow",title:"Evidence-first knowledge retrieval for regulated teams",summary:"A representative architecture showing how retrieval, citations and human review can work together.",result:"Designed to make every generated answer traceable to an approved source.",metrics:["Source-level citations","Permission-aware retrieval","Human approval checkpoints"]},
 {slug:"commerce-foundation",label:"Verified" as WorkLabel,sector:"Digital commerce",title:"A faster product and content foundation for multi-market growth",summary:"Reworked the storefront architecture, content model and release process.",result:"Improved release confidence and reduced repeated frontend implementation.",metrics:["Shared component system","Market-aware content model","Performance budgets in CI"]}
];
export const principles=[
 ["Clarity before code","We define the decision, constraint and evidence before increasing delivery speed."],
 ["Senior people stay involved","The people shaping the work remain accountable through delivery."],
 ["One team, one backlog","Strategy, design and engineering work from the same priorities and trade-offs."],
 ["Show the work","Risks, assumptions, progress and commercial impact stay visible."],
 ["Build for ownership","Documentation, observability and handover are part of the product."],
 ["No dependency theatre","We use the simplest architecture that can meet the real requirement."]
];
export const process=[
 {n:"01",title:"Frame",text:"Align on the business decision, users, constraints and proof required."},
 {n:"02",title:"De-risk",text:"Prototype the uncertain parts before committing the full build."},
 {n:"03",title:"Deliver",text:"Ship in small, reviewable increments from one prioritised backlog."},
 {n:"04",title:"Operate",text:"Measure the system in production and transfer ownership deliberately."}
];