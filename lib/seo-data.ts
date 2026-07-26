export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://softbridge-solutions.com";

export const COMPANY = {
  name: "SoftBridge Solutions",
  legalName: "SoftBridge Solutions",
  description:
    "Finland-focused software company delivering AI software development, custom software, SaaS platforms, cloud applications, web products and mobile apps for Finland, the Nordics and Europe.",
  email: "hello@softbridge-solutions.com",
  locale: "en_FI",
  language: "en",
  country: "FI",
  region: "Finland",
  logo: `${SITE_URL}/icon.svg`,
  foundingDate: "2026",
  socialProfiles: [] as string[],
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  summary: string;
  keywords: string[];
  capabilities: string[];
  outcomes: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "software-development-finland",
    name: "Software Development Company in Finland",
    shortName: "Custom Software",
    title: "Software Development Company in Finland | SoftBridge Solutions",
    description:
      "Custom software development for Finnish and Nordic companies. SoftBridge Solutions builds scalable web platforms, internal systems, SaaS products and cloud-native applications.",
    summary:
      "SoftBridge Solutions is a Finland-focused software development company helping startups, SMEs and enterprise teams design, build and modernize reliable digital products.",
    keywords: [
      "software company Finland",
      "software development Finland",
      "custom software Finland",
      "software companies in Finland",
      "Finnish software company",
      "software development company Helsinki",
      "Nordic software development",
    ],
    capabilities: [
      "Custom web application development",
      "Enterprise software and internal platforms",
      "SaaS product engineering",
      "API and systems integration",
      "Cloud-native architecture",
      "Product discovery and technical planning",
    ],
    outcomes: [
      "Faster launch cycles",
      "Reliable and maintainable systems",
      "Clear product scope",
      "Architecture prepared for growth",
    ],
    faq: [
      {
        question: "What does a software development company in Finland provide?",
        answer:
          "A software development company in Finland can support product strategy, UX, frontend and backend engineering, cloud architecture, integrations, testing and long-term product development.",
      },
      {
        question: "Does SoftBridge Solutions work with companies outside Finland?",
        answer:
          "Yes. SoftBridge Solutions serves organizations in Finland, across the Nordics and throughout Europe.",
      },
      {
        question: "Can you modernize an existing software platform?",
        answer:
          "Yes. We can assess an existing platform, identify technical and UX risks, define a phased modernization plan and deliver improvements without unnecessary disruption.",
      },
    ],
  },
  {
    slug: "ai-software-development-finland",
    name: "AI Software Development in Finland",
    shortName: "AI Engineering",
    title: "AI Software Development Finland | SoftBridge Solutions",
    description:
      "AI software development in Finland for automation, intelligent workflows, AI agents, retrieval systems and data-driven products.",
    summary:
      "We design practical AI systems that connect models, business data, human review and production software into dependable workflows.",
    keywords: [
      "AI software development Finland",
      "AI company Finland",
      "AI automation Finland",
      "AI agents Finland",
      "enterprise AI Finland",
      "generative AI development Finland",
    ],
    capabilities: [
      "AI agents and workflow automation",
      "Retrieval-augmented generation",
      "LLM product integration",
      "Human-in-the-loop systems",
      "AI evaluation and observability",
      "Secure data and API integration",
    ],
    outcomes: [
      "Less repetitive manual work",
      "Faster access to business knowledge",
      "Safer production AI adoption",
      "Measurable automation value",
    ],
    faq: [
      {
        question: "What types of AI software do you build?",
        answer:
          "We build AI-assisted products, workflow automation, AI agents, knowledge retrieval systems, internal copilots and model-powered features integrated into existing software.",
      },
      {
        question: "Can AI be integrated into an existing product?",
        answer:
          "Yes. We can add focused AI capabilities to an existing platform while preserving its current architecture and user experience.",
      },
      {
        question: "How do you reduce AI implementation risk?",
        answer:
          "We start with a narrow use case, define measurable success criteria, prototype with real data, add evaluation and human review, and only then expand the system.",
      },
    ],
  },
  {
    slug: "saas-development-finland",
    name: "SaaS Development in Finland",
    shortName: "SaaS Products",
    title: "SaaS Development Finland | Product Engineering Partner",
    description:
      "SaaS product development for Finland and the Nordics, including multi-tenant architecture, subscriptions, permissions, analytics and integrations.",
    summary:
      "We help SaaS teams move from product concept to a scalable, secure and commercially ready platform.",
    keywords: [
      "SaaS development Finland",
      "SaaS company Finland",
      "SaaS product development Helsinki",
      "multi tenant software Finland",
      "Nordic SaaS development",
    ],
    capabilities: [
      "Multi-tenant architecture",
      "Roles and permissions",
      "Subscription and billing integration",
      "Product analytics",
      "Admin and operational tools",
      "Scalable frontend and backend systems",
    ],
    outcomes: [
      "Launch-ready SaaS foundations",
      "Lower operational complexity",
      "Better product visibility",
      "Flexible growth across markets",
    ],
    faq: [
      {
        question: "Can you build an SaaS MVP?",
        answer:
          "Yes. We define the smallest commercially useful scope, prototype critical workflows and build an MVP that can evolve into a production platform.",
      },
      {
        question: "Do you support multi-tenant SaaS architecture?",
        answer:
          "Yes. We design tenant isolation, roles, permissions, billing, auditability and operational tooling around the product's risk and growth requirements.",
      },
    ],
  },
  {
    slug: "web-application-development-finland",
    name: "Web Application Development in Finland",
    shortName: "Web Applications",
    title: "Web Application Development Finland | SoftBridge Solutions",
    description:
      "High-performance web application development in Finland using modern React and Next.js architecture, accessible UX and production-grade engineering.",
    summary:
      "We build responsive web applications that combine clear UX, fast performance and maintainable engineering.",
    keywords: [
      "web development Finland",
      "web application development Finland",
      "Next.js development Finland",
      "React development Finland",
      "web agency Finland software",
    ],
    capabilities: [
      "React and Next.js development",
      "Design systems and component architecture",
      "Accessible responsive interfaces",
      "Backend and API integration",
      "Performance optimization",
      "Analytics and experimentation",
    ],
    outcomes: [
      "Fast and accessible user experiences",
      "Reusable interface systems",
      "Improved Core Web Vitals",
      "Lower long-term maintenance cost",
    ],
    faq: [
      {
        question: "Do you develop Next.js applications?",
        answer:
          "Yes. We use Next.js where its rendering, routing, performance and SEO capabilities fit the product requirements.",
      },
      {
        question: "Can you improve an existing React application?",
        answer:
          "Yes. We can audit performance, accessibility, component architecture and UX, then deliver improvements in controlled phases.",
      },
    ],
  },
  {
    slug: "mobile-app-development-finland",
    name: "Mobile App Development in Finland",
    shortName: "Mobile Products",
    title: "Mobile App Development Finland | iOS & Android Products",
    description:
      "Mobile app development for Finnish companies, including product strategy, UX, iOS, Android, Flutter and API integration.",
    summary:
      "We create mobile products that feel focused, fast and dependable across iOS and Android.",
    keywords: [
      "mobile app development Finland",
      "app developers Finland",
      "Flutter development Finland",
      "iOS development Finland",
      "Android development Finland",
    ],
    capabilities: [
      "Mobile product discovery",
      "iOS and Android application development",
      "Flutter cross-platform development",
      "Backend and API integration",
      "Analytics and release preparation",
      "Ongoing product iteration",
    ],
    outcomes: [
      "Consistent cross-platform experience",
      "Faster release cycles",
      "Reliable API integration",
      "Clear product analytics",
    ],
    faq: [
      {
        question: "Do you build both iOS and Android applications?",
        answer:
          "Yes. We can deliver native or cross-platform mobile applications depending on performance, platform and maintenance requirements.",
      },
      {
        question: "Can you build a Flutter application?",
        answer:
          "Yes. Flutter can be a strong choice for products that need a consistent cross-platform experience and efficient shared development.",
      },
    ],
  },
  {
    slug: "cloud-application-development-finland",
    name: "Cloud Application Development in Finland",
    shortName: "Cloud Platforms",
    title: "Cloud Application Development Finland | Scalable Platforms",
    description:
      "Cloud application development and modernization for Finland and Europe, covering architecture, APIs, observability, security and scalable delivery.",
    summary:
      "We design cloud-native applications and modernization plans that improve reliability, delivery speed and operational visibility.",
    keywords: [
      "cloud application development Finland",
      "cloud software Finland",
      "cloud modernization Finland",
      "AWS development Finland",
      "Azure software development Finland",
    ],
    capabilities: [
      "Cloud-native application architecture",
      "API and event-driven systems",
      "Observability and monitoring",
      "Deployment automation",
      "Security-aware engineering",
      "Legacy modernization",
    ],
    outcomes: [
      "More reliable releases",
      "Improved operational visibility",
      "Scalable infrastructure",
      "Reduced modernization risk",
    ],
    faq: [
      {
        question: "Can you modernize a legacy application for the cloud?",
        answer:
          "Yes. We assess dependencies and risk, then define a phased modernization approach rather than forcing an unnecessary full rewrite.",
      },
      {
        question: "Do you provide cloud architecture consulting?",
        answer:
          "Yes. We support architecture decisions, delivery planning, observability, deployment workflows and application modernization.",
      },
    ],
  },
];

export type LocationPage = {
  slug: string;
  city: string;
  title: string;
  description: string;
  intro: string;
};

export const locations: LocationPage[] = [
  {
    slug: "helsinki",
    city: "Helsinki",
    title: "Software Development Company Helsinki | SoftBridge Solutions",
    description:
      "Software development, AI engineering, SaaS, web and mobile product services for companies in Helsinki, Finland.",
    intro:
      "SoftBridge Solutions supports Helsinki-based startups, SMEs and enterprise teams with product strategy, AI engineering and custom software delivery.",
  },
  {
    slug: "espoo",
    city: "Espoo",
    title: "Software Development Company Espoo | SoftBridge Solutions",
    description:
      "Custom software and AI product development for technology and enterprise organizations in Espoo, Finland.",
    intro:
      "We help organizations in Espoo build scalable platforms, intelligent workflows and high-quality digital products.",
  },
  {
    slug: "tampere",
    city: "Tampere",
    title: "Software Development Company Tampere | SoftBridge Solutions",
    description:
      "AI, manufacturing software, SaaS and custom application development for companies in Tampere, Finland.",
    intro:
      "SoftBridge Solutions works with Tampere companies on AI, digital products, industrial software and cloud applications.",
  },
  {
    slug: "turku",
    city: "Turku",
    title: "Software Development Company Turku | SoftBridge Solutions",
    description:
      "Custom software, mobile, web and AI development services for businesses in Turku, Finland.",
    intro:
      "We support product teams and growing businesses in Turku with modern software engineering and practical AI implementation.",
  },
  {
    slug: "oulu",
    city: "Oulu",
    title: "Software Development Company Oulu | SoftBridge Solutions",
    description:
      "Software product engineering, cloud applications and AI solutions for technology companies in Oulu, Finland.",
    intro:
      "SoftBridge Solutions helps Oulu organizations turn product ideas into maintainable web, mobile, SaaS and AI systems.",
  },
];

export type Insight = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "how-to-choose-software-development-company-finland",
    title: "How to Choose a Software Development Company in Finland",
    description:
      "A practical evaluation framework for choosing a software development partner in Finland.",
    date: "2026-07-26",
    readTime: "8 min",
    sections: [
      {
        heading: "Start with product and business clarity",
        paragraphs: [
          "A strong software partner should clarify the user problem, business outcome, operational constraints and delivery risk before discussing a large implementation.",
          "Look for a team that can translate goals into a phased roadmap rather than treating every requested feature as equally important.",
        ],
      },
      {
        heading: "Evaluate engineering quality beyond the technology list",
        paragraphs: [
          "Technology choices matter, but maintainability, testing, observability, accessibility and release discipline are stronger signals of long-term delivery quality.",
          "Ask how architecture decisions will be documented, how production issues will be detected and how ownership will transfer or continue after launch.",
        ],
      },
      {
        heading: "Check communication and decision-making",
        paragraphs: [
          "The most effective product teams expose assumptions early, explain tradeoffs clearly and share working software frequently.",
          "A reliable partner should make progress visible and identify risk before it becomes expensive.",
        ],
      },
    ],
  },
  {
    slug: "ai-software-development-finland-guide",
    title: "AI Software Development in Finland: A Practical Guide",
    description:
      "How Finnish companies can move from AI experimentation to reliable production systems.",
    date: "2026-07-26",
    readTime: "9 min",
    sections: [
      {
        heading: "Choose a narrow, measurable use case",
        paragraphs: [
          "AI projects are easier to validate when they target a clear workflow, known users and measurable business value.",
          "A focused first use case produces better evidence than a broad assistant with unclear responsibilities.",
        ],
      },
      {
        heading: "Design the complete system, not only the model",
        paragraphs: [
          "Production AI requires data access, permissions, evaluation, monitoring, user feedback and fallback behavior.",
          "The model is one component inside a larger software and operational system.",
        ],
      },
      {
        heading: "Use human review where the cost of error is high",
        paragraphs: [
          "Human-in-the-loop design is especially valuable for legal, financial, healthcare and operational decisions.",
          "The right review workflow can improve safety without removing the speed benefits of automation.",
        ],
      },
    ],
  },
  {
    slug: "saas-product-development-nordics",
    title: "SaaS Product Development for Finland and the Nordics",
    description:
      "A practical approach to building scalable SaaS products for Nordic and European markets.",
    date: "2026-07-26",
    readTime: "7 min",
    sections: [
      {
        heading: "Build around the core workflow",
        paragraphs: [
          "The first version of a SaaS product should make one important workflow significantly easier for a clearly defined customer.",
          "Additional modules should follow evidence from actual usage rather than assumptions.",
        ],
      },
      {
        heading: "Plan tenancy, permissions and operations early",
        paragraphs: [
          "Multi-tenant architecture, roles, billing, audit logs and support tooling affect the product foundation.",
          "These decisions should be proportional to current risk while leaving a clear path for growth.",
        ],
      },
    ],
  },
];

export const primaryKeywords = [
  "software companies in Finland",
  "software company Finland",
  "software development company Finland",
  "AI software development Finland",
  "custom software development Finland",
  "SaaS development Finland",
  "web application development Finland",
  "mobile app development Finland",
  "cloud application development Finland",
  "software company Helsinki",
  "Nordic software development company",
];

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
