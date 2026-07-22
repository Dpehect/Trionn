"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Heart, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/data/catalog";
import { useProductStore } from "@/store/use-product-store";

export function ProductQuickView() {
  const product = useProductStore((state) => state.activeProduct);
  const setProduct = useProductStore((state) => state.setActiveProduct);
  const addToCart = useProductStore((state) => state.addToCart);
  const wishlist = useProductStore((state) => state.wishlist);
  const toggleWishlist = useProductStore((state) => state.toggleWishlist);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes[Math.floor(product.sizes.length / 2)]);
    setColor(product.colors[0].name);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setProduct(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [product, setProduct]);

  const add = () => {
    if (!product) return;
    addToCart({ product, size, color, quantity: 1 });
    toast.success(`${product.name} sepete eklendi`);
    setProduct(null);
  };

  return (
    <AnimatePresence>
      {product ? (
        <motion.div className="quick-view-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button className="quick-view-backdrop" type="button" aria-label="Hızlı görünümü kapat" onClick={() => setProduct(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.section className="quick-view" role="dialog" aria-modal="true" aria-label={`${product.name} hızlı görünüm`} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 30 }}>
            <div className="quick-view-media">
              <motion.div className="quick-view-media-inner" layoutId={`product-media-${product.slug}`}>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 52vw" priority />
              </motion.div>
              <button className="quick-view-close" type="button" onClick={() => setProduct(null)} aria-label="Kapat"><X /></button>
            </div>
            <div className="quick-view-content">
              <div className="quick-view-meta"><span>{product.collection}</span><span>{product.type}</span></div>
              <h2>{product.name}</h2>
              <div className="quick-view-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice ? <s>{formatPrice(product.compareAtPrice)}</s> : null}</div>
              <p>{product.description}</p>
              <fieldset><legend>Renk / {color}</legend><div className="color-options">{product.colors.map((option) => <button key={option.name} type="button" className={color === option.name ? "is-active" : ""} style={{ "--swatch": option.value } as CSSProperties} onClick={() => setColor(option.name)} aria-label={option.name} />)}</div></fieldset>
              <fieldset><legend>Beden / {size}</legend><div className="size-options">{product.sizes.map((option) => <button key={option} type="button" className={size === option ? "is-active" : ""} onClick={() => setSize(option)}>{option}</button>)}</div></fieldset>
              <div className="quick-view-actions"><button className="button button-primary" type="button" onClick={add}><ShoppingBag size={17} /> Sepete ekle</button><button className={`icon-button ${wishlist.includes(product.id) ? "is-active" : ""}`} type="button" onClick={() => toggleWishlist(product.id)} aria-label="Favoriye ekle"><Heart fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button></div>
              <Link className="quick-view-full-link" href={`/product/${product.slug}`} onClick={() => setProduct(null)}>Tam ürün sayfasını aç <ArrowUpRight size={17} /></Link>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
