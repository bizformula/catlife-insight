// Shared sidebar with profile, popular posts, and categories.
import Link from "next/link";
import {
  getCategories,
  getPopularPosts,
} from "@/lib/posts";
import { getCategoryName } from "@/lib/site";
import AdPlaceholder from "@/components/blog/AdPlaceholder";

export default function Sidebar() {
  const popular = getPopularPosts(5);
  const categories = getCategories();

  return (
    <aside className="space-y-6">
      <AdPlaceholder position="사이드바 상단" />

      <section className="rounded-md border border-[var(--border)] p-4">
        <h3 className="mb-2 font-semibold">
          캣라이프 인사이트 소개
        </h3>

        <p className="text-sm">
          고양이의 먹거리부터 생활용품까지, 더 나은 선택을 위한
          정보를 이해하기 쉽게 정리합니다.
        </p>
      </section>

      <section className="rounded-md border border-[var(--border)] p-4">
        <h3 className="mb-2 font-semibold">
          인기글 TOP 5
        </h3>

        <ul className="space-y-2 text-sm">
          {popular.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-md border border-[var(--border)] p-4">
        <h3 className="mb-2 font-semibold">
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