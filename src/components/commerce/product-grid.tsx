import type { Product } from "@/types/commerce";
import { ProductCard } from "@/components/commerce/product-card";
export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 2 | 3 | 4 }) {
  const classes = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : columns === 3 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4";
  return <div className={`grid gap-x-3 gap-y-10 md:gap-x-5 ${classes}`}>{products.map((product,index)=><ProductCard key={product.id} product={product} priority={index<4}/>)}</div>;
}
