"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "@/store/use-product-store";

const links = [
  ["New", "/shop?collection=All"],
  ["Clothing", "/shop?collection=Clothing"],
  ["Shoes", "/shop?collection=Shoes"],
  ["Collections", "/#collections"],
  ["Style", "/#style-intelligence"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useProductStore((state) => state.cart);
  const wishlist = useProductStore((state) => state.wishlist);
  const setCartOpen = useProductStore((state) => state.setCartOpen);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Trionn butik ana sayfa"><span className="wordmark-symbol">T/</span><span>TRIONN</span></Link>
      <nav className="desktop-nav" aria-label="Ana navigasyon">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
      <div className="header-tools"><Link href="/shop" aria-label="Ara"><Search size={18} /></Link><Link href="/shop?wishlist=true" aria-label={`Favoriler ${wishlist.length}`}><Heart size={18} /><span>{wishlist.length || ""}</span></Link><button type="button" onClick={() => setCartOpen(true)} aria-label={`Sepet ${count}`}><ShoppingBag size={18} /><span>{count || ""}</span></button></div>
      <button className="menu-button" type="button" aria-label="Menüyü aç veya kapat" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      {menuOpen ? <div className="mobile-menu">{links.map(([label, href]) => <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}<button type="button" onClick={() => { setMenuOpen(false); setCartOpen(true); }}>Bag / {count}</button></div> : null}
    </header>
  );
}
