// Server-side helpers for reading markdown posts and building SSG pages.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter } from "@/types/post";
import { CATEGORIES } from "@/lib/site";

const POSTS_DIRECTORY = path.join(
  process.cwd(),
  "content",
  "posts",
);

function normalizeFrontmatter(
  data: Partial<PostFrontmatter>,
): PostFrontmatter {
  return {
    title: data.title ?? "Untitled",
    date: data.date ?? "1970-01-01",
    category: data.category ?? "nutrition-guide",
    description: data.description ?? "",
    thumbnail: data.thumbnail?.trim() || "/next.svg",
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(
    POSTS_DIRECTORY,
    `${slug}.md`,
  );

  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawFile);

  const frontmatter = normalizeFrontmatter(
    data as Partial<PostFrontmatter>,
  );

  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    ...frontmatter,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCategories(): string[] {
  return CATEGORIES.map((category) => category.slug);
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