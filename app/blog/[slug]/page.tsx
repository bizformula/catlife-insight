// Post detail page with markdown rendering, responsive TOC,
// related posts, and ad placeholders.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import AdPlaceholder from "@/components/blog/AdPlaceholder";
import TOC from "@/components/blog/TOC";
import Sidebar from "@/components/layout/Sidebar";

import {
  extractToc,
  injectHeadingIds,
  markdownToHtml,
  splitForMiddleAd,
} from "@/lib/markdown";

import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/posts";

import { getCategoryName } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const toc = extractToc(post.content);

  const [firstPart, secondPart] =
    splitForMiddleAd(post.content);

  const firstHtml = injectHeadingIds(
    await markdownToHtml(firstPart),
    toc
  );

  const secondHtml = injectHeadingIds(
    await markdownToHtml(secondPart),
    toc
  );

  const guideCategories = [
    "nutrition-guide",
    "ingredients",
  ];

  const relatedPosts = getAllPosts()
    .filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const getScore = (category: string) => {
        if (category === post.category) {
          return 0;
        }

        if (
          guideCategories.includes(post.category) &&
          guideCategories.includes(category)
        ) {
          return 1;
        }

        return 2;
      };

      const scoreDifference =
        getScore(a.category) - getScore(b.category);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <article className="lg:col-span-7">
        <header className="mb-8 border-b border-[var(--border)] pb-4">
          <p className="mb-3 text-sm text-gray-500">
            {post.date} ·{" "}
            {getCategoryName(post.category)} · 읽는 시간 약{" "}
            {post.readingTime.replace(
              " min read",
              "분"
            )}
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-[var(--muted-foreground)]">
            {post.description}
          </p>

          <AdPlaceholder position="포스트 제목 아래" />

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
        </header>

        {toc.length > 0 && (
          <div className="mb-8 lg:hidden">
            <TOC items={toc} />
          </div>
        )}

        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: firstHtml,
            }}
          />

          <AdPlaceholder position="본문 중간" />

          <div
            dangerouslySetInnerHTML={{
              __html: secondHtml,
            }}
          />
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-10 border-t border-[var(--border)] pt-8">
            <h2 className="mb-5 text-xl font-bold">
              다음 읽을 글
            </h2>

            <div className="space-y-4">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="block rounded-lg border border-[var(--border)] p-4"
                >
                  <p className="mb-2 text-sm text-[var(--muted-foreground)]">
                    {getCategoryName(item.category)}
                  </p>

                  <h3 className="font-semibold leading-6">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <AdPlaceholder position="본문 끝" />
        </div>
      </article>

      <div className="space-y-6 lg:col-span-3">
        {toc.length > 0 && (
          <div className="hidden lg:block">
            <TOC items={toc} />
          </div>
        )}

        <Sidebar />

        <div className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
          <AdPlaceholder position="사이드바 고정 광고" />
        </div>
      </div>
    </div>
  );
}