import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

type ProductsPageProps = {
  searchParams: Promise<{
    brand?: string;
  }>;
};

const lifeStageNames = {
  kitten: "자묘",
  adult: "성묘",
  senior: "노령묘",
  all: "전연령",
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = getAllProducts();
  const { brand } = await searchParams;

  const brands = Array.from(
    new Set(products.map((product) => product.brand))
  ).sort((a, b) => a.localeCompare(b, "ko"));

  const selectedBrand = brand?.trim() ?? "";

  const visibleProducts = selectedBrand
    ? products.filter(
        (product) => product.brand === selectedBrand
      )
    : products;

  return (
    <main>
      <header className="mb-8">
        
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="mb-3 text-3xl font-bold">
              등록 제품
            </h1>

            <p className="text-[var(--muted-foreground)]">
              등록된 고양이 사료와 간식의 기본 정보를
              확인하세요.
            </p>
          </div>

          <p className="text-sm text-[var(--muted-foreground)]">
            전체 {products.length}개
          </p>
        </div>
      </header>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-5">
        <h2 className="mb-4 text-lg font-bold">
          브랜드별 보기
        </h2>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className={
              selectedBrand === ""
                ? "rounded-full border border-[#2563EB] bg-[#2563EB] px-4 py-2 text-sm !text-white"
                : "rounded-full border border-[var(--border)] px-4 py-2 text-sm !text-[var(--foreground)] hover:border-[#2563EB]"
            }
          >
            전체 {products.length}
          </Link>

          {brands.map((brandName) => {
            const productCount = products.filter(
              (product) => product.brand === brandName
            ).length;

            const isSelected =
              selectedBrand === brandName;

            return (
              <Link
                key={brandName}
                href={`/products?brand=${encodeURIComponent(
                  brandName
                )}`}
                className={
                  isSelected
                    ? "rounded-full border border-[#2563EB] bg-[#2563EB] px-4 py-2 text-sm !text-white"
                    : "rounded-full border border-[var(--border)] px-4 py-2 text-sm !text-[var(--foreground)] hover:border-[#2563EB]"
                }
              >
                {brandName} {productCount}
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">
            {selectedBrand || "전체 제품"}
          </h2>

          <span className="text-sm text-[var(--muted-foreground)]">
            총 {visibleProducts.length}개
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {visibleProducts.map((product) => (
            <article
              key={product.slug}
              className="rounded-xl border border-[var(--border)] p-4 transition hover:border-[#2563EB] hover:shadow-sm"
            >
              <div className="flex gap-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white"
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`${product.name} 제품 이미지`}
                      width={160}
                      height={180}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="px-2 text-center text-xs text-gray-400">
                      이미지 준비 중
                    </span>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-sm text-[#2563EB]">
                    {product.brand}
                  </p>

                  <h3 className="mb-3 break-keep text-lg font-bold">
                    <Link
                      href={`/products/${product.slug}`}
                      className="!text-[var(--foreground)] hover:!text-[#2563EB]"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                      {product.productType === "food"
                        ? "사료"
                        : "간식"}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                      {product.foodForm === "dry"
                        ? "건식"
                        : "습식"}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                      {product.lifeStage
                        .map(
                          (stage) =>
                            lifeStageNames[stage]
                        )
                        .join(", ")}
                    </span>

                    {product.isVeterinaryDiet && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                        처방식
                      </span>
                    )}
                  </div>
                  {product.summary && (
  <p className="mt-3 line-clamp-2 break-keep text-sm leading-6 text-[var(--muted-foreground)]">
    {product.summary}
  </p>
)}
                </div>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-[#2563EB] hover:underline"
              >
                상세정보 보기 →
              </Link>
            </article>
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] p-8 text-center">
            <p className="font-semibold">
              해당 브랜드의 등록 제품이 없습니다.
            </p>
          </div>
        )}
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/finder"
          className="rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold !text-white"
        >
          조건으로 사료 찾기
        </Link>

        <Link
          href="/compare"
          className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold !text-[var(--foreground)] hover:border-[#2563EB]"
        >
          제품 비교하기
        </Link>
      </div>
    </main>
  );
}