"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type {
  IngredientGroup,
  Product,
} from "@/types/product";

type ProductFinderProps = {
  products: Product[];
};

type LifeStage =
  Product["lifeStage"][number];

type FoodForm = Product["foodForm"];

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

const lifeStageNames: Record<
  LifeStage,
  string
> = {
  kitten: "자묘",
  adult: "성묘",
  senior: "노령묘",
  all: "전연령",
};

const groupKeywords: Record<
  IngredientGroup,
  string[]
> = {
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
  dairy: [
    "우유",
    "유제품",
    "치즈",
    "유청",
    "카제인",
  ],
  egg: [
    "달걀",
    "계란",
    "난황",
    "난백",
  ],
  grain: [
    "쌀",
    "밀",
    "보리",
    "귀리",
    "옥수수",
    "현미",
    "메밀",
    "조",
  ],
};

function findQueryGroup(
  query: string
): IngredientGroup | undefined {
  return (
    Object.entries(groupKeywords).find(
      ([, keywords]) =>
        keywords.some(
          (keyword) => keyword === query
        )
    )?.[0] as IngredientGroup | undefined
  );
}

function canShowForSingleIngredient(
  product: Product,
  rawQuery: string
) {
  const query = rawQuery
    .trim()
    .toLowerCase();

  if (!query) {
    return true;
  }

  if (!product.ingredientDetails) {
    return false;
  }

  const exactMatch =
    product.ingredientDetails.some((detail) => {
      const searchableTexts = [
        detail.name,
        detail.sourceText,
        ...(detail.aliases ?? []),
      ].map((text) =>
        text.trim().toLowerCase()
      );

      return searchableTexts.some(
        (text) => text === query
      );
    });

  if (exactMatch) {
    return false;
  }

  const queryGroup =
    findQueryGroup(query);

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
    canShowForSingleIngredient(
      product,
      query
    )
  );
}

export default function ProductFinder({
  products,
}: ProductFinderProps) {
  const [
    excludedGroups,
    setExcludedGroups,
  ] = useState<IngredientGroup[]>([]);

  const [
    ingredientQuery,
    setIngredientQuery,
  ] = useState("");

  const [selectedBrand, setSelectedBrand] =
    useState("");

  const [
    selectedFoodForm,
    setSelectedFoodForm,
  ] = useState<"" | FoodForm>("");

  const [
    selectedLifeStage,
    setSelectedLifeStage,
  ] = useState<"" | LifeStage>("");

  const [
    comparisonSlugs,
    setComparisonSlugs,
  ] = useState<string[]>([]);

  const brands = Array.from(
    new Set(
      products.map(
        (product) => product.brand
      )
    )
  ).sort((a, b) =>
    a.localeCompare(b, "ko")
  );

  const toggleExclusion = (
    group: IngredientGroup
  ) => {
    setExcludedGroups((current) =>
      current.includes(group)
        ? current.filter(
            (item) => item !== group
          )
        : [...current, group]
    );
  };

  const toggleComparison = (
    slug: string
  ) => {
    setComparisonSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter(
          (item) => item !== slug
        );
      }

      if (current.length >= 2) {
        return current;
      }

      return [...current, slug];
    });
  };

  const resetFilters = () => {
    setExcludedGroups([]);
    setIngredientQuery("");
    setSelectedBrand("");
    setSelectedFoodForm("");
    setSelectedLifeStage("");
  };

  const filteredProducts =
    products.filter((product) => {
      const passesGroupFilters =
        excludedGroups.every(
          (group) =>
            product.ingredientStatus?.[
              group
            ] === "not-listed"
        );

      const passesIngredientQuery =
        canShowForIngredientQuery(
          product,
          ingredientQuery
        );

      const passesBrand =
        !selectedBrand ||
        product.brand === selectedBrand;

      const passesFoodForm =
        !selectedFoodForm ||
        product.foodForm ===
          selectedFoodForm;

      const passesLifeStage =
        !selectedLifeStage ||
        product.lifeStage.includes(
          selectedLifeStage
        ) ||
        product.lifeStage.includes("all");

      return (
        passesGroupFilters &&
        passesIngredientQuery &&
        passesBrand &&
        passesFoodForm &&
        passesLifeStage
      );
    });

  const hasActiveFilter =
    excludedGroups.length > 0 ||
    ingredientQuery.trim().length > 0 ||
    selectedBrand.length > 0 ||
    selectedFoodForm.length > 0 ||
    selectedLifeStage.length > 0;

  const selectedProducts =
    comparisonSlugs
      .map((slug) =>
        products.find(
          (product) =>
            product.slug === slug
        )
      )
      .filter(
        (
          product
        ): product is Product =>
          Boolean(product)
      );

  const comparisonHref =
    comparisonSlugs.length === 2
      ? `/compare?first=${encodeURIComponent(
          comparisonSlugs[0]
        )}&second=${encodeURIComponent(
          comparisonSlugs[1]
        )}`
      : "/compare";

  return (
    <>
      <section className="mb-8 rounded-xl border border-[var(--border)] p-5">
        <h2 className="mb-2 text-xl font-bold">
          제외할 원료
        </h2>

        <p className="mb-4 text-sm text-[var(--muted-foreground)]">
          피하고 싶은 원료 그룹을
          선택하거나 정확한 원료명을
          입력하세요.
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {exclusionOptions.map(
            (option) => {
              const isSelected =
                excludedGroups.includes(
                  option.value
                );

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    toggleExclusion(
                      option.value
                    )
                  }
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
            }
          )}
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
            setIngredientQuery(
              event.target.value
            )
          }
          placeholder="예: 렌틸콩, 게, 밀, 치커리"
          className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none transition focus:border-[#2563EB]"
        />

        <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">
          여러 원료는 쉼표로 구분하세요.
          해당 원료가 포함되었거나 세부
          종류를 확인할 수 없는 제품은
          결과에서 제외됩니다.
        </p>

        <div className="mt-6 border-t border-[var(--border)] pt-5">
          <div className="mb-3">
  <h3 className="font-bold">
    추가로 결과 좁히기
  </h3>

  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
    브랜드, 사료 형태와 급여 연령을 선택해
    검색 결과를 더 좁힐 수 있습니다.
  </p>
</div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label>
              <span className="mb-1 block text-sm font-semibold">
                브랜드
              </span>

              <select
                value={selectedBrand}
                onChange={(event) =>
                  setSelectedBrand(
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
              >
                <option value="">
                  전체 브랜드
                </option>

                {brands.map((brand) => (
                  <option
                    key={brand}
                    value={brand}
                  >
                    {brand}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-1 block text-sm font-semibold">
                사료 형태
              </span>

              <select
                value={selectedFoodForm}
                onChange={(event) =>
                  setSelectedFoodForm(
                    event.target
                      .value as
                      | ""
                      | FoodForm
                  )
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
              >
                <option value="">
                  전체 형태
                </option>
                <option value="dry">
                  건식
                </option>
                <option value="wet">
                  습식
                </option>
              </select>
            </label>

            <label>
              <span className="mb-1 block text-sm font-semibold">
                급여 연령
              </span>

              <select
                value={selectedLifeStage}
                onChange={(event) =>
                  setSelectedLifeStage(
                    event.target
                      .value as
                      | ""
                      | LifeStage
                  )
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
              >
                <option value="">
                  전체 연령
                </option>
                <option value="kitten">
                  자묘
                </option>
                <option value="adult">
                  성묘
                </option>
                <option value="senior">
                  노령묘
                </option>
                <option value="all">
                  전연령
                </option>
              </select>
            </label>
          </div>
        </div>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 text-sm text-[#2563EB] hover:underline"
          >
            검색 조건 초기화
          </button>
        )}
      </section>

      {comparisonSlugs.length > 0 && (
        <section className="mb-6 rounded-xl border border-[#2563EB] bg-blue-50 p-4 dark:bg-blue-950">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold">
                비교할 제품{" "}
                {comparisonSlugs.length}/2
              </p>

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {selectedProducts
                  .map(
                    (product) =>
                      product.name
                  )
                  .join(" · ")}
              </p>
            </div>

            {comparisonSlugs.length ===
            2 ? (
              <Link
                href={comparisonHref}
                className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold !text-white"
              >
                선택 제품 비교
              </Link>
            ) : (
              <p className="text-sm">
                제품을 하나 더 선택하세요.
              </p>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            검색 결과
          </h2>

          <span className="text-sm text-[var(--muted-foreground)]">
            총 {filteredProducts.length}개
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {filteredProducts.map(
            (product) => {
              const isCompared =
                comparisonSlugs.includes(
                  product.slug
                );

              const comparisonDisabled =
                comparisonSlugs.length >=
                  2 && !isCompared;

              return (
                <article
                  key={product.slug}
                  className={`rounded-xl border p-4 transition ${
                    isCompared
                      ? "border-[#2563EB] ring-1 ring-[#2563EB]"
                      : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white p-1 md:h-24 md:w-24">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={`${product.name} 제품 이미지`}
                          width={192}
                          height={192}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-center text-xs leading-4 text-gray-400">
                          이미지
                          <br />
                          준비 중
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-[#2563EB]">
                          {product.brand}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                            {product.foodForm ===
                            "dry"
                              ? "건식"
                              : "습식"}
                          </span>

                          {product.isVeterinaryDiet ? (
                            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                              처방식
                            </span>
                          ) : (
                            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                              일반식
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="mb-2 break-keep text-lg font-bold leading-6">
                        <Link
                          href={`/products/${product.slug}`}
                          className="!text-[var(--foreground)] hover:!text-[#2563EB]"
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <p className="mb-1 text-sm text-[var(--muted-foreground)]">
                        급여 연령:{" "}
                        {product.lifeStage
                          .map(
                            (stage) =>
                              lifeStageNames[
                                stage
                              ]
                          )
                          .join(", ")}
                      </p>

                      <p className="text-sm text-[var(--muted-foreground)]">
                        주단백질:{" "}
                        {product.mainProteins.join(
                          ", "
                        )}
                      </p>
                    </div>
                  </div>

                  {excludedGroups.length >
                    0 && (
                    <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm leading-5 text-green-800 dark:bg-green-950 dark:text-green-200">
                      선택한 제외 조건의
                      표시 원재료가 확인되지
                      않았습니다.
                    </div>
                  )}

                  {ingredientQuery.trim() && (
                    <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm leading-5 text-green-800 dark:bg-green-950 dark:text-green-200">
                      입력한 원료가 표시
                      원재료에서 발견되지
                      않았습니다.
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-sm font-semibold text-[#2563EB]"
                    >
                      상세정보 보기 →
                    </Link>

                    <button
                      type="button"
                      disabled={
                        comparisonDisabled
                      }
                      onClick={() =>
                        toggleComparison(
                          product.slug
                        )
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                        isCompared
                          ? "border-[#2563EB] bg-[#2563EB] text-white"
                          : comparisonDisabled
                            ? "cursor-not-allowed border-gray-200 text-gray-400"
                            : "border-[var(--border)] hover:border-[#2563EB] hover:text-[#2563EB]"
                      }`}
                    >
                      {isCompared
                        ? "비교 선택됨"
                        : "비교 선택"}
                    </button>
                  </div>
                </article>
              );
            }
          )}
        </div>

        {filteredProducts.length ===
          0 && (
          <div className="rounded-xl border border-[var(--border)] p-8 text-center">
            <p className="font-semibold">
              조건을 충족한다고 확인된
              제품이 없습니다.
            </p>

            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              제외 조건을 줄이거나
              원료명을 다시 확인해
              보세요.
            </p>
          </div>
        )}
      </section>
    </>
  );
}