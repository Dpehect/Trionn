import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { ProductDetailClient } from "@/components/boutique/product-detail-client";
import { productBySlug, products } from "@/data/catalog";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug[slug];
  if (!product) notFound();
  return <div className="product-site"><SiteHeader /><ProductDetailClient product={product} /><SiteFooter /></div>;
}
