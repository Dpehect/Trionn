import Image from "next/image";
import { notFound } from "next/navigation";
import { collections } from "@/data/editorial";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/commerce/product-grid";
export default async function CollectionPage({ params }: { params: Promise<{slug:string}> }) { const {slug}=await params; const collection=collections.find((item)=>item.slug===slug); if(!collection)notFound(); const collectionProducts=products.filter((p)=>p.collection===collection.title); return <main><section className="container-shell grid gap-7 py-8 lg:grid-cols-[.8fr_1.2fr]"><div className="flex flex-col justify-end"><p className="eyebrow">{collection.season}</p><h1 className="display mt-5">{collection.title}</h1><p className="mt-8 max-w-md text-lg text-[var(--muted)]">{collection.statement}</p></div><div className="media-frame relative aspect-[16/10]"><Image src={collection.image} alt={collection.title} fill priority/></div></section><section className="section-space container-shell border-t"><ProductGrid products={collectionProducts.length?collectionProducts:products.slice(0,6)} columns={3}/></section></main> }
