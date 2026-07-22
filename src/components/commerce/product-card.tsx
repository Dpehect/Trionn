"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/commerce";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Badge } from "@/components/ui/badge";
export function ProductCard({ product, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const toggle = useWishlistStore((s) => s.toggle); const liked = useWishlistStore((s) => s.ids.includes(product.id));
  const add = useCartStore((s) => s.add); const openCart = useUIStore((s) => s.openCart);
  const quickAdd = () => { add({ product, size: "M", color: product.colors[0].name, quantity: 1 }); toast.success(`${product.name} added to bag`); openCart(); };
  return <article className={cn("group", className)}>
    <div className="media-frame relative aspect-[3/4]"><Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`}><Image src={product.image} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="transition duration-700 group-hover:scale-[1.025] group-hover:opacity-0"/><Image src={product.alternateImage} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="opacity-0 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"/></Link>
    <div className="absolute left-3 top-3 flex gap-2">{product.badges.map((b)=><Badge key={b} className="bg-[var(--background)]">{b}</Badge>)}</div><button onClick={()=>toggle(product.id)} className="absolute right-3 top-3 grid size-9 place-items-center bg-[var(--background)]" aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}><Heart size={16} fill={liked ? "currentColor" : "none"}/></button><button onClick={quickAdd} className="absolute bottom-3 right-3 grid size-11 translate-y-3 place-items-center bg-[var(--foreground)] text-[var(--background)] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" aria-label={`Quick add ${product.name}`}><Plus size={18}/></button></div>
    <div className="mt-3 flex items-start justify-between gap-4"><div><Link href={`/product/${product.slug}`} className="font-medium hover:opacity-55">{product.name}</Link><p className="mt-1 text-xs text-[var(--muted)]">{product.subtitle}</p></div><div className="text-right text-sm"><span>{formatPrice(product.price)}</span>{product.compareAtPrice ? <span className="ml-2 text-[var(--muted)] line-through">{formatPrice(product.compareAtPrice)}</span> : null}</div></div>
  </article>;
}
