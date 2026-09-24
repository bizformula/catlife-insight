import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const products = getAllProducts();

  const featuredSlugs = [
    "nutro-wholesome-essentials-adult-salmon-brown-rice",
    "instinct-original-pate-real-duck-cat",
    "farmina-nd-prime-lamb-blueberry-adult",
    "royal-canin-indoor-gravy",
  ];

  const featuredProducts = featuredSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    return product ? [product] : [];
  });

  return (
    <div className="space-y-14">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] px-6 pb-8 pt-6 sm:px-10 sm:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-3 text-sm font-semibold text-[#2563EB]">
              고양이 사료 검색 · 비교
            </p>

            <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">
              피하고 싶은 원료를 제외하고
              <br />
              우리 고양이에게 맞는 사료를 찾아보세요.
            </h1>

            <p className="mb-5 max-w-3xl break-keep leading-7 text-[var(--muted-foreground)]">
              등록된 고양이 사료와 간식을 원료, 사료 형태, 생애주기,
              브랜드 등의 조건으로 찾고 원재료와 영양 정보를 같은 기준으로
              비교할 수 있습니다.
            </p>

            <p className="mb-8 text-sm font-semibold text-[var(--foreground)]">
              현재 {products.length}개 제품 데이터
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/finder"
                className="rounded-lg bg-[#2563EB] px-6 py-3 font-semibold !text-white"
              >
                사료 찾기
              </Link>

              <Link
                href="/compare"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-6 py-3 font-semibold !text-[var(--foreground)]"
              >
                제품 비교
              </Link>
            </div>
          </div>

          <Link
            href="/finder"
            className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
            aria-label="고양이 사료 찾기로 이동"
          >
            <Image
              src="/images/home/pola-food-finder-hero.webp"
              alt="폴라와 고양이 사료 검색 및 비교 기능"
              width={1200}
              height={675}
              className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
              priority
            />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold">
              등록 사료 미리보기
            </h2>

            <p className="text-sm text-[var(--muted-foreground)]">
              Catlife Insight에 등록된 고양이 사료 중 일부입니다.
            </p>
          </div>

          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-[#2563EB]"
          >
            등록 제품 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.slug}
              className="rounded-xl border border-[var(--border)] p-4 transition hover:border-[#2563EB] hover:shadow-sm"
            >
              <Link
                href={`/products/${product.slug}`}
                className="block !text-[var(--foreground)]"
              >
                <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`${product.name} 제품 이미지`}
                      width={220}
                      height={220}
                      className="h-full w-full object-contain p-3"
                    />
                  ) : (
                    <span className="px-3 text-center text-xs text-gray-400">
                      이미지 준비 중
                    </span>
                  )}
                </div>

                <p className="mb-1 text-sm font-semibold text-[#2563EB]">
                  {product.brand}
                </p>

                <h3 className="break-keep font-bold leading-6">
                  {product.name}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                    {product.productType === "food" ? "사료" : "간식"}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                    {product.foodForm === "dry"
                      ? "건식"
                      : product.foodForm === "wet"
                        ? "습식"
                        : "분말"}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          주요 기능
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/finder"
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] hover:border-[#2563EB]"
          >
            <p className="mb-2 text-sm font-semibold text-[#2563EB]">
              조건 검색
            </p>

            <h3 className="mb-3 text-xl font-bold">
              사료 찾기
            </h3>

            <p className="text-sm leading-6">
              피하고 싶은 원료와 제품 조건을 적용하여 등록된
              제품을 찾아봅니다.
            </p>
          </Link>

          <Link
            href="/compare"
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] hover:border-[#2563EB]"
          >
            <p className="mb-2 text-sm font-semibold text-[#2563EB]">
              항목별 확인
            </p>

            <h3 className="mb-3 text-xl font-bold">
              제품 비교
            </h3>

            <p className="text-sm leading-6">
              선택한 제품의 원재료, 표시 성분과 열량을 같은
              항목으로 비교합니다.
            </p>
          </Link>

          <Link
            href="/category/ingredients"
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] hover:border-[#2563EB]"
          >
            <p className="mb-2 text-sm font-semibold text-[#2563EB]">
              원료 정보
            </p>

            <h3 className="mb-3 text-xl font-bold">
              원료 사전
            </h3>

            <p className="text-sm leading-6">
              사료에 표시되는 원료의 명칭과 원재료 목록에서
              확인할 점을 살펴봅니다.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold">
              최근 업데이트
            </h2>

            <p className="text-sm text-[var(--muted-foreground)]">
              새로 등록된 고양이 먹거리와 생활 정보입니다.
            </p>
          </div>

          <Link
            href="/blog"
            className="shrink-0 text-sm font-semibold text-[#2563EB]"
          >
            전체 글 보기 →
          </Link>
        </div>

        <div className="space-y-4">
          {latestPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] p-6 sm:p-8">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          폴라의 경험에서 시작했습니다
        </p>

        <h2 className="mb-4 text-2xl font-bold">
          사료를 고르는 어려움을 줄이고 싶었습니다.
        </h2>

        <p className="break-keep leading-7 text-[var(--muted-foreground)]">
          알레르기 항목과 건강검진 결과를 함께 살펴보며 제품의
          원재료를 일일이 확인했던 경험을 바탕으로 만들고 있습니다.
        </p>
      </section>
    </div>
  );
}