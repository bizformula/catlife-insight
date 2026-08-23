// Shared sidebar with site introduction, starter guides, and categories.
import Link from "next/link";
import {
  getAllPosts,
  getCategories,
} from "@/lib/posts";
import { getCategoryName } from "@/lib/site";
import AdPlaceholder from "@/components/blog/AdPlaceholder";

type SidebarProps = {
  showTopAd?: boolean;
};

export default function Sidebar({
  showTopAd = true,
}: SidebarProps) {
  const categories = getCategories().filter(
    (category) => category !== "ingredients"
  );

  const starterGuides = getAllPosts()
    .filter(
      (post) =>
        post.category === "nutrition-guide" ||
        post.category === "ingredients"
    )
    .slice(0, 4);

  return (
    <aside className="space-y-6">
      {showTopAd && (
        <AdPlaceholder position="사이드바 상단" />
      )}

      <section className="rounded-md border border-[var(--border)] p-4">
        <h3 className="mb-2 font-semibold">
          Catlife Insight 소개
        </h3>

        <p className="mb-4 text-sm leading-6">
          고양이의 먹거리부터 생활용품까지, 더 나은 선택을 위한
          정보를 이해하기 쉽게 정리합니다.
        </p>

        <Link
          href="/finder"
          className="inline-block rounded-md bg-[#2563EB] px-4 py-2 text-sm font-semibold !text-white"
        >
          사료 찾기
        </Link>
      </section>

      {starterGuides.length > 0 && (
        <section className="rounded-md border border-[var(--border)] p-4">
          <h3 className="mb-3 font-semibold">
            처음 읽는 가이드
          </h3>

          <ul className="space-y-2 text-sm">
            {starterGuides.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="leading-5"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-md border border-[var(--border)] p-4">
        <h3 className="mb-3 font-semibold">
          카테고리
        </h3>

        <ul className="space-y-2 text-sm">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/category/${encodeURIComponent(category)}`}
              >
                {getCategoryName(category)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}