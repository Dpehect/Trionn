"use client";

import { flushSync } from "react-dom";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { BoutiqueProductCard } from "@/components/boutique/boutique-product-card";
import { products } from "@/data/catalog";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(Flip);

const filters = ["All", "Clothing", "Shoes", "Accessories"] as const;
type Filter = (typeof filters)[number];

export function FlipProductGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [dense, setDense] = useState(false);
  const reduced = useReducedMotion();
  const visible = useMemo(() => products.filter((product) => filter === "All" || product.category === filter).slice(0, dense ? 16 : 12), [dense, filter]);

  const updateLayout = (nextFilter: Filter = filter, nextDense = dense) => {
    const root = rootRef.current;
    if (!root || reduced) {
      setFilter(nextFilter);
      setDense(nextDense);
      return;
    }
    const cards = root.querySelectorAll<HTMLElement>("[data-flip-card]");
    const state = Flip.getState(cards);
    flushSync(() => {
      setFilter(nextFilter);
      setDense(nextDense);
    });
    requestAnimationFrame(() => {
      Flip.from(state, {
        targets: root.querySelectorAll("[data-flip-card]"),
        duration: 0.85,
        ease: "power4.inOut",
        absoluteOnLeave: true,
        fade: true,
        stagger: 0.025,
        prune: true,
      });
    });
  };

  return (
    <section className="shop-edit section-shell" id="edit" ref={rootRef}>
      <div className="section-index">03 / GSAP FLIP SHOP</div>
      <div className="shop-edit-head">
        <div><p className="section-eyebrow">Current boutique selection</p><h2>The edit changes shape around what you choose.</h2></div>
        <p>Filter the collection and the product layout reforms with GSAP Flip. Select any object for a Motion-powered quick view.</p>
      </div>
      <div className="shop-toolbar">
        <div className="shop-filters" role="tablist" aria-label="Ürün kategorileri">
          {filters.map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} className={filter === item ? "is-active" : ""} onClick={() => updateLayout(item, dense)}>{item}<span>{products.filter((product) => item === "All" || product.category === item).length}</span></button>)}
        </div>
        <button className="density-toggle" type="button" onClick={() => updateLayout(filter, !dense)} aria-pressed={dense}><SlidersHorizontal size={15} /> {dense ? "Editorial grid" : "Dense grid"}</button>
      </div>
      <div className={`boutique-product-grid ${dense ? "is-dense" : ""}`}>
        {visible.map((product, index) => <BoutiqueProductCard product={product} priority={index < 4} key={product.id} />)}
      </div>
      <a className="section-text-link" href="/shop">Tüm ürünleri aç <ArrowRight size={18} /></a>
    </section>
  );
}
