import { products } from "@/data/products";
import type { Product } from "@/types/commerce";

export interface CatalogService {
  listProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
}

export const localCatalogService: CatalogService = {
  async listProducts() { return products; },
  async getProduct(slug) { return products.find((product) => product.slug === slug); },
};

// Replace this service with Shopify Storefront API, Medusa or your backend.
export const catalogService = localCatalogService;
