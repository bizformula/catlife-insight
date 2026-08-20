import Link from "next/link";
import type {
  NutrientBasis,
  Product,
} from "@/types/product";

type MobileComparisonProps = {
  products: Product[];
};

function formatNutrient(
  value: number | undefined,
  basis: NutrientBasis | undefined
) {
  if (value === undefined) {
    return "정보 없음";
  }

  const basisNames = {
    min: "이상",
    max: "이하",
    typical: "분석값",
  };

  return `${value}%${basis ? ` ${basisNames[basis]}` : ""}`;
}

export default function MobileComparison({
  products,
}: MobileComparisonProps) {
  const comparisonProducts = products.slice(0, 2);

  return (
    <section className="md:hidden">
      <div className="overflow-hidden rounded-xl border border-[var(--border)]">
        <div className="grid grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)] bg-[var(--muted)]">
          <div className="p-3 text-xs font-semibold">
            비교 항목
          </div>

          {comparisonProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="min-w-0 border-l border-[var(--border)] p-3"
            >
              <p className="truncate text-xs text-[#2563EB]">
                {product.brand}
              </p>

              <p className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-[var(--foreground)]">
                {product.name}
              </p>
            </Link>
          ))}
        </div>

        <MobileRow
          label="구분"
          values={comparisonProducts.map((product) =>
            product.isVeterinaryDiet
              ? "처방식"
              : "일반식"
          )}
        />

        <MobileRow
          label="주단백질"
          values={comparisonProducts.map((product) =>
            product.mainProteins.join(", ")
          )}
        />

        <MobileRow
          label="단백질"
          values={comparisonProducts.map((product) =>
            formatNutrient(
              product.guaranteedAnalysis.protein,
              product.analysisBasis?.protein
            )
          )}
        />

        <MobileRow
          label="지방"
          values={comparisonProducts.map((product) =>
            formatNutrient(
              product.guaranteedAnalysis.fat,
              product.analysisBasis?.fat
            )
          )}
        />

        <MobileRow
          label="수분"
          values={comparisonProducts.map((product) =>
            formatNutrient(
              product.guaranteedAnalysis.moisture,
              product.analysisBasis?.moisture
            )
          )}
        />

        <MobileRow
          label="칼슘"
          values={comparisonProducts.map((product) =>
            formatNutrient(
              product.guaranteedAnalysis.calcium,
              product.analysisBasis?.calcium
            )
          )}
        />

        <MobileRow
          label="인"
          values={comparisonProducts.map((product) =>
            formatNutrient(
              product.guaranteedAnalysis.phosphorus,
              product.analysisBasis?.phosphorus
            )
          )}
        />

        <MobileRow
          label="열량"
          values={comparisonProducts.map((product) =>
            product.calories
              ? `${product.calories.toLocaleString()} kcal/kg`
              : "정보 없음"
          )}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-[var(--muted-foreground)]">
        제품명을 누르면 전체 원재료와 상세 성분을 확인할 수 있습니다.
      </p>
    </section>
  );
}

type MobileRowProps = {
  label: string;
  values: string[];
};

function MobileRow({
  label,
  values,
}: MobileRowProps) {
  return (
    <div className="grid grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)] border-t border-[var(--border)] text-xs">
      <div className="bg-[var(--muted)] p-3 font-semibold">
        {label}
      </div>

      {values.map((value, index) => (
        <div
          key={`${label}-${index}`}
          className="break-words border-l border-[var(--border)] p-3 leading-5"
        >
          {value}
        </div>
      ))}
    </div>
  );
}