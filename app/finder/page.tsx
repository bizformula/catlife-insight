import ProductFinder from "@/components/finder/ProductFinder";
import { getAllProducts } from "@/lib/products";
import Link from "next/link";

export default function FinderPage() {
  const products = getAllProducts();

  return (
    <main>
      <section className="mb-8">
        
        <h1 className="mb-3 text-3xl font-bold">사료 찾기</h1>

        <p className="text-[var(--muted-foreground)]">
          제품 유형과 표시 원재료를 기준으로 조건에 맞는 제품을 찾아보세요.
        </p>
      </section>

<div className="mb-8 flex flex-wrap gap-3">
  <Link
    href="/products"
    className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold !text-[var(--foreground)] transition hover:border-[#2563EB]"
  >
    전체 등록 제품 보기
  </Link>

  <Link
    href="/compare"
    className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold !text-[var(--foreground)] transition hover:border-[#2563EB]"
  >
    제품 비교하기
  </Link>
</div>

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