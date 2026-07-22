"use client";
import { products } from "@/data/products";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductGrid } from "@/components/commerce/product-grid";
export default function WishlistPage(){const ids=useWishlistStore((s)=>s.ids);const selected=products.filter((p)=>ids.includes(p.id));return <main className="container-shell py-12"><p className="eyebrow">Saved edit</p><h1 className="display mt-5">Wishlist.</h1><div className="mt-14">{selected.length?<ProductGrid products={selected}/>:<div className="grid min-h-80 place-items-center border text-center"><div><p className="text-xl">No saved pieces yet.</p><p className="mt-2 text-[var(--muted)]">Use the heart on any product to build your edit.</p></div></div>}</div></main>}
