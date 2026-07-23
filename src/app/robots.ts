import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: "https://softbridge.fi/sitemap.xml", host: "https://softbridge.fi" };
}
