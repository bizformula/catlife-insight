// Blog post data contracts used across pages/components.
export type PostFrontmatter = {
  title: string;
  date: string;
  updated?: string;
  category: string;
  description: string;
  thumbnail: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};
