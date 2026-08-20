import fs from "fs";
import path from "path";
import type { Product } from "@/types/product";

const productsDirectory = path.join(process.cwd(), "content/products");

export function getAllProducts(): Product[] {
  if (!fs.existsSync(productsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(productsDirectory)
    .filter((fileName) => fileName.endsWith(".json"));

  return fileNames.map((fileName) => {
    const filePath = path.join(productsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    return JSON.parse(fileContents) as Product;
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}