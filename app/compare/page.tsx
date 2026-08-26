import type { Metadata } from "next";
import ProductComparison from "@/components/compare/ProductComparison";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "제품 비교",
  description:
    "고양이 사료와 간식의 원재료, 표시 성분과 제조사 공개 정보를 같은 항목으로 비교하세요.",
  alternates: {
    canonical: "/compare",
  },
};

type ComparePageProps = {
  searchParams: Promise<{
    first?: string | string[];
    second?: string | string[];
  }>;
};

function getSingleValue(
  value: string | string[] | undefined
) {
  return Array.isArray(value)
    ? value[0]
    : value;
}

export default async function ComparePage({
  searchParams,
}: ComparePageProps) {
  const products = getAllProducts();
  const params = await searchParams;

  const firstSlug = getSingleValue(
    params.first
  );

  const secondSlug = getSingleValue(
    params.second
  );

  return (
    <main>
      <header className="mb-8">
        
        <h1 className="mb-3 text-3xl font-bold">
          제품 비교
        </h1>

        <p className="text-[var(--muted-foreground)]">
          비교할 제품 두 개를 선택하면 제품
          표시사항과 제조사 공개 정보를 같은
          항목으로 확인할 수 있습니다.
        </p>
      </header>

      <ProductComparison
        products={products}
        initialFirstSlug={firstSlug}
        initialSecondSlug={secondSlug}
      />

      <section className="mt-8 rounded-xl bg-gray-100 p-5 text-sm leading-6 dark:bg-gray-800">
        <h2 className="mb-2 font-bold">
          비교 시 유의사항
        </h2>

        <p>
          보증성분의 ‘이상’, ‘이하’ 값과
          제조사가 제시한 분석값은 의미가
          다르므로 숫자만으로 단순한 우열을
          판단할 수 없습니다. 수분 함량이
          다른 제품은 건물 기준으로 다시
          계산해야 정확하게 비교할 수 있습니다.
        </p>
      </section>

      <p className="mt-6 text-xs leading-5 text-[var(--muted-foreground)]">
        이 페이지는 제품 표시정보를 정리한
        것이며 특정 질환의 치료 효과나 특정
        제품의 적합성을 판단하지 않습니다.
        처방식의 선택과 변경은 수의사와
        상담하세요.
      </p>
    </main>
  );
}