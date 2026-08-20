import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import type {
  IngredientStatus,
  NutrientBasis,
} from "@/types/product";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusNames: Record<IngredientStatus, string> = {
  contains: "표시 원재료에 포함",
  "not-listed": "표시 원재료에 없음",
  unknown: "확인 불가",
};

const ingredientNames = {
  chicken: "닭",
  beef: "소",
  pork: "돼지",
  fish: "생선",
  dairy: "유제품",
  egg: "달걀",
  grain: "곡물",
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const analysis = product.guaranteedAnalysis;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/finder"
        className="mb-6 inline-block text-sm text-[#2563EB] hover:underline"
      >
        ← 사료 찾기로 돌아가기
      </Link>

      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          {product.brand}
        </p>

        <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            {product.productType === "food" ? "사료" : "간식"}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            {product.foodForm === "dry" ? "건식" : "습식"}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            {product.purpose === "complete" ? "주식" : "보조식"}
          </span>
        </div>
      </header>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-xl font-bold">주요 정보</h2>

        <dl className="space-y-3 text-sm">
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 font-semibold">급여 연령</dt>
            <dd>
                {product.lifeStage
                   .map((stage) => lifeStageNames[stage])
                   .join(", ")}
            </dd>
          </div>

          <div className="flex gap-3">
            <dt className="w-24 shrink-0 font-semibold">주단백질</dt>
            <dd>{product.mainProteins.join(", ")}</dd>
          </div>

          <div className="flex gap-3">
            <dt className="w-24 shrink-0 font-semibold">열량</dt>
            <dd>
              {product.calories
                ? `${product.calories.toLocaleString()} kcal/kg`
                : "정보 없음"}
            </dd>
          </div>

          <div className="flex gap-3">
            <dt className="w-24 shrink-0 font-semibold">확인일</dt>
            <dd>{product.checkedAt}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-xl font-bold">등록 성분</h2>

           <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <p>
                 조단백질:{" "}
                 {formatNutrient(
                   analysis.protein,
                   product.analysisBasis?.protein
               )}
              </p>

               <p>
                 조지방:{" "}
                 {formatNutrient(
                   analysis.fat,
                   product.analysisBasis?.fat
            )}
               </p>

                <p>
                  조섬유:{" "}
                  {formatNutrient(
                   analysis.fiber,
                   product.analysisBasis?.fiber
                  )}
               </p>

               <p>
                  조회분:{" "}
                  {formatNutrient(
                   analysis.ash,
                   product.analysisBasis?.ash
                )}
               </p>

                <p>
    수분:{" "}
    {formatNutrient(
      analysis.moisture,
      product.analysisBasis?.moisture
    )}
  </p>

  <p>
    칼슘:{" "}
    {formatNutrient(
      analysis.calcium,
      product.analysisBasis?.calcium
    )}
  </p>

  <p>
    인:{" "}
    {formatNutrient(
      analysis.phosphorus,
      product.analysisBasis?.phosphorus
    )}
  </p>

  <p>
    타우린:{" "}
    {formatNutrient(
      analysis.taurine,
      product.analysisBasis?.taurine
    )}
  </p>
</div>
      </section>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-xl font-bold">원재료</h2>

        <p className="mb-6 text-sm leading-7">
          {product.ingredients.join(", ")}
        </p>

        <h3 className="mb-3 font-bold">원료 분류 상태</h3>

        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(ingredientNames).map(([key, name]) => {
            const status =
              product.ingredientStatus?.[
                key as keyof typeof ingredientNames
              ] ?? "unknown";

            return (
              <div
                key={key}
                className="flex justify-between rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-gray-800"
              >
                <span>{name}</span>
                <span>{statusNames[status]}</span>
              </div>
            );
          })}
        </div>
      </section>

      {product.notes && (
        <p className="mb-8 rounded-xl bg-gray-100 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {product.notes}
        </p>
      )}

      {product.sourceUrl ? (
        <a
          href={product.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white"
        >
          정보 출처 확인
        </a>
      ) : (
        <p className="text-sm text-red-600">
          아직 정보 출처가 등록되지 않은 연습용 제품입니다.
        </p>
      )}

      <p className="mt-8 text-xs leading-5 text-[var(--muted-foreground)]">
        ‘표시 원재료에 없음’은 제조 과정의 교차 접촉이나 복합 원료 내 포함
        가능성까지 보장하지 않습니다. 건강 문제가 있다면 제품 선택 전에
        수의사와 상담하세요.
      </p>
    </main>
  );
}
const lifeStageNames = {
  kitten: "자묘",
  adult: "성묘",
  senior: "노령묘",
  all: "전연령",
};
function formatNutrient(
  value: number | undefined,
  basis: NutrientBasis | undefined
) {
  if (value === undefined) {
    return "정보 없음";
  }

  const basisName = {
    min: "이상",
    max: "이하",
    typical: "분석값",
  };

  return `${value}%${basis ? ` ${basisName[basis]}` : ""}`;
}