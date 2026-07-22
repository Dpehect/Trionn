"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { products } from "@/data/products";
import { useUIStore } from "@/store/ui-store";
export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen); const close = useUIStore((s) => s.closeSearch); const [query, setQuery] = useState("");
  const matches = useMemo(() => query.trim() ? products.filter((p) => `${p.name} ${p.category} ${p.collection}`.toLowerCase().includes(query.toLowerCase())).slice(0,7) : products.slice(0,5), [query]);
  return <AnimatePresence>{open ? <motion.div className="fixed inset-0 z-50 bg-[var(--background)]" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}><div className="container-shell py-5"><div className="flex justify-end"><button onClick={close} aria-label="Close search"><X/></button></div><div className="mx-auto mt-16 max-w-4xl"><label className="eyebrow" htmlFor="global-search">Search the collection</label><div className="mt-4 flex items-center border-b-2 border-[var(--foreground)]"><Search/><input id="global-search" autoFocus value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full bg-transparent px-4 py-5 text-3xl outline-none md:text-5xl" placeholder="Coat, knit, Form 01..."/></div><div className="mt-8 divide-y">{matches.map((product)=><Link onClick={close} key={product.id} href={`/product/${product.slug}`} className="flex justify-between py-4 text-lg hover:opacity-50"><span>{product.name}</span><span className="text-sm text-[var(--muted)]">{product.category}</span></Link>)}</div></div></div></motion.div> : null}</AnimatePresence>;
}
