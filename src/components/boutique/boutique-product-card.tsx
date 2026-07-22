"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "@/types/commerce";
import { formatPrice } from "@/data/catalog";
import { useProductStore } from "@/store/use-product-store";

export function BoutiqueProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const setActiveProduct = useProductStore((state) => state.setActiveProduct);
  const addToCart = useProductStore((state) => state.addToCart);
  const wishlist = useProductStore((state) => state.wishlist);
  const toggleWishlist = useProductStore((state) => state.toggleWishlist);
  const liked = wishlist.includes(product.id);

  const quickAdd = () => {
    addToCart({ product, size: product.sizes[Math.floor(product.sizes.length / 2)], color: product.colors[0].name, quantity: 1 });
    toast.success(`${product.name} sepete eklendi`);
  };

  return (
    <motion.article className="boutique-product-card" data-flip-card data-product-id={product.id}>
      <motion.div className="boutique-product-media" layoutId={`product-media-${product.slug}`}>
        <button className="product-image-button" type="button" onClick={() => setActiveProduct(product)} aria-label={`${product.name} hızlı görünümünü aç`}>
          <Image src={product.image} alt={product.name} fill priority={priority} sizes="(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 25vw" className="product-image product-image-primary" />
          <Image src={product.alternateImage} alt="" fill sizes="(max-width: 720px) 50vw, 25vw" className="product-image product-image-secondary" />
        </button>
        <div className="product-badges">{product.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
        <button className={`product-wishlist ${liked ? "is-active" : ""}`} type="button" onClick={() => toggleWishlist(product.id)} aria-label={liked ? "Favorilerden çıkar" : "Favorilere ekle"}><Heart size={17} fill={liked ? "currentColor" : "none"} /></button>
        <button className="product-quick-add" type="button" onClick={quickAdd} aria-label={`${product.name} hızlı sepete ekle`}><Plus size={18} /></button>
      </motion.div>
      <div className="boutique-product-info">
        <div><Link href={`/product/${product.slug}`}>{product.name}</Link><span>{product.type} / {product.collection}</span></div>
        <div className="product-price"><b>{formatPrice(product.price)}</b>{product.compareAtPrice ? <s>{formatPrice(product.compareAtPrice)}</s> : null}</div>
      </div>
    </motion.article>
  );
}
