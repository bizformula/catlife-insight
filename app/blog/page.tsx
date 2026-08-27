import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import { getAllPosts } from "@/lib/posts";
import AdPlaceholder from "@/components/blog/AdPlaceholder";

const POSTS_PER_PAGE = 6;

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function getBlogPagination(page?: string) {
  const posts = getAllPosts();
  const requestedPage = Number(page ?? "1");

  const totalPages = Math.max(
    1,
    Math.ceil(posts.length / POSTS_PER_PAGE)
  );

  const currentPage =
    Number.isInteger(requestedPage) &&
    requestedPage >= 1 &&
    requestedPage <= totalPages
      ? requestedPage
      : 1;

  return {
    posts,
    totalPages,
    currentPage,
  };
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const { currentPage } = getBlogPagination(page);

  return {
    title:
      currentPage === 1
        ? "블로그"
        : `블로그 ${currentPage}페이지`,
    description:
      "고양이의 먹거리와 건강, 생활에 관한 정보를 정리합니다.",
    alternates: {
      canonical:
        currentPage === 1
          ? "/blog"
          : `/blog?page=${currentPage}`,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const { page } = await searchParams;

  const {
    posts,
    totalPages,
    currentPage,
  } = getBlogPagination(page);

  const startIndex =
    (currentPage - 1) * POSTS_PER_PAGE;

  const visiblePosts = posts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <section className="lg:col-span-7">
        <header className="mb-6">
          <h1 className="mb-3 text-3xl font-bold">
            블로그
          </h1>

          <p className="text-[var(--muted-foreground)]">
            고양이의 먹거리와 건강, 생활에 관한 정보를
            정리합니다.
          </p>
        </header>

        <div className="space-y-4">
          {visiblePosts.map((post, index) => (
            <div key={post.slug}>
              <PostCard post={post} />

              
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            aria-label="게시글 페이지 이동"
          >
            {currentPage > 1 && (
              <Link
                href={
                  currentPage - 1 === 1
                    ? "/blog"
                    : `/blog?page=${currentPage - 1}`
                }
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm !text-[var(--foreground)] hover:border-[#2563EB]"
              >
                이전
              </Link>
            )}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => {
              const isCurrent =
                pageNumber === currentPage;

              return (
                <Link
                  key={pageNumber}
                  href={
                    pageNumber === 1
                      ? "/blog"
                      : `/blog?page=${pageNumber}`
                  }
                  aria-current={
                    isCurrent ? "page" : undefined
                  }
                  className={
                    isCurrent
                      ? "rounded-md bg-[#2563EB] px-3 py-2 text-sm font-semibold !text-white"
                      : "rounded-md border border-[var(--border)] px-3 py-2 text-sm !text-[var(--foreground)] hover:border-[#2563EB]"
                  }
                >
                  {pageNumber}
                </Link>
              );
            })}

            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm !text-[var(--foreground)] hover:border-[#2563EB]"
              >
                다음
              </Link>
            )}
          </nav>
        )}
      </section>

      <div className="space-y-6 lg:col-span-3">
        <Sidebar />

        <div className="hidden lg:sticky lg:top-24 lg:block">
          <AdPlaceholder position="사이드바 고정 광고" />
        </div>
      </div>
    </div>
  );
}