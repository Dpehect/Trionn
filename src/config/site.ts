export const siteConfig = {
  name: "Softbridge Solutions Finland",
  shortName: "Softbridge Finland",
  description:
    "A Finland-focused software studio building intelligent digital products, AI systems, and high-performance web experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://finland.softbridgesolutions.com",
  location: "Finland / Türkiye",
  email: "hello@softbridgesolutions.com",
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
