import type { Metadata } from "next";
import { ShopClient } from "@/components/commerce/shop-client";
import { products } from "@/data/products";
export const metadata: Metadata = { title: "Shop" };
export default function ShopPage(){ return <main className="container-shell py-10 md:py-16"><div className="border-b pb-10"><p className="eyebrow">All pieces / 18</p><h1 className="display mt-5">Shop.</h1></div><ShopClient initialProducts={products}/></main> }
