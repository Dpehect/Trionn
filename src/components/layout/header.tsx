"use client";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";

export function Header() {
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const openCart = useUIStore((state) => state.openCart);
  const openMenu = useUIStore((state) => state.openMenu);
  const openSearch = useUIStore((state) => state.openSearch);
  return <header className="sticky top-0 z-40 border-b bg-[color:var(--background)]/95 backdrop-blur">
    <div className="container-shell flex h-16 items-center justify-between">
      <button className="focus-ring md:hidden" aria-label="Open menu" onClick={openMenu}><Menu size={20}/></button>
      <Link href="/" className="focus-ring text-xl font-semibold tracking-[.18em]">{siteConfig.name}</Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
        {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} className="focus-ring text-xs uppercase tracking-[.14em] hover:opacity-55">{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-4">
        <button className="focus-ring hidden sm:block" aria-label="Search" onClick={openSearch}><Search size={18}/></button>
        <Link href="/account" className="focus-ring hidden sm:block" aria-label="Account"><UserRound size={18}/></Link>
        <button className="focus-ring relative" aria-label={`Open cart with ${count} items`} onClick={openCart}><ShoppingBag size={19}/>{count > 0 ? <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[var(--accent)] text-[10px] text-white">{count}</span> : null}</button>
      </div>
    </div>
  </header>;
}
