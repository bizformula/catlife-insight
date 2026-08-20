import ProductFinder from "@/components/finder/ProductFinder";
import { getAllProducts } from "@/lib/products";

export default function FinderPage() {
  const products = getAllProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          캣라이프 인사이트
        </p>

        <h1 className="mb-3 text-3xl font-bold">사료 찾기</h1>

        <p className="text-[var(--muted-foreground)]">
          제품 유형과 표시 원재료를 기준으로 조건에 맞는 제품을 찾아보세요.
        </p>
      </section>

      <ProductFinder products={products} />

      <p className="mt-8 text-xs leading-5 text-[var(--muted-foreground)]">
        검색 결과는 제품에 표시된 원재료 정보를 기준으로 제공됩니다.
        표시되지 않은 원료의 부재나 제조 과정에서의 교차 접촉까지 보장하지
        않습니다. 처방이나 질환 치료를 위한 의료 조언이 아니며, 건강 문제가
        있다면 수의사와 상담하세요.
      </p>
    </main>
  );
}