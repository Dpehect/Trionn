import { notFound } from "next/navigation";
import { getProduct } from "@/data/products";
import { ProductEditor } from "@/components/admin/product-editor";
export default async function EditProduct({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=getProduct(slug);if(!product)notFound();return <main><p className="eyebrow">Catalogue / Edit</p><h1 className="mt-3 text-4xl">{product.name}</h1><ProductEditor product={product}/></main>}
