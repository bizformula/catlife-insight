import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import {
  getAllPosts,
  getCategories,
} from "@/lib/posts";

const baseUrl = "https://catlife.happy-insight.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/compare",
    "/contact",
    "/finder",
    "/ingredient-standards",
    "/privacy",
    "/products",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
  }));

  const productRoutes = getAllProducts().map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  const categoryRoutes = getCategories().map((category) => ({
    url: `${baseUrl}/category/${encodeURIComponent(category)}`,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...postRoutes,
    ...categoryRoutes,
  ];
}