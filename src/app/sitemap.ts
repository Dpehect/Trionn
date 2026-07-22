import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { styleEdits } from "@/data/style-edits";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trionn.example";
  return [
    { url: base, priority: 1 },
    { url: `${base}/shop`, priority: .9 },
    { url: `${base}/contact`, priority: .6 },
    ...products.map((product) => ({ url: `${base}/product/${product.slug}`, priority: .8 })),
    ...styleEdits.map((edit) => ({ url: `${base}/style/${edit.slug}`, priority: .65 })),
  ];
}
