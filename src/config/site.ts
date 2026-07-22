export const siteConfig = {
  name: "SABLE",
  description: "Independent clothing, designed with restraint and movement.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  navigation: [
    { href: "/shop", label: "Shop" },
    { href: "/collections", label: "Collections" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "Studio" },
  ],
} as const;
