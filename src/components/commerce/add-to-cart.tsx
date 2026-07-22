"use client";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/types/commerce";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function AddToCart({ product }: { product: Product }) {
  const [size,setSize]=useState(""); const [color,setColor]=useState(product.colors[0].name); const add=useCartStore((s)=>s.add); const open=useUIStore((s)=>s.openCart);
  const submit=()=>{ if(!size){toast.error("Select a size first");return;} add({product,size,color,quantity:1});toast.success("Added to bag");open(); };
  return <div><div><div className="flex justify-between text-sm"><span>Color</span><span className="text-[var(--muted)]">{color}</span></div><div className="mt-3 flex gap-3">{product.colors.map((item)=><button key={item.name} onClick={()=>setColor(item.name)} aria-label={item.name} className={cn("size-8 rounded-full border-2 border-[var(--background)] outline outline-1", color===item.name ? "outline-[var(--foreground)]" : "outline-transparent")} style={{backgroundColor:item.value}}/>)}</div></div><div className="mt-7"><div className="flex justify-between text-sm"><span>Size</span><button className="underline underline-offset-4">Size guide</button></div><div className="mt-3 grid grid-cols-5 gap-2">{product.sizes.map((item)=><button key={item} onClick={()=>setSize(item)} className={cn("border py-3 text-sm transition", size===item ? "bg-[var(--foreground)] text-[var(--background)]" : "hover:bg-[var(--surface)]")}>{item}</button>)}</div></div><Button size="lg" className="mt-7 w-full" onClick={submit}>Add to bag</Button><p className="mt-3 text-center text-xs text-[var(--muted)]">Free shipping over ₺5,000 · 14-day returns</p></div>;
}
