import postsData from "@/generated/posts.json";
import type { Post } from "@/types/post";
import { CATEGORIES } from "@/lib/site";

const posts = postsData as Post[];

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post {
  const post = posts.find(
    (item) => item.slug === slug,
  );

  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }

  return post;
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => (a.date < b.date ? 1 : -1),
  );
}

export function getCategories(): string[] {
  return CATEGORIES.map(
    (category) => category.slug,
  );
}

export function getPostsByCategory(
  category: string,
): Post[] {
  return getAllPosts().filter(
    (post) =>
      post.category.toLowerCase() ===
      decodeURIComponent(category).toLowerCase(),
  );
}

export function getPopularPosts(
  limit = 5,
): Post[] {
  return getAllPosts()
    .sort((a, b) =>
      a.readingTime < b.readingTime ? 1 : -1,
    )
    .slice(0, limit);
}