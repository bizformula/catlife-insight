// Category page listing posts filtered by dynamic category name.
import type { Metadata } from "next";
import {
  notFound,
  permanentRedirect,
} from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import {
  getCategories,
  getPostsByCategory,
} from "@/lib/posts";
import { getCategoryName } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ name: string }>;
};

type ResolvedCategory = {
  slug: string;
  shouldRedirect: boolean;
};

function safeDecodeCategoryName(
  value: string
): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveCategory(
  value: string
): ResolvedCategory | null {
  const categories = getCategories();

  const exactMatch = categories.find(
    (category) => category === value
  );

  if (exactMatch) {
    return {
      slug: exactMatch,
      shouldRedirect: false,
    };
  }

  /*
   * Google 등에 색인된 비정상 카테고리 URL 중
   * 정상 카테고리 slug 뒤에 ":"와 임의 문자열이
   * 붙은 경우 정상 카테고리로 영구 이동시킵니다.
   *
   * 예:
   * nutrition-guide:abc123
   * → nutrition-guide
   */
  const prefixedMatch = categories.find(
    (category) =>
      value.startsWith(`${category}:`)
  );

  if (prefixedMatch) {
    return {
      slug: prefixedMatch,
      shouldRedirect: true,
    };
  }

  return null;
}

export async function generateStaticParams() {
  return getCategories().map((name) => ({
    name: encodeURIComponent(name),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const decoded =
    safeDecodeCategoryName(name);

  const resolved =
    resolveCategory(decoded);

  if (!resolved) {
    return {
      title: "카테고리를 찾을 수 없습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `카테고리: ${getCategoryName(
      resolved.slug
    )}`,
    alternates: {
      canonical: `/category/${encodeURIComponent(
        resolved.slug
      )}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { name } = await params;
  const decoded =
    safeDecodeCategoryName(name);

  const resolved =
    resolveCategory(decoded);

  if (!resolved) {
    notFound();
  }

  if (resolved.shouldRedirect) {
    permanentRedirect(
      `/category/${encodeURIComponent(
        resolved.slug
      )}`
    );
  }

  const posts =
    getPostsByCategory(resolved.slug);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-10">
      <section className="space-y-6 lg:col-span-7">
        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-bold">
            {getCategoryName(
              resolved.slug
            )}
          </h1>

          <p className="text-[var(--muted-foreground)]">
            {resolved.slug ===
            "ingredients"
              ? "사료와 간식에 표시되는 원료의 이름과 확인할 점을 정리합니다."
              : `${getCategoryName(
                  resolved.slug
                )}에 관한 글을 모아봅니다.`}
          </p>
        </header>

        {posts.length === 0 ? (
          <p>
            해당 카테고리의 글이
            없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
            />
          ))
        )}
      </section>

      <div className="lg:col-span-3">
        <Sidebar />
      </div>
    </div>
  );
}