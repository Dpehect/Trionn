import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { BoutiqueProductCard } from "@/components/boutique/boutique-product-card";
import { ProductQuickView } from "@/components/boutique/product-quick-view";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { productBySlug } from "@/data/catalog";
import { styleEditBySlug, styleEdits } from "@/data/style-edits";

export function generateStaticParams() { return styleEdits.map((edit) => ({ slug: edit.slug })); }

export default async function StylePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edit = styleEditBySlug[slug as keyof typeof styleEditBySlug];
  if (!edit) notFound();
  const selectedProducts = edit.products.map((productSlug) => productBySlug[productSlug]).filter(Boolean);

  return (
    <div className="product-site">
      <SiteHeader />
      <main className="style-page">
        <Link className="product-back" href="/#style-intelligence"><ArrowLeft size={17} /> Style Intelligence</Link>
        <section className="style-page-hero"><div><p className="section-eyebrow">CURATED EDIT / {edit.meta.join(" / ")}</p><h1>{edit.title}</h1></div><div><p>{edit.statement}</p><Link className="button button-primary" href="/shop">Tüm mağaza <ArrowUpRight size={17} /></Link></div></section>
        <section className="style-page-products"><div className="style-page-line"><span>THE LOOK</span><span>{selectedProducts.length} OBJECTS</span></div><div>{selectedProducts.map((product, index) => <BoutiqueProductCard product={product} priority={index < 2} key={product.id} />)}</div></section>
        <section className="style-page-note"><span>WHY IT WORKS</span><h2>{edit.answer}</h2></section>
      </main>
      <SiteFooter />
      <ProductQuickView />
      <CartDrawer />
    </div>
  );
}
