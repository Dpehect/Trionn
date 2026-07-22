import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections, journalEntries } from "@/data/editorial";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { const now=new Date(); const staticRoutes=["","/shop","/collections","/lookbook","/journal","/about","/contact"]; return [
  ...staticRoutes.map((path)=>({url:`${siteConfig.url}${path}`,lastModified:now,changeFrequency:"weekly" as const,priority:path===""?1:.8})),
  ...products.map((p)=>({url:`${siteConfig.url}/product/${p.slug}`,lastModified:now,changeFrequency:"weekly" as const,priority:.7})),
  ...collections.map((c)=>({url:`${siteConfig.url}/collections/${c.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.7})),
  ...journalEntries.map((e)=>({url:`${siteConfig.url}/journal/${e.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.6})),
]; }
