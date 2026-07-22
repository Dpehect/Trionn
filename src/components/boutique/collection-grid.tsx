"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { collections } from "@/data/catalog";

export function CollectionGrid() {
  return (
    <section className="collection-section section-shell" id="collections">
      <div className="section-index">08 / COLLECTIONS</div>
      <div className="collection-heading"><p className="section-eyebrow">Choose a direction</p><h2>Six edits. Every arrow opens the collection.</h2></div>
      <div className="collection-grid">
        {collections.map((collection, index) => (
          <motion.div key={collection.slug} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
            <Link className="collection-card" href={`/shop?collection=${encodeURIComponent(collection.filter)}`} style={{ "--collection-accent": collection.accent } as CSSProperties}>
              <div className="collection-card-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{collection.filter}</span></div>
              <div className="collection-orbit" aria-hidden><i /><i /><i /></div>
              <div className="collection-card-copy"><h3>{collection.title}</h3><p>{collection.description}</p></div>
              <span className="collection-arrow" aria-hidden><ArrowUpRight /></span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
