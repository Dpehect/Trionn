import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export default function AdminProducts(){return <main><div className="flex items-end justify-between"><div><p className="eyebrow">Catalogue</p><h1 className="mt-3 text-4xl">Products</h1></div><Button asChild><Link href="/admin/products/new">New product</Link></Button></div><div className="mt-8 overflow-x-auto border"><table className="w-full text-left text-sm"><thead className="border-b bg-[var(--surface)]"><tr><th className="p-4">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead><tbody>{products.map((p)=><tr key={p.id} className="border-b last:border-0"><td className="p-3"><Link href={`/admin/products/${p.slug}`} className="flex items-center gap-3"><Image src={p.image} alt="" width={42} height={56}/><span>{p.name}</span></Link></td><td>{p.category}</td><td>{formatPrice(p.price)}</td><td>{p.stock}</td><td><span className="border px-2 py-1 text-xs">Active</span></td></tr>)}</tbody></table></div></main>}
