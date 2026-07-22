export type ProductCategory = "Clothing" | "Shoes" | "Accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  type: string;
  collection: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  alternateImage: string;
  description: string;
  material: string;
  fit: string;
  colors: Array<{ name: string; value: string }>;
  sizes: string[];
  badges: string[];
  featured?: boolean;
};

export type CartLine = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};
