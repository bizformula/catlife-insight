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
        <section className="relative isolate overflow-hidden rounded-2xl border border-[#E7ECF4] bg-[#F8FAFF] shadow-sm dark:border-[var(--border)] dark:bg-[#111827]">
          {/* 데스크톱 오른쪽 비주얼 */}
          <div className="absolute inset-y-0 right-0 hidden w-[68%] lg:block">
            <Image
              src="/images/home/pola-food-finder-hero-v2.webp"
              alt=""
              fill
              priority
              sizes="68vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-y-0 left-0 w-[23%] bg-gradient-to-r from-[#F8FAFF] via-[#F8FAFF]/70 to-transparent dark:from-[#111827] dark:via-[#111827]/70" />
          </div>

          <div className="relative z-10 lg:min-h-[410px]">
            {/* 왼쪽 실제 콘텐츠 */}
            <div className="flex min-h-[360px] max-w-[560px] flex-col justify-center px-6 py-9 sm:px-8 lg:min-h-[410px] lg:w-[48%] lg:px-8 xl:px-10">
              <p className="mb-4 text-sm font-bold text-[#2563EB]">
                고양이 사료 검색 · 비교
              </p>

              <h1 className="mb-5 text-[32px] font-bold leading-[1.18] tracking-[-0.045em] sm:text-[38px] lg:text-[35px] xl:text-[39px]">
                <span className="block">
                  피하고 싶은 원료를 제외하고
                </span>

                <span className="block text-[#2563EB]">
                  우리 고양이에게 맞는 사료를
                </span>

                <span className="block">
                  찾아보세요.
                </span>
              </h1>

              <p className="mb-7 max-w-[470px] break-keep text-sm leading-7 text-[#64748B] dark:text-gray-300 sm:text-[15px]">
                원료, 사료 형태, 생애주기, 브랜드 조건으로 등록된 제품을
                찾고 원재료와 영양 정보를 같은 기준으로 비교해보세요.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/finder"
                  className="inline-flex min-w-[124px] items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3.5 text-sm font-bold !text-white shadow-[0_8px_22px_rgba(37,99,235,0.20)] transition hover:bg-[#1D4ED8] sm:text-base"
                >
                  사료 찾기
                </Link>

                <Link
                  href="/compare"
                  className="inline-flex min-w-[124px] items-center justify-center rounded-xl border border-[#CBD5E1] bg-white/95 px-5 py-3.5 text-sm font-bold !text-[#0F172A] shadow-sm transition hover:border-[#2563EB] hover:!text-[#2563EB] sm:text-base dark:border-gray-600 dark:bg-[#1F2937] dark:!text-white"
                >
                  제품 비교
                </Link>


              </div>
            </div>

            {/* 모바일용 비주얼 */}
            <div className="relative min-h-[300px] overflow-hidden bg-[#EEF5FF] sm:min-h-[380px] lg:hidden">
              <Image
                src="/images/home/pola-food-finder-hero-v2.webp"
                alt="고양이 사료 제품과 원재료 비교 기능"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#F8FAFF] to-transparent dark:from-[#111827]" />
            </div>
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
                className="group rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 !text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:shadow-sm"
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