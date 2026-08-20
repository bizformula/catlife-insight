import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import { getAllPosts } from "@/lib/posts";

const POSTS_PER_PAGE = 6;

type HomePageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomePageProps) {
  const posts = getAllPosts();
  const { page } = await searchParams;

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

  const startIndex =
    (currentPage - 1) * POSTS_PER_PAGE;

  const visiblePosts = posts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <section className="lg:col-span-7">
        <h1 className="mb-5 text-2xl font-bold">
          최신 글
        </h1>

        <div className="space-y-4">
          {visiblePosts.map((post, index) => (
            <div key={post.slug}>
              <PostCard post={post} />

              {index === 2 && (
                <div
                  className="mt-4 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-[var(--border)] text-sm text-[var(--muted-foreground)]"
                  aria-label="광고 영역"
                >
                  광고 영역
                </div>
              )}
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
                    ? "/"
                    : `/?page=${currentPage - 1}`
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
                      ? "/"
                      : `/?page=${pageNumber}`
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
                href={`/?page=${currentPage + 1}`}
                className="rounded-md border border-[var(--border)] px-3 py-2 text-sm !text-[var(--foreground)] hover:border-[#2563EB]"
              >
                다음
              </Link>
            )}
          </nav>
        )}
      </section>

      <div className="lg:col-span-3">
        <Sidebar />
      </div>
    </div>
  );
}