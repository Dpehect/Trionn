"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "@/types/commerce";
import { formatPrice, products } from "@/data/catalog";
import { useProductStore } from "@/store/use-product-store";
import { BoutiqueProductCard } from "@/components/boutique/boutique-product-card";
import { ProductQuickView } from "@/components/boutique/product-quick-view";
import { CartDrawer } from "@/components/commerce/cart-drawer";

export function ProductDetailClient({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [color, setColor] = useState(product.colors[0].name);
  const addToCart = useProductStore((state) => state.addToCart);
  const wishlist = useProductStore((state) => state.wishlist);
  const toggleWishlist = useProductStore((state) => state.toggleWishlist);
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.collection === product.collection)).slice(0, 4);

  const add = () => {
    addToCart({ product, size, color, quantity: 1 });
    toast.success(`${product.name} sepete eklendi`);
  };

  return (
    <>
      <main className="product-detail-page">
        <Link className="product-back" href="/shop"><ArrowLeft size={17} /> Shop</Link>
        <div className="product-detail-layout">
          <div className="product-detail-media-grid">
            <motion.div className="product-detail-media product-detail-media-main" layoutId={`product-media-${product.slug}`}><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 58vw" /></motion.div>
            <div className="product-detail-media"><Image src={product.alternateImage} alt={`${product.name} alternatif görünüm`} fill sizes="(max-width: 900px) 100vw, 34vw" /></div>
          </div>
          <aside className="product-purchase-panel">
            <div className="product-purchase-meta"><span>{product.collection}</span><span>{product.type}</span></div>
            <h1>{product.name}</h1>
            <div className="product-purchase-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice ? <s>{formatPrice(product.compareAtPrice)}</s> : null}</div>
            <p>{product.description}</p>
            <fieldset><legend>Renk / {color}</legend><div className="color-options">{product.colors.map((option) => <button key={option.name} type="button" className={color === option.name ? "is-active" : ""} style={{ "--swatch": option.value } as CSSProperties} onClick={() => setColor(option.name)} aria-label={option.name} />)}</div></fieldset>
            <fieldset><legend>Beden / {size}</legend><div className="size-options">{product.sizes.map((option) => <button key={option} type="button" className={size === option ? "is-active" : ""} onClick={() => setSize(option)}>{option}</button>)}</div></fieldset>
            <div className="product-purchase-actions"><button className="button button-primary" type="button" onClick={add}><ShoppingBag size={17} /> Sepete ekle</button><button className={`icon-button ${wishlist.includes(product.id) ? "is-active" : ""}`} type="button" onClick={() => toggleWishlist(product.id)}><Heart fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button></div>
            <dl><div><dt>Malzeme</dt><dd>{product.material}</dd></div><div><dt>Kalıp</dt><dd>{product.fit}</dd></div><div><dt>Teslimat</dt><dd>1–3 iş günü. ₺5.000 üzeri ücretsiz.</dd></div></dl>
          </aside>
        </div>
        <section className="related-products"><p className="section-eyebrow">Continue the edit</p><h2>Related objects.</h2><div>{related.map((item) => <BoutiqueProductCard product={item} key={item.id} />)}</div></section>
      </main>
      <ProductQuickView />
      <CartDrawer />
    </>
  );
}
