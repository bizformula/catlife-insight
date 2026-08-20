// Post detail page with markdown rendering, TOC, and ad placeholders.
import type { Metadata } from "next";
import AdPlaceholder from "@/components/blog/AdPlaceholder";
import TOC from "@/components/blog/TOC";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import {
  extractToc,
  injectHeadingIds,
  markdownToHtml,
  splitForMiddleAd,
} from "@/lib/markdown";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const toc = extractToc(post.content);
  const [firstPart, secondPart] = splitForMiddleAd(post.content);
  const firstHtml = injectHeadingIds(await markdownToHtml(firstPart), toc);
  const secondHtml = injectHeadingIds(await markdownToHtml(secondPart), toc);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <article className="lg:col-span-7">
        <header className="mb-8 border-b border-[var(--border)] pb-4">
          <p className="text-sm text-gray-500">
            {post.date} · {post.category} · {post.readingTime}
          </p>
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="mt-2">{post.description}</p>
          <div className="mt-6 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[#f8fafc] dark:bg-[#1f2937]">
            <Image
              src={post.thumbnail}
              alt={`${post.title} 대표 이미지`}
              width={1200}
              height={675}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <AdPlaceholder position="포스트 제목 아래" />
        </header>

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: firstHtml }} />
          <AdPlaceholder position="본문 중간" />
          <div dangerouslySetInnerHTML={{ __html: secondHtml }} />
        </div>
        <AdPlaceholder position="본문 끝" />
      </article>

      <div className="space-y-6 lg:col-span-3">
        <TOC items={toc} />
        <Sidebar />
      </div>
    </div>
  );
}
