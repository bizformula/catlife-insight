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
    <div className="space-y-16">
      <section className="overflow-hidden rounded-[28px] border border-[#E5EAF3] bg-gradient-to-br from-[#F8FAFF] via-[#FBFCFF] to-white px-6 py-8 dark:border-[var(--border)] dark:from-[#111827] dark:via-[#101622] dark:to-[var(--background)] sm:px-10 sm:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[-0.01em] text-[#2563EB]">
              고양이 사료 검색 · 비교
            </p>

            <h1 className="mb-6 text-[32px] font-bold leading-[1.22] tracking-[-0.03em] sm:text-[40px] lg:text-[42px]">
              <span className="block">
                피하고 싶은 원료를 제외하고
              </span>
              <span className="block">
                우리 고양이에게 맞는 사료를
              </span>
              <span className="block">
                찾아보세요.
              </span>
            </h1>

            <p className="mb-6 max-w-xl break-keep text-[15px] leading-7 text-[var(--muted-foreground)] sm:text-base">
              원료, 사료 형태, 생애주기, 브랜드 조건으로 등록된 제품을
              찾고 원재료와 영양 정보를 같은 기준으로 비교해보세요.
            </p>

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#DBE7FF] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm dark:border-[var(--border)] dark:bg-[var(--background)]">
                <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                {products.length}개 제품 데이터
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/finder"
                className="rounded-xl bg-[#2563EB] px-6 py-3.5 font-semibold !text-white shadow-sm transition hover:bg-[#1D4ED8]"
              >
                사료 찾기
              </Link>

              <Link
                href="/compare"
                className="rounded-xl border border-[var(--border)] bg-white px-6 py-3.5 font-semibold !text-[var(--foreground)] shadow-sm transition hover:border-[#2563EB] dark:bg-[var(--background)]"
              >
                제품 비교
              </Link>
            </div>
          </div>

          <Link
            href="/finder"
            className="group block"
            aria-label="고양이 사료 찾기로 이동"
          >
            <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_20px_55px_rgba(37,99,235,0.14)] dark:bg-[#111827] dark:shadow-none">
              <Image
                src="/images/home/pola-food-finder-hero.webp"
                alt="폴라와 고양이 사료 검색 및 비교 기능"
                width={1200}
                height={675}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-auto w-full transition duration-300 group-hover:scale-[1.015]"
                priority
              />
            </div>
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
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
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
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
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
            className="rounded-xl border border-[var(--border)] p-6 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
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