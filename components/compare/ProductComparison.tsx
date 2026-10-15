"use client";

import Link from "next/link";
import { useState } from "react";
import type {
  NutrientBasis,
  NutrientKey,
  Product,
} from "@/types/product";

type ProductComparisonProps = {
  products: Product[];
  initialFirstSlug?: string;
  initialSecondSlug?: string;
};

type ComparisonRow = {
  label: string;
  getValue: (product: Product) => string;
};

function formatNutrient(
  value: number | undefined,
  basis: NutrientBasis | undefined
) {
  if (value === undefined) {
    return "정보 없음";
  }

  const basisNames: Record<
    NutrientBasis,
    string
  > = {
    min: "이상",
    max: "이하",
    typical: "분석값",
  };

  return `${value}%${
    basis ? ` ${basisNames[basis]}` : ""
  }`;
}

function formatLifeStage(
  product: Product
) {
  const lifeStageNames = {
    kitten: "자묘",
    adult: "성묘",
    senior: "노령묘",
    all: "전연령",
  };

  return product.lifeStage
    .map(
      (stage) =>
        lifeStageNames[stage]
    )
    .join(", ");
}

function nutrientValue(
  product: Product,
  key: NutrientKey
) {
  return formatNutrient(
    product.guaranteedAnalysis[key],
    product.analysisBasis?.[key]
  );
}

const comparisonRows: ComparisonRow[] = [
  {
    label: "제품 구분",
    getValue: (product) =>
      product.isVeterinaryDiet
        ? "처방식"
        : "일반식",
  },
  {
  label: "사료 형태",

  getValue: (product) =>
    product.foodForm === "dry"
      ? "건식"
      : product.foodForm === "wet"
        ? "습식"
        : "분말",
},
  {
    label: "급여 연령",
    getValue: formatLifeStage,
  },
  {
    label: "주단백질",
    getValue: (product) =>
      product.mainProteins.join(", "),
  },
  {
    label: "조단백질",
    getValue: (product) =>
      nutrientValue(product, "protein"),
  },
  {
    label: "조지방",
    getValue: (product) =>
      nutrientValue(product, "fat"),
  },
  {
    label: "조섬유",
    getValue: (product) =>
      nutrientValue(product, "fiber"),
  },
  {
    label: "조회분",
    getValue: (product) =>
      nutrientValue(product, "ash"),
  },
  {
    label: "수분",
    getValue: (product) =>
      nutrientValue(product, "moisture"),
  },
  {
    label: "칼슘",
    getValue: (product) =>
      nutrientValue(product, "calcium"),
  },
  {
    label: "인",
    getValue: (product) =>
      nutrientValue(product, "phosphorus"),
  },
  {
    label: "열량",
    getValue: (product) =>
      product.calories
        ? `${product.calories.toLocaleString()} kcal/kg`
        : "정보 없음",
  },
  {
    label: "정보 확인일",
    getValue: (product) =>
      product.checkedAt,
  },
];

type Insight = { title: string; body: string };

const FORM_NAMES: Record<Product["foodForm"], string> = {
  dry: "건식", wet: "습식", powder: "분말",
};

const GROUP_NAMES: Record<string, string> = {
  chicken: "닭", turkey: "칠면조", duck: "오리", quail: "메추리",
  beef: "소", pork: "돼지", fish: "생선", dairy: "유제품",
  egg: "달걀", grain: "곡류", legume: "콩류",
  pseudograin: "유사곡물", starch: "전분류", vegetable: "채소",
};

function groupNames(product: Product) {
  return Object.entries(product.ingredientStatus ?? {})
    .filter(([, status]) => status === "contains")
    .map(([group]) => GROUP_NAMES[group] ?? group);
}

function leadInsight(a: Product, b: Product): string {
  if (a.isVeterinaryDiet !== b.isVeterinaryDiet) {
    const veterinary = a.isVeterinaryDiet ? a : b;
    const regular = a.isVeterinaryDiet ? b : a;
    return `이번 비교의 핵심은 영양성분 수치보다 급여 목적입니다. ${veterinary.name}은(는) 처방식이고 ${regular.name}은(는) 일반식입니다. 처방식이 필요한 상황이라면 수의사의 급여 지침을 우선 확인해야 하며, 두 제품의 단백질·지방 수치만으로 대체 가능성을 판단할 수 없습니다.`;
  }
  if (a.foodForm !== b.foodForm) {
    return `두 제품은 사료 형태가 달라 비교 기준부터 확인해야 합니다. ${a.name}은(는) ${FORM_NAMES[a.foodForm]}, ${b.name}은(는) ${FORM_NAMES[b.foodForm]}으로, 수분 함량의 영향 때문에 영양성분 표시 비율을 그대로 맞대어 비교하기 어렵습니다. 급여 방식과 고양이의 수분 섭취 환경을 함께 고려해 보세요.`;
  }
  const common = a.mainProteins.filter((item) => b.mainProteins.includes(item));
  const aOnly = a.mainProteins.filter((item) => !b.mainProteins.includes(item));
  const bOnly = b.mainProteins.filter((item) => !a.mainProteins.includes(item));
  if (aOnly.length || bOnly.length) {
    return `두 제품은 모두 ${FORM_NAMES[a.foodForm]}이지만 주단백질 원료 구성이 다릅니다. ${common.length ? `공통 표기 원료는 ${common.slice(0, 2).join(", ")}이며, ` : ""}원료를 피해야 하는 고양이라면 영양성분 숫자보다 각 제품의 전체 원재료 목록을 먼저 확인하는 것이 유용합니다. 주단백질 목록에 없다는 사실만으로 해당 원료가 전혀 없다고 단정할 수는 없습니다.`;
  }
  return `두 제품은 ${FORM_NAMES[a.foodForm]}이며 주요 원료 표기가 비슷합니다. 이번 비교에서는 단순한 우열보다 급여 연령, 표시 영양성분의 기준, 원재료 세부 목록을 확인해 차이를 판단하는 편이 유용합니다.`;
}

function productConsiderations(product: Product, other: Product): string {
  if (product.isVeterinaryDiet) {
    return "처방식이므로 수의사가 안내한 급여 목적·기간·변경 조건이 가장 중요한 확인사항입니다. 일반식보다 영양 표시값이 낮거나 높다는 이유만으로 제품을 평가하지 마세요.";
  }
  if (other.isVeterinaryDiet) {
    return "일반식으로 등록된 제품입니다. 비교 대상 처방식을 대신할 목적으로 선택하기보다는 해당 고양이에게 처방식이 필요한지 먼저 확인하는 것이 중요합니다.";
  }
  const own = groupNames(product);
  const otherGroups = groupNames(other);
  const unique = own.filter((group) => !otherGroups.includes(group));
  if (unique.length) {
    return `비교 제품에는 포함 표시가 없고 이 제품에는 표시된 원료군으로 ${unique.slice(0, 3).join(", ")}이(가) 있습니다. 해당 원료를 피하려는 경우 전체 원재료와 제조사 최신 표시를 확인하세요. 상대 제품의 '미표기'는 무함유 보증이 아닙니다.`;
  }
  if (product.lifeStage.join(",") !== other.lifeStage.join(",")) {
    return `급여 연령 표시가 ${formatLifeStage(product)}으로, 비교 제품과 다릅니다. 고양이의 생애주기에 해당하는지 확인하세요.`;
  }
  return "두 제품의 큰 분류 차이만으로 선택을 결정하기는 어렵습니다. 원재료 세부 목록과 표시 정보의 출처를 확인하고, 고양이의 기호성과 급여 이력을 함께 고려해 보세요.";
}

function focusedDifferences(a: Product, b: Product): Insight[] {
  const result: Insight[] = [];
  if (a.isVeterinaryDiet !== b.isVeterinaryDiet) {
    result.push({ title: "가장 중요한 차이 · 급여 목적", body: "처방식과 일반식은 사용 목적이 다릅니다. 처방식이 필요한 경우 수의사 지침을 우선하고, 성분 수치만으로 서로 대체하지 마세요." });
  } else if (a.foodForm !== b.foodForm) {
    result.push({ title: "가장 중요한 차이 · 사료 형태", body: "건식·습식 등 형태가 다르면 수분 차이로 표시 영양성분 비율을 직접 비교하기 어렵습니다. 상세표의 수치는 제품 표시값으로 확인하세요." });
  }
  const aGroups = groupNames(a);
  const bGroups = groupNames(b);
  const onlyA = aGroups.filter((x) => !bGroups.includes(x));
  const onlyB = bGroups.filter((x) => !aGroups.includes(x));
  if (onlyA.length || onlyB.length) {
    const parts = [
      onlyA.length ? `A에만 포함 표시: ${onlyA.slice(0, 4).join(", ")}` : "",
      onlyB.length ? `B에만 포함 표시: ${onlyB.slice(0, 4).join(", ")}` : "",
    ].filter(Boolean);
    result.push({ title: "원료군에서 확인할 차이", body: `${parts.join(" / ")}. 이는 등록된 표시정보의 차이이며, 미표기 제품의 해당 원료 부재나 교차 접촉 방지를 보증하지 않습니다.` });
  } else {
    const aOnly = a.mainProteins.filter((x) => !b.mainProteins.includes(x));
    const bOnly = b.mainProteins.filter((x) => !a.mainProteins.includes(x));
    if (aOnly.length || bOnly.length) {
      result.push({ title: "주단백질 원료의 차이", body: `A에만 표기: ${aOnly.slice(0, 3).join(", ") || "없음"} / B에만 표기: ${bOnly.slice(0, 3).join(", ") || "없음"}. 전체 원재료 표기로 다시 확인하세요.` });
    }
  }
  if (a.lifeStage.join(",") !== b.lifeStage.join(",")) {
    result.push({ title: "급여 연령 확인", body: `A는 ${formatLifeStage(a)}, B는 ${formatLifeStage(b)} 표시입니다. 실제 급여 대상 연령을 확인하세요.` });
  }
  if (result.length < 3 && a.foodForm === b.foodForm && a.calories && b.calories && Math.abs(a.calories - b.calories) >= 300) {
    const high = a.calories > b.calories ? "A" : "B";
    result.push({ title: "열량 밀도의 차이", body: `제품 표시 열량은 A ${a.calories.toLocaleString()} kcal/kg, B ${b.calories.toLocaleString()} kcal/kg입니다. ${high}의 표시 열량이 더 높지만, 필요 급여량과 적합성은 고양이 상태 및 제품 급여 지침에 따라 달라집니다.` });
  }
  if (result.length === 0) {
    result.push({ title: "주요 분류는 유사합니다", body: "등록된 원료군·제품 유형에서 뚜렷한 차이가 적습니다. 상세표에서 영양성분 표시 기준과 제조사 최신 원재료 목록을 확인하세요." });
  }
  return result.slice(0, 3);
}

function InsightList({ insights }: { insights: Insight[] }) {
  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <div key={insight.title} className="border-l-2 border-[var(--point)] pl-4">
          <h4 className="mb-1 text-sm font-bold">{insight.title}</h4>
          <p className="break-keep text-sm leading-7 text-[var(--muted-foreground)]">{insight.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProductComparison({
  products,
  initialFirstSlug,
  initialSecondSlug,
}: ProductComparisonProps) {
  const farmina = products.find(
    (product) =>
      product.slug ===
      "farmina-vet-life-ultrahypo-feline"
  );

  const pureNature = products.find(
    (product) =>
      product.slug ===
      "pure-nature-cat-chicken"
  );

  const validInitialFirst =
    products.some(
      (product) =>
        product.slug === initialFirstSlug
    )
      ? initialFirstSlug
      : undefined;

  const validInitialSecond =
    products.some(
      (product) =>
        product.slug ===
        initialSecondSlug
    )
      ? initialSecondSlug
      : undefined;

  const defaultFirstSlug =
    validInitialFirst ??
    farmina?.slug ??
    products[0]?.slug ??
    "";

  const fallbackSecond =
    pureNature?.slug ??
    products.find(
      (product) =>
        product.slug !==
        defaultFirstSlug
    )?.slug ??
    "";

  const defaultSecondSlug =
    validInitialSecond &&
    validInitialSecond !==
      defaultFirstSlug
      ? validInitialSecond
      : fallbackSecond ===
          defaultFirstSlug
        ? products.find(
            (product) =>
              product.slug !==
              defaultFirstSlug
          )?.slug ?? ""
        : fallbackSecond;

  const [
    firstSlug,
    setFirstSlug,
  ] = useState(defaultFirstSlug);

  const [
    secondSlug,
    setSecondSlug,
  ] = useState(defaultSecondSlug);

  const firstProduct =
    products.find(
      (product) =>
        product.slug === firstSlug
    );

  const secondProduct =
    products.find(
      (product) =>
        product.slug === secondSlug
    );

  if (
    !firstProduct ||
    !secondProduct
  ) {
    return (
      <p className="rounded-xl border border-[var(--border)] p-5">
        비교할 제품이 부족합니다.
      </p>
    );
  }

  return (
    <>
      <section className="mb-8 grid gap-4 rounded-xl border border-[var(--border)] p-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            첫 번째 제품
          </span>

          <select
            value={firstSlug}
            onChange={(event) =>
              setFirstSlug(
                event.target.value
              )
            }
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm"
          >
            {products.map(
              (product) => (
                <option
                  key={product.slug}
                  value={product.slug}
                  disabled={
                    product.slug ===
                    secondSlug
                  }
                >
                  {product.brand} ·{" "}
                  {product.name}
                </option>
              )
            )}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            두 번째 제품
          </span>

          <select
            value={secondSlug}
            onChange={(event) =>
              setSecondSlug(
                event.target.value
              )
            }
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm"
          >
            {products.map(
              (product) => (
                <option
                  key={product.slug}
                  value={product.slug}
                  disabled={
                    product.slug ===
                    firstSlug
                  }
                >
                  {product.brand} ·{" "}
                  {product.name}
                </option>
              )
            )}
          </select>
        </label>
      </section>

      <section aria-labelledby="comparison-summary" className="mb-8 space-y-5">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--point-soft)] p-5 sm:p-6">
          <p className="mb-2 text-xs font-semibold text-[var(--point)]">CATLIFE · 선택에 도움이 되는 비교평</p>
          <h2 id="comparison-summary" className="mb-4 text-2xl font-bold">두 사료, 무엇이 가장 다를까요?</h2>
          <p className="break-keep text-[15px] leading-8">{leadInsight(firstProduct, secondProduct)}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[firstProduct, secondProduct].map((product, index) => (
            <article key={product.slug} className="rounded-xl border border-[var(--border)] p-5">
              <p className="mb-1 text-xs font-semibold text-[var(--point)]">제품 {index === 0 ? "A" : "B"} · 선택 시 고려할 점</p>
              <h3 className="mb-3 break-keep font-bold">{product.name}</h3>
              <p className="break-keep text-sm leading-7 text-[var(--muted-foreground)]">{productConsiderations(product, index === 0 ? secondProduct : firstProduct)}</p>
              <Link href={`/products/${product.slug}`} className="mt-4 inline-block text-sm font-semibold text-[var(--point)] hover:underline">제품 상세정보 보기 →</Link>
            </article>
          ))}
        </div>
        <div className="rounded-2xl border border-[var(--border)] p-5 sm:p-6">
          <h3 className="mb-4 text-xl font-bold">선택 전에 확인할 핵심 차이</h3>
          <InsightList insights={focusedDifferences(firstProduct, secondProduct)} />
        </div>
        <p className="text-xs leading-6 text-[var(--muted-foreground)]">이 비교평은 등록된 제조사 공개정보를 바탕으로 규칙에 따라 생성한 참고 설명입니다. 특정 제품의 우수성·알레르기 안전성·의학적 적합성을 판정하지 않습니다.</p>
      </section>

      <details className="rounded-xl border border-[var(--border)]">
        <summary className="cursor-pointer px-4 py-4 text-base font-bold sm:px-5">상세 성분 비교표 보기 (펼치기 / 접기)</summary>
      <section className="overflow-hidden rounded-xl border border-[var(--border)] text-sm text-[#111111] dark:text-[#F3F4F6]">
        <div className="grid grid-cols-[0.7fr_1fr_1fr] bg-gray-50 dark:bg-gray-900">
          <div className="p-3 font-semibold md:p-4">
            비교 항목
          </div>

          {[
            firstProduct,
            secondProduct,
          ].map((product) => (
            <div
              key={product.slug}
              className="min-w-0 border-l border-[var(--border)] p-3 md:p-4"
            >
              <p className="mb-1 text-xs font-normal text-[#111111] dark:text-[#F3F4F6]">
                {product.brand}
              </p>

              <Link
                href={`/products/${product.slug}`}
                className="block break-keep text-sm font-bold leading-5 !text-[#111111] hover:underline dark:!text-[#F3F4F6] md:text-base"
              >
                {product.name}
              </Link>
            </div>
          ))}
        </div>

        {comparisonRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[0.7fr_1fr_1fr] border-t border-[var(--border)]"
          >
            <div className="bg-gray-50 p-3 font-semibold dark:bg-gray-900 md:p-4">
              {row.label}
            </div>

            <div className="min-w-0 break-words border-l border-[var(--border)] p-3 leading-5 md:p-4">
              {row.getValue(
                firstProduct
              )}
            </div>

            <div className="min-w-0 break-words border-l border-[var(--border)] p-3 leading-5 md:p-4">
              {row.getValue(
                secondProduct
              )}
            </div>
          </div>
        ))}
      </section>
      </details>
    </>
  );
}