import type { MetadataRoute } from "next";
import { projects } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const staticRoutes = ["", "/projects", "/about", "/contact"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
