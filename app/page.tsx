import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
        {/* 01. 폴라 스토리: 브랜드 소개와 대표 이미지만 배치 */}
        <section className="overflow-hidden rounded-2xl border border-[#EADBCB] bg-[#F7F2EB] shadow-sm dark:border-[var(--border)] dark:bg-[#241F1B]">
          <div className="grid lg:min-h-[390px] lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-9 sm:px-9 lg:px-10 lg:py-12">
              <p className="mb-3 text-xs font-semibold tracking-wide text-[#93613F] dark:text-[#D3A886]">
                CATLIFE INSIGHT · OUR STORY
              </p>
              <h1 className="mb-5 break-keep text-[28px] font-bold leading-tight tracking-[-0.035em] sm:text-[34px] lg:text-[32px] xl:text-[36px]">
                폴라의 경험에서 시작했습니다.
              </h1>
              <p className="max-w-[490px] break-keep text-sm leading-7 text-[#525252] dark:text-gray-300 sm:text-[15px]">
                우리 고양이의 사료를 하나씩 살펴보던 경험이 Catlife Insight의 시작이었습니다.
                원재료와 영양정보를 더 쉽게 확인하고 비교할 수 있도록 정리하고 있습니다.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex w-fit text-sm font-semibold text-[#93613F] hover:underline dark:text-[#D3A886]"
              >
                폴라와 Catlife의 이야기 →
              </Link>
            </div>
            <div className="relative min-h-[255px] overflow-hidden bg-[#F7F2EB] sm:min-h-[340px] lg:min-h-[390px]">
              <Image
                src="/images/home/pola-food-finder-hero-v2.webp"
                alt="폴라와 함께 사료 정보를 살펴보는 Catlife Insight 소개 이미지"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* 02. 제품 탐색: 버튼은 이 섹션에만 노출 */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-7 sm:px-9 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <h2 className="mb-3 text-xl font-bold sm:text-2xl">
                원하는 조건으로 제품 탐색
              </h2>
              <p className="max-w-[670px] break-keep text-sm leading-7 text-[var(--muted-foreground)]">
                원료, 사료 형태, 생애주기, 브랜드 조건으로 등록된 제품을 찾고
                원재료와 영양 정보를 같은 기준으로 비교해보세요.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/finder"
                className="inline-flex min-w-[124px] items-center justify-center rounded-xl bg-[#93613F] px-5 py-3.5 text-sm font-bold !text-white shadow-[0_8px_22px_rgba(185,131,90,0.20)] transition hover:bg-[#805136] sm:text-base"
              >
                사료 찾기
              </Link>
              <Link
                href="/compare"
                className="inline-flex min-w-[124px] items-center justify-center rounded-xl border border-[#D9B08C] bg-[#FFFDF9] px-5 py-3.5 text-sm font-bold !text-[#111111] shadow-sm transition hover:border-[#B9835A] hover:!text-[#93613F] sm:text-base dark:border-gray-600 dark:bg-[#241F1B] dark:!text-white"
              >
                제품 비교
              </Link>
            </div>
          </div>
        </section>

        {/* 03. 등록 사료: 상단 섹션과 같은 외곽 박스 적용 */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
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
              className="shrink-0 text-xs font-semibold text-[#93613F] sm:text-sm"
            >
              등록된 {products.length}개 제품 보기 →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-3.5 !text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[#B9835A] hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-[82px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
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
                    <p className="mb-1 text-xs font-semibold text-[#93613F]">
                      {product.brand}
                    </p>

                    <h3 className="line-clamp-2 break-keep text-[15px] font-bold leading-[1.5] group-hover:text-[#93613F] lg:text-sm xl:text-[15px]">
                      {product.name}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap gap-1">
                      <span className="rounded-full bg-[#F4ECE2] px-2 py-0.5 text-[11px] dark:bg-[#382C25]">
                        {product.productType === "food" ? "사료" : "간식"}
                      </span>

                      <span className="rounded-full bg-[#F4ECE2] px-2 py-0.5 text-[11px] dark:bg-[#382C25]">
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

        {/* 04. 새로운 읽을거리: 이미지 상단 + 가독성 높은 제목 하단 */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold sm:text-2xl">새로운 읽을거리</h2>
            <Link
              href="/blog"
              className="shrink-0 text-xs font-semibold text-[#93613F] sm:text-sm"
            >
              전체 글 보기 →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] !text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[#B9835A] hover:shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FFFDF9] dark:bg-[#241F1B]">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[var(--muted-foreground)]">
                      Catlife Insight
                    </div>
                  )}
                </div>
                <div className="flex min-h-[88px] items-center px-4 py-4 sm:min-h-[92px] sm:px-5">
                  <h3 className="line-clamp-2 break-keep text-[17px] font-bold leading-[1.55] tracking-[-0.015em] group-hover:text-[#93613F] sm:text-[17px] lg:text-[16px] xl:text-[17px]">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}