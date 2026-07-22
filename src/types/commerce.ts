export type ProductColor = { name: string; value: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "Outerwear" | "Knitwear" | "Shirts" | "Trousers" | "Accessories";
  collection: "Form 01" | "Night Study" | "Permanent";
  price: number;
  compareAtPrice?: number;
  image: string;
  alternateImage: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  badges: string[];
  description: string;
  material: string;
  fit: string;
  featured?: boolean;
  stock: number;
};
