import productsData from "@/generated/products.json";
import type { Product } from "@/types/product";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return [...products];
}

export function getProductBySlug(
  slug: string,
): Product | undefined {
  return products.find(
    (product) => product.slug === slug,
  );
}
