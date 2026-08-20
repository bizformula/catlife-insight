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

  const basisNames: Record<NutrientBasis, string> = {
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
      product.isVeterinaryDiet ? "처방식" : "일반식",
  },
  {
    label: "사료 형태",
    getValue: (product) =>
      product.foodForm === "dry" ? "건식" : "습식",
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
    getValue: (product) => product.checkedAt,
  },
];

export default function ProductComparison({
  products,
}: ProductComparisonProps) {
  const farmina = products.find(
    (product) =>
      product.slug ===
      "farmina-vet-life-ultrahypo-feline"
  );

  const pureNature = products.find(
    (product) =>
      product.slug === "pure-nature-cat-chicken"
  );

  const [firstSlug, setFirstSlug] = useState(
    farmina?.slug ?? products[0]?.slug ?? ""
  );

  const [secondSlug, setSecondSlug] = useState(
    pureNature?.slug ??
      products[1]?.slug ??
      products[0]?.slug ??
      ""
  );

  const firstProduct = products.find(
    (product) => product.slug === firstSlug
  );

  const secondProduct = products.find(
    (product) => product.slug === secondSlug
  );

  if (!firstProduct || !secondProduct) {
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
              setFirstSlug(event.target.value)
            }
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm"
          >
            {products.map((product) => (
              <option
                key={product.slug}
                value={product.slug}
                disabled={product.slug === secondSlug}
              >
                {product.brand} · {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            두 번째 제품
          </span>

          <select
            value={secondSlug}
            onChange={(event) =>
              setSecondSlug(event.target.value)
            }
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm"
          >
            {products.map((product) => (
              <option
                key={product.slug}
                value={product.slug}
                disabled={product.slug === firstSlug}
              >
                {product.brand} · {product.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="overflow-hidden rounded-xl border border-[var(--border)] text-sm">
        <div className="grid grid-cols-[0.7fr_1fr_1fr] bg-gray-50 dark:bg-gray-900">
          <div className="p-3 font-semibold md:p-4">
            비교 항목
          </div>

          {[firstProduct, secondProduct].map((product) => (
            <div
              key={product.slug}
              className="min-w-0 border-l border-[var(--border)] p-3 md:p-4"
            >
              <p className="mb-1 text-xs font-normal text-[#2563EB]">
                {product.brand}
              </p>

              <Link
                href={`/products/${product.slug}`}
                className="block break-keep text-sm font-bold leading-5 hover:underline md:text-base"
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
              {row.getValue(firstProduct)}
            </div>

            <div className="min-w-0 break-words border-l border-[var(--border)] p-3 leading-5 md:p-4">
              {row.getValue(secondProduct)}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}