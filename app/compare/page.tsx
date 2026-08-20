import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import MobileComparison from "@/components/compare/MobileComparison";
import type {
  NutrientBasis,
  Product,
} from "@/types/product";

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

function formatLifeStage(product: Product) {
  const lifeStageNames = {
    kitten: "자묘",
    adult: "성묘",
    senior: "노령묘",
    all: "전연령",
  };

  return product.lifeStage
    .map((stage) => lifeStageNames[stage])
    .join(", ");
}

export default function ComparePage() {
  const products = getAllProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          캣라이프 인사이트
        </p>

        <h1 className="mb-3 text-3xl font-bold">
          제품 비교
        </h1>

        <p className="text-[var(--muted-foreground)]">
          제품 표시사항과 제조사 공개 정보를 같은 항목으로
          비교합니다.
        </p>
      </header>
    <MobileComparison products={products} />
      <div className="hidden overflow-x-auto rounded-xl border border-[var(--border)] md:block">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-gray-50 dark:bg-gray-900">
              <th className="w-40 p-4 font-semibold">비교 항목</th>

              {products.map((product) => (
                <th
                  key={product.slug}
                  className="min-w-64 p-4"
                >
                  <p className="mb-1 text-xs font-normal text-[#2563EB]">
                    {product.brand}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className="text-base font-bold hover:text-[#2563EB]"
                  >
                    {product.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <CompareRow
              label="제품 구분"
              values={products.map((product) =>
                product.isVeterinaryDiet
                  ? "처방식"
                  : "일반식"
              )}
            />

            <CompareRow
              label="사료 형태"
              values={products.map((product) =>
                product.foodForm === "dry"
                  ? "건식"
                  : "습식"
              )}
            />

            <CompareRow
              label="급여 연령"
              values={products.map(formatLifeStage)}
            />

            <CompareRow
              label="주단백질"
              values={products.map((product) =>
                product.mainProteins.join(", ")
              )}
            />

            <CompareRow
              label="조단백질"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.protein,
                  product.analysisBasis?.protein
                )
              )}
            />

            <CompareRow
              label="조지방"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.fat,
                  product.analysisBasis?.fat
                )
              )}
            />

            <CompareRow
              label="조섬유"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.fiber,
                  product.analysisBasis?.fiber
                )
              )}
            />

            <CompareRow
              label="조회분"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.ash,
                  product.analysisBasis?.ash
                )
              )}
            />

            <CompareRow
              label="수분"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.moisture,
                  product.analysisBasis?.moisture
                )
              )}
            />

            <CompareRow
              label="칼슘"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.calcium,
                  product.analysisBasis?.calcium
                )
              )}
            />

            <CompareRow
              label="인"
              values={products.map((product) =>
                formatNutrient(
                  product.guaranteedAnalysis.phosphorus,
                  product.analysisBasis?.phosphorus
                )
              )}
            />

            <CompareRow
              label="열량"
              values={products.map((product) =>
                product.calories
                  ? `${product.calories.toLocaleString()} kcal/kg`
                  : "정보 없음"
              )}
            />

            <CompareRow
              label="정보 확인일"
              values={products.map(
                (product) => product.checkedAt
              )}
            />
          </tbody>
        </table>
      </div>

      <section className="mt-8 rounded-xl bg-gray-100 p-5 text-sm leading-6 dark:bg-gray-800">
        <h2 className="mb-2 font-bold">비교 시 유의사항</h2>

        <p>
          보증성분의 ‘이상’, ‘이하’ 값과 제조사가 제시한
          분석값은 의미가 다르므로 숫자만으로 단순한 우열을
          판단할 수 없습니다. 수분 함량이 다른 제품은
          건물 기준으로 다시 계산해야 정확한 비교가 가능합니다.
        </p>
      </section>

      <p className="mt-6 text-xs leading-5 text-[var(--muted-foreground)]">
        이 페이지는 제품 표시정보를 정리한 것이며 특정 질환의
        치료 효과나 특정 제품의 적합성을 판단하지 않습니다.
        처방식의 선택과 변경은 수의사와 상담하세요.
      </p>
    </main>
  );
}

type CompareRowProps = {
  label: string;
  values: string[];
};

function CompareRow({
  label,
  values,
}: CompareRowProps) {
  return (
    <tr className="border-b border-[var(--border)] last:border-b-0">
      <th className="bg-gray-50 p-4 align-top font-semibold dark:bg-gray-900">
        {label}
      </th>

      {values.map((value, index) => (
        <td
          key={`${label}-${index}`}
          className="p-4 align-top"
        >
          {value}
        </td>
      ))}
    </tr>
  );
}