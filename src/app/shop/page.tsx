import { Suspense } from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { ShopClient } from "@/components/boutique/shop-client";

export const metadata = { title: "Shop", description: "Shop TRIONN clothing, shoes and limited accessories." };

export default function ShopPage() {
  return <div className="product-site"><SiteHeader /><Suspense fallback={<div className="site-loading"><span>T/</span><p>Loading the edit…</p></div>}><ShopClient /></Suspense><SiteFooter /></div>;
}
