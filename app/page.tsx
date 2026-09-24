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

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="5.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15 15L20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path
        d="M12 3V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 5H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 7L3 13H9L6 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18 7L15 13H21L18 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4 21H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path
        d="M4 5.5C4 4.67 4.67 4 5.5 4H10C11.1 4 12 4.9 12 6V20C12 18.9 11.1 18 10 18H5.5C4.67 18 4 18.67 4 19.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5C20 4.67 19.33 4 18.5 4H14C12.9 4 12 4.9 12 6V20C12 18.9 12.9 18 14 18H18.5C19.33 18 20 18.67 20 19.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Catlife Insight",
    alternateName: "캣라이프 인사이트",
    url: "https://catlife.happy-insight.com/",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      <div className="space-y-10">
        {/* Hero */}
        <section className="overflow-hidden rounded-2xl bg-[#F8FAFF] dark:bg-[#111827]">
          <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
            {/* 왼쪽 텍스트 영역 */}
            <div className="flex min-h-[300px] flex-col justify-center px-6 py-7 sm:px-8 lg:px-6 lg:py-6 xl:px-8">
              <p className="mb-3 text-xs font-semibold text-[#2563EB] sm:text-sm">
                고양이 사료 검색 · 비교
              </p>

              <h1 className="mb-4 text-[27px] font-bold leading-[1.25] tracking-[-0.035em] sm:text-[30px] lg:text-[28px] xl:text-[30px]">
                <span className="block lg:whitespace-nowrap">
                  피하고 싶은 원료를 제외하고
                </span>

                <span className="block lg:whitespace-nowrap">
                  우리 고양이에게 맞는 사료를
                </span>

                <span className="block">
                  찾아보세요.
                </span>
              </h1>

              <p className="mb-5 max-w-[390px] break-keep text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm sm:leading-6">
                원료, 사료 형태, 생애주기, 브랜드 조건으로 등록된 제품을
                찾고 원재료와 영양 정보를 같은 기준으로 비교해보세요.
              </p>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/finder"
                  className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-[#1D4ED8]"
                >
                  사료 찾기
                </Link>

                <Link
                  href="/compare"
                  className="rounded-lg border border-[#D9E0EB] bg-white px-5 py-2.5 text-sm font-semibold !text-[var(--foreground)] shadow-sm transition hover:border-[#2563EB] dark:border-[var(--border)] dark:bg-[var(--background)]"
                >
                  제품 비교
                </Link>
              </div>
            </div>

            {/* 오른쪽 이미지 영역 */}
            <Link
              href="/finder"
              aria-label="고양이 사료 찾기로 이동"
              className="group block"
            >
              <div className="relative min-h-[260px] w-full overflow-hidden bg-[#EEF5FF] sm:min-h-[320px] lg:h-[300px] lg:min-h-0">
                <Image
                  src="/images/home/pola-food-finder-hero.webp"
                  alt="폴라와 고양이 사료 검색 및 비교 기능"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 62vw"
                  className="object-cover object-center transition duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </Link>
          </div>
        </section>

        {/* 주요 기능 */}
        <section>
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">
            주요 기능
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            <Link
              href="/finder"
              className="group rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF5FF] text-[#2563EB] dark:bg-[#172554]">
                  <SearchIcon />
                </div>

                <div>
                  <h3 className="mb-1 text-base font-bold group-hover:text-[#2563EB]">
                    사료 찾기
                  </h3>

                  <p className="break-keep text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm">
                    피하고 싶은 원료와 제품 조건을 적용하여 등록된 제품을
                    찾아봅니다.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/compare"
              className="group rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF5FF] text-[#2563EB] dark:bg-[#172554]">
                  <CompareIcon />
                </div>

                <div>
                  <h3 className="mb-1 text-base font-bold group-hover:text-[#2563EB]">
                    제품 비교
                  </h3>

                  <p className="break-keep text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm">
                    선택한 제품의 원재료, 표시 성분과 열량을 같은 항목으로
                    비교합니다.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/category/ingredients"
              className="group rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EFF5FF] text-[#2563EB] dark:bg-[#172554]">
                  <BookIcon />
                </div>

                <div>
                  <h3 className="mb-1 text-base font-bold group-hover:text-[#2563EB]">
                    원료 사전
                  </h3>

                  <p className="break-keep text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm">
                    사료에 표시되는 원료의 명칭과 원재료 목록에서 확인할
                    점을 살펴봅니다.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 등록 사료 미리보기 */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="mb-1 text-xl font-bold sm:text-2xl">
                등록 사료 미리보기
              </h2>

              <p className="text-xs text-[var(--muted-foreground)] sm:text-sm">
                Catlife Insight에 등록된 고양이 사료 중 일부입니다.
              </p>
            </div>

            <Link
              href="/products"
              className="shrink-0 text-xs font-semibold text-[#2563EB] sm:text-sm"
            >
              등록된 {products.length}개 제품 보기 →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 !text-[var(--foreground)] transition hover:border-[#2563EB] hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-[70px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={`${product.name} 제품 이미지`}
                        width={90}
                        height={110}
                        className="h-full w-full object-contain p-1.5"
                      />
                    ) : (
                      <span className="px-1 text-center text-[10px] text-gray-400">
                        이미지 준비 중
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[11px] font-semibold text-[#2563EB]">
                      {product.brand}
                    </p>

                    <h3 className="line-clamp-2 break-keep text-xs font-bold leading-4 group-hover:text-[#2563EB] sm:text-sm sm:leading-5">
                      {product.name}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] dark:bg-gray-800">
                        {product.productType === "food" ? "사료" : "간식"}
                      </span>

                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] dark:bg-gray-800">
                        {product.foodForm === "dry"
                          ? "건식"
                          : product.foodForm === "wet"
                            ? "습식"
                            : "분말"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 최근 업데이트 */}
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

        {/* 폴라 이야기 */}
        <section className="rounded-2xl border border-[var(--border)] p-6 sm:p-8">
          <p className="mb-2 text-sm font-semibold text-[#2563EB]">
            폴라의 경험에서 시작했습니다
          </p>

          <h2 className="mb-4 text-2xl font-bold">
            사료를 고르는 어려움을 줄이고 싶었습니다.
          </h2>

          <p className="break-keep leading-7 text-[var(--muted-foreground)]">
            알레르기 항목과 건강검진 결과를 함께 살펴보며 제품의 원재료를
            일일이 확인했던 경험을 바탕으로 만들고 있습니다.
          </p>
        </section>
      </div>
    </>
  );
}