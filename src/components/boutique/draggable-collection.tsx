"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ArrowLeft, ArrowRight, ArrowUpRight, GripHorizontal, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, products } from "@/data/catalog";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useProductStore } from "@/store/use-product-store";

gsap.registerPlugin(Draggable, InertiaPlugin);

const selection = products.slice(8, 18);

export function DraggableCollection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const movedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reduced = useReducedMotion();
  const addToCart = useProductStore((state) => state.addToCart);
  const selected = selection[selectedIndex];

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || reduced) return;

    const getBounds = () => ({ minX: Math.min(0, viewport.clientWidth - track.scrollWidth), maxX: 0 });
    const draggable = Draggable.create(track, {
      type: "x",
      bounds: getBounds(),
      inertia: true,
      dragClickables: true,
      allowEventDefault: true,
      edgeResistance: 0.9,
      dragResistance: 0.025,
      minimumMovement: 5,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() { movedRef.current = false; },
      onDrag() { if (Math.abs(this.deltaX) > 2) movedRef.current = true; },
      snap: {
        x: (value) => {
          const card = track.querySelector<HTMLElement>(".drag-product-card");
          if (!card) return value;
          const step = card.offsetWidth + 14;
          return Math.max(getBounds().minX, Math.min(0, Math.round(value / step) * step));
        },
      },
    })[0];
    draggableRef.current = draggable;

    const resize = () => draggable.applyBounds(getBounds());
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      draggable.kill();
      draggableRef.current = null;
    };
  }, [reduced]);

  const select = (index: number) => {
    if (movedRef.current) return;
    setSelectedIndex(index);
    const detail = detailRef.current;
    if (detail && !reduced) gsap.fromTo(detail.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.52, stagger: 0.035, ease: "power3.out", overwrite: true });
  };

  const move = (direction: -1 | 1) => {
    const next = (selectedIndex + direction + selection.length) % selection.length;
    setSelectedIndex(next);
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".drag-product-card");
    if (track && card && draggableRef.current) {
      const step = card.offsetWidth + 14;
      const bounds = { minX: Math.min(0, (viewportRef.current?.clientWidth ?? 0) - track.scrollWidth), maxX: 0 };
      const target = Math.max(bounds.minX, Math.min(0, -next * step));
      gsap.to(track, { x: target, duration: 0.7, ease: "power3.inOut", onUpdate: () => draggableRef.current?.update() });
    }
  };

  const add = () => {
    addToCart({ product: selected, size: selected.sizes[Math.floor(selected.sizes.length / 2)], color: selected.colors[0].name, quantity: 1 });
    toast.success(`${selected.name} sepete eklendi`);
  };

  return (
    <section className="draggable-section section-shell" aria-labelledby="draggable-title">
      <div className="section-index">06 / DRAGGABLE EDIT</div>
      <div className="draggable-heading"><div><p className="section-eyebrow">Touch, drag, select</p><h2 id="draggable-title">Move the rail. Choose the object.</h2></div><p>Cards are both draggable and selectable. Click or tap a product to update the information panel; drag the rail to browse with inertia.</p></div>
      <div className="drag-layout">
        <div className="workflow-viewport" ref={viewportRef}>
          <div className="workflow-track" ref={trackRef}>
            {selection.map((product, index) => (
              <button className={`drag-product-card ${selectedIndex === index ? "is-selected" : ""}`} key={product.id} type="button" onClick={() => select(index)} aria-pressed={selectedIndex === index}>
                <span className="drag-card-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="drag-card-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 68vw, 27vw" draggable={false} /></div>
                <div className="drag-card-copy"><strong>{product.name}</strong><span>{product.type}</span></div>
                <GripHorizontal className="drag-card-grip" size={19} />
              </button>
            ))}
          </div>
        </div>
        <div className="drag-detail" ref={detailRef} aria-live="polite">
          <div className="drag-detail-meta"><span>{selected.collection}</span><span>{String(selectedIndex + 1).padStart(2, "0")} / {selection.length}</span></div>
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
          <div className="drag-detail-price">{formatPrice(selected.price)}</div>
          <div className="drag-detail-actions"><button className="button button-acid" type="button" onClick={add}><ShoppingBag size={17} /> Sepete ekle</button><Link className="button button-outline-light" href={`/product/${selected.slug}`}>Ürünü aç <ArrowUpRight size={17} /></Link></div>
          <div className="drag-nav"><button type="button" onClick={() => move(-1)} aria-label="Önceki ürün"><ArrowLeft /></button><button type="button" onClick={() => move(1)} aria-label="Sonraki ürün"><ArrowRight /></button></div>
        </div>
      </div>
      <div className="drag-instruction"><span>DRAG / SWIPE</span><i /><span>CLICK TO SELECT</span></div>
    </section>
  );
}
