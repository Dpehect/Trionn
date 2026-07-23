import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap { const now=new Date(); const staticRoutes=["","/about","/careers","/contact","/industries","/privacy"].map(route=>({url:`${siteConfig.url}${route}`,lastModified:now,changeFrequency:"monthly" as const,priority:route===""?1:0.7})); const work=projects.map(project=>({url:`${siteConfig.url}/work/${project.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:0.8})); return [...staticRoutes,...work]; }
