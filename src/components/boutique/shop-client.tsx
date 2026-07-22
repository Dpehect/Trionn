"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { BoutiqueProductCard } from "@/components/boutique/boutique-product-card";
import { ProductQuickView } from "@/components/boutique/product-quick-view";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { products } from "@/data/catalog";
import { useProductStore } from "@/store/use-product-store";

const filters = ["All", "Clothing", "Shoes", "Accessories", "FORM / 01", "NIGHT STUDY", "PERMANENT"];

export function ShopClient() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("collection") ?? "All";
  const wishlistOnly = searchParams.get("wishlist") === "true";
  const wishlist = useProductStore((state) => state.wishlist);
  const activeFilter = filters.includes(requested) ? requested : "All";
  const visible = products.filter((product) => {
    if (wishlistOnly && !wishlist.includes(product.id)) return false;
    if (activeFilter === "All") return true;
    return product.category === activeFilter || product.collection === activeFilter;
  });

  return (
    <>
      <main className="shop-page">
        <div className="shop-page-top"><Link href="/"><ArrowLeft size={17} /> Ana sayfa</Link><span>{wishlistOnly ? "WISHLIST" : "SHOP"} / {visible.length} OBJECTS</span></div>
        <div className="shop-page-head"><div><p className="section-eyebrow">TRIONN BOUTIQUE</p><h1>{wishlistOnly ? "Saved objects." : activeFilter === "All" ? "All objects." : `${activeFilter}.`}</h1></div><p>Kıyafet, ayakkabı ve aksesuarları tek edit içinde keşfet. Her ürün küçük seri üretimdir.</p></div>
        <div className="shop-page-toolbar"><div>{filters.map((filter) => <Link className={activeFilter === filter && !wishlistOnly ? "is-active" : ""} key={filter} href={`/shop?collection=${encodeURIComponent(filter)}`}>{filter}</Link>)}</div><span><SlidersHorizontal size={15} /> Editorial order</span></div>
        {visible.length ? <div className="shop-page-grid">{visible.map((product, index) => <BoutiqueProductCard product={product} priority={index < 4} key={product.id} />)}</div> : <div className="shop-empty"><h2>Burada henüz ürün yok.</h2><p>Favori ekleyebilir veya bütün koleksiyona dönebilirsin.</p><Link className="button button-primary" href="/shop">Tüm ürünler</Link></div>}
      </main>
      <ProductQuickView />
      <CartDrawer />
    </>
  );
}
