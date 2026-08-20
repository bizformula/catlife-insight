"use client";

import Link from "next/link";
import { useState } from "react";
import type {
  IngredientGroup,
  Product,
} from "@/types/product";

type ProductFinderProps = {
  products: Product[];
};

const exclusionOptions: {
  label: string;
  value: IngredientGroup;
}[] = [
  { label: "닭", value: "chicken" },
  { label: "소", value: "beef" },
  { label: "돼지", value: "pork" },
  { label: "생선·해산물", value: "fish" },
  { label: "유제품", value: "dairy" },
  { label: "달걀", value: "egg" },
  { label: "곡물", value: "grain" },
];

const groupKeywords: Record<IngredientGroup, string[]> = {
  chicken: ["닭", "치킨", "계육"],
  beef: ["소", "소고기", "비프", "우육"],
  pork: ["돼지", "돈육", "포크"],
  fish: [
    "생선",
    "어류",
    "연어",
    "참치",
    "고등어",
    "대구",
    "농어",
    "정어리",
    "청어",
    "송어",
    "멸치",
    "새우",
    "게",
    "홍합",
    "조개",
  ],
  dairy: ["우유", "유제품", "치즈", "유청", "카제인"],
  egg: ["달걀", "계란", "난황", "난백"],
  grain: [
    "쌀",
    "밀",
    "보리",
    "귀리",
    "옥수수",
    "현미",
    "메밀",
  ],
};

function findQueryGroup(
  query: string
): IngredientGroup | undefined {
  return (
    Object.entries(groupKeywords).find(([, keywords]) =>
      keywords.some((keyword) => keyword === query)
    )?.[0] as IngredientGroup | undefined
  );
}

function canShowForSingleIngredient(
  product: Product,
  rawQuery: string
) {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return true;
  }

  if (!product.ingredientDetails) {
    return false;
  }

  const exactMatch = product.ingredientDetails.some((detail) => {
    const searchableTexts = [
      detail.name,
      detail.sourceText,
      ...(detail.aliases ?? []),
    ].map((text) => text.toLowerCase());

    return searchableTexts.some((text) => text === query);
  });

  if (exactMatch) {
    return false;
  }

  const queryGroup = findQueryGroup(query);

  if (!queryGroup) {
    return true;
  }

  const hasUnspecifiedIngredient =
    product.ingredientDetails.some(
      (detail) =>
        detail.group === queryGroup &&
        detail.specificity === "group-only"
    );

  return !hasUnspecifiedIngredient;
}

function canShowForIngredientQuery(
  product: Product,
  rawQuery: string
) {
  const queries = rawQuery
    .split(",")
    .map((query) => query.trim())
    .filter(Boolean);

  return queries.every((query) =>
    canShowForSingleIngredient(product, query)
  );
}

 export default function ProductFinder({
  products,
}: ProductFinderProps) {
  const [excludedGroups, setExcludedGroups] = useState<
    IngredientGroup[]
  >([]);

  const [ingredientQuery, setIngredientQuery] = useState("");

  const toggleExclusion = (group: IngredientGroup) => {
    setExcludedGroups((current) =>
      current.includes(group)
        ? current.filter((item) => item !== group)
        : [...current, group]
    );
  };

  const resetFilters = () => {
    setExcludedGroups([]);
    setIngredientQuery("");
  };

  const filteredProducts = products.filter((product) => {
    const passesGroupFilters = excludedGroups.every(
      (group) =>
        product.ingredientStatus?.[group] === "not-listed"
    );

    const passesIngredientQuery =
      canShowForIngredientQuery(product, ingredientQuery);

    return passesGroupFilters && passesIngredientQuery;
  });

  const hasActiveFilter =
    excludedGroups.length > 0 ||
    ingredientQuery.trim().length > 0;

  return (
    <>
      <section className="mb-8 rounded-xl border border-[var(--border)] p-5">
        <h2 className="mb-2 text-xl font-bold">
          제외할 원료
        </h2>

        <p className="mb-4 text-sm text-[var(--muted-foreground)]">
          피하고 싶은 원료 그룹을 선택하거나 정확한 원료명을
          입력하세요.
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {exclusionOptions.map((option) => {
            const isSelected = excludedGroups.includes(
              option.value
            );

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleExclusion(option.value)}
                aria-pressed={isSelected}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isSelected
                    ? "border-[#2563EB] bg-[#2563EB] text-white"
                    : "border-[var(--border)] bg-transparent hover:border-[#2563EB]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <label
          htmlFor="ingredient-query"
          className="mb-2 block text-sm font-semibold"
        >
          개별 원료 제외
        </label>

        <input
          id="ingredient-query"
          type="search"
          value={ingredientQuery}
          onChange={(event) =>
            setIngredientQuery(event.target.value)
          }
          placeholder="예: 렌틸콩, 게, 밀, 치커리"
          className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none transition focus:border-[#2563EB]"
        />

        <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">
  여러 원료는 쉼표로 구분하세요. 해당 원료가 포함되었거나
  세부 종류를 확인할 수 없는 제품은 결과에서 제외됩니다.
</p>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 text-sm text-[#2563EB] hover:underline"
          >
            선택 초기화
          </button>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">검색 결과</h2>

          <span className="text-sm text-[var(--muted-foreground)]">
            총 {filteredProducts.length}개
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="block rounded-xl border border-[var(--border)] p-5 transition hover:border-[#2563EB] hover:shadow-sm"
            >
              <p className="mb-1 text-sm text-[#2563EB]">
                {product.brand}
              </p>

              <h3 className="mb-3 text-xl font-bold">
                {product.name}
              </h3>

              {product.isVeterinaryDiet && (
                <p className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                  수의사 상담이 필요한 처방식
                </p>
              )}
             
              {ingredientQuery.trim() && (
  <p className="mb-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
    “{ingredientQuery.trim()}”: 확인한 표시 원재료에 없음
  </p>
)}

              <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="font-semibold">형태:</dt>
                  <dd>
                    {product.foodForm === "dry"
                      ? "건식"
                      : "습식"}
                  </dd>
                </div>

                <div className="flex gap-2">
                  <dt className="font-semibold">
                    주단백질:
                  </dt>
                  <dd>
                    {product.mainProteins.join(", ")}
                  </dd>
                </div>

                <div className="flex gap-2">
                  <dt className="shrink-0 font-semibold">
                    원재료:
                  </dt>
                  <dd>
                    {product.ingredients.join(", ")}
                  </dd>
                </div>
              </dl>

              {product.notes && (
                <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {product.notes}
                </p>
              )}
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] p-8 text-center">
            <p className="font-semibold">
              조건을 충족한다고 확인된 제품이 없습니다.
            </p>

            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              제외 조건을 줄이거나 원료명을 다시 확인해 보세요.
            </p>
          </div>
        )}
      </section>
    </>
  );
}