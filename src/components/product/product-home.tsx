"use client";

import Link from "next/link";
import { ArrowUpRight, Check, PackageCheck, RefreshCw, Truck } from "lucide-react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { BoutiqueHero } from "@/components/boutique/boutique-hero";
import { FlipProductGallery } from "@/components/boutique/flip-product-gallery";
import { EditorialScrollStory } from "@/components/boutique/editorial-scroll-story";
import { DraggableCollection } from "@/components/boutique/draggable-collection";
import { CollectionGrid } from "@/components/boutique/collection-grid";
import { StyleIntelligence } from "@/components/boutique/style-intelligence";
import { ProductQuickView } from "@/components/boutique/product-quick-view";
import { CartDrawer } from "@/components/commerce/cart-drawer";

export function ProductHome() {
  return (
    <div className="product-site">
      <SiteHeader />
      <main>
        <BoutiqueHero />

        <section className="boutique-intro section-shell">
          <div className="section-index">01 / BOUTIQUE</div>
          <div className="boutique-intro-title"><p className="section-eyebrow">Small-run clothing and footwear</p><h2>Objects with a clear silhouette, built for repeated wear.</h2></div>
          <div className="boutique-intro-copy"><p>TRIONN combines directional clothing with an independent footwear edit. Every collection is deliberately small, visually connected and designed to work across seasons.</p><div>{["Unisex sizing", "Limited production", "15-day returns"].map((item) => <span key={item}><Check size={15} /> {item}</span>)}</div></div>
        </section>

        <section className="service-strip section-shell">
          <article><Truck size={22} /><span>01</span><h3>Free delivery</h3><p>Türkiye genelinde ₺5.000 üzeri siparişlerde.</p></article>
          <article><RefreshCw size={22} /><span>02</span><h3>Easy returns</h3><p>Giyilmemiş ürünlerde 15 gün içinde kolay iade.</p></article>
          <article><PackageCheck size={22} /><span>03</span><h3>Small batches</h3><p>Kontrollü stok, numaralandırılmış sınırlı üretim.</p></article>
        </section>

        <FlipProductGallery />
        <EditorialScrollStory />
        <DraggableCollection />
        <CollectionGrid />
        <StyleIntelligence />

        <section className="boutique-cta section-shell">
          <div><p className="section-eyebrow">Private boutique access</p><h2>The next drop arrives in limited quantities.</h2></div>
          <div><p>Yeni koleksiyon, restock ve özel styling editleri için listeye katıl.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="newsletter-email">E-posta</label><input id="newsletter-email" type="email" placeholder="you@example.com" required /><button type="submit" aria-label="Bültene katıl"><ArrowUpRight /></button></form><Link href="/shop">Şimdi mağazayı aç <ArrowUpRight size={17} /></Link></div>
        </section>
      </main>
      <SiteFooter />
      <ProductQuickView />
      <CartDrawer />
    </div>
  );
}
