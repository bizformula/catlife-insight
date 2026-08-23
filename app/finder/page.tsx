import ProductFinder from "@/components/finder/ProductFinder";
import { getAllProducts } from "@/lib/products";

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

        <p className="text-[var(--muted-foreground)]">
          급여 연령과 사료 형태, 피하고 싶은 원료를 선택해
          조건에 맞는 사료를 찾아보세요.
        </p>
      </header>

      <ProductFinder products={products} />
    </main>
  );
}