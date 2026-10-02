import type { Metadata } from "next";
import ProductFinder from "@/components/finder/ProductFinder";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "고양이 사료 찾기 | 원료·단백질·지방 조건 검색",
  description:
    "피하고 싶은 원료, 급여 연령, 건식·습식 형태, 브랜드와 조단백질·조지방 표시값 조건으로 등록된 고양이 사료를 찾아보세요.",
  alternates: {
    canonical: "/finder",
  },
};

export default function FinderPage() {
  const products = getAllProducts().filter(
    (product) => product.productType === "food"
  );

  return (
    <main>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold">
          사료 찾기
        </h1>

        <p className="max-w-3xl break-keep leading-7 text-[var(--muted-foreground)]">
          피하고 싶은 원료, 급여 연령, 사료 형태와 브랜드를
          선택하고 조단백질·조지방 표시값 범위까지 설정해
          조건에 맞는 고양이 사료를 찾아보세요.
        </p>
      </header>

      <ProductFinder products={products} />
    </main>
  );
}