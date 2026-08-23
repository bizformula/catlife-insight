"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  findIngredientDictionaryItem,
  findIngredientGroup,
  getEquivalentIngredientNames,
  INGREDIENT_GROUP_NAMES,
  normalizeIngredientName,
} from "@/lib/ingredient-dictionary";
import type {
  IngredientGroup,
  Product,
} from "@/types/product";

type ProductFinderProps = {
  products: Product[];
};

type LifeStage = Product["lifeStage"][number];
type FoodForm = Product["foodForm"];

const exclusionGroups: IngredientGroup[] = [
  "chicken",
  "turkey",
  "duck",
  "quail",
  "beef",
  "pork",
  "fish",
  "dairy",
  "egg",
  "grain",
  "legume",
  "pseudograin",
  "starch",
  "vegetable",
];

const exclusionOptions = exclusionGroups.map(
  (group) => ({
    value: group,
    label: INGREDIENT_GROUP_NAMES[group],
  })
);

const lifeStageNames: Record<
  LifeStage,
  string
> = {
  kitten: "자묘",
  adult: "성묘",
  senior: "노령묘",
  all: "전연령",
};

const foodFormNames: Record<
  FoodForm,
  string
> = {
  dry: "건식",
  wet: "습식",
};

/**
 * 원재료 문구와 검색어가 일치하는지 확인합니다.
 *
 * 한 글자짜리 검색어는 부분 일치를 허용하지 않습니다.
 * 예: "소"가 "소금"에 잘못 걸리는 것을 방지합니다.
 */
function textMatchesTerm(
  rawText: string,
  rawTerm: string
): boolean {
  const text =
    normalizeIngredientName(rawText);

  const term =
    normalizeIngredientName(rawTerm);

  if (!text || !term) {
    return false;
  }

  if (text === term) {
    return true;
  }

  if (term.length < 2) {
    return false;
  }

  return text.includes(term);
}

/**
 * 제품에 등록된 검색 가능한 원재료 문구를 모읍니다.
 */
function getProductIngredientTexts(
  product: Product
): string[] {
  const ingredientTexts =
    product.ingredients ?? [];

  const detailTexts =
    product.ingredientDetails?.flatMap(
      (detail) => [
        detail.name,
        detail.sourceText,
        ...(detail.aliases ?? []),
      ]
    ) ?? [];

  return [
    ...ingredientTexts,
    ...detailTexts,
  ];
}

/**
 * 개별 원료 하나를 제외했을 때
 * 해당 제품을 결과에 표시할 수 있는지 확인합니다.
 */
function canShowForSingleIngredient(
  product: Product,
  rawQuery: string
): boolean {
  const query =
    normalizeIngredientName(rawQuery);

  if (!query) {
    return true;
  }

  /*
   * 사전에 등록된 원료라면
   * 대표 명칭과 모든 별칭을 검색어로 사용합니다.
   *
   * 예:
   * 렌즈콩 입력
   * → 렌틸콩, 적렌틸콩, lentil 등도 함께 검사
   */
  const dictionaryItem =
    findIngredientDictionaryItem(query);

  const equivalentNames =
    getEquivalentIngredientNames(query);

  const searchTerms =
    equivalentNames.length > 0
      ? equivalentNames
      : [query];

  const productTexts =
    getProductIngredientTexts(product);

  const hasMatchingIngredient =
    productTexts.some((text) =>
      searchTerms.some((term) =>
        textMatchesTerm(text, term)
      )
    );

  if (hasMatchingIngredient) {
    return false;
  }

  const queryGroup =
    findIngredientGroup(query);

  if (!queryGroup) {
    return true;
  }

  /*
   * 세부 종류가 공개되지 않은 원료가 같은 그룹에 있다면
   * 해당 검색 원료가 없다고 확정할 수 없으므로 제외합니다.
   *
   * 예:
   * 사용자가 "연어"를 제외했는데 제품에는
   * 단순히 "생선"이라고만 표시된 경우
   * → 결과에서 제외
   */
  const hasUnspecifiedIngredient =
    product.ingredientDetails?.some(
      (detail) =>
        detail.group === queryGroup &&
        detail.specificity ===
          "group-only"
    ) ?? false;

  if (hasUnspecifiedIngredient) {
    return false;
  }

  /*
   * 사전에는 등록되어 있지만 제품의 상세 원료 자료가
   * 전혀 없다면 없다고 확정할 수 없으므로 제외합니다.
   */
  if (
    dictionaryItem &&
    (!product.ingredientDetails ||
      product.ingredientDetails.length === 0)
  ) {
    return false;
  }

  return true;
}

/**
 * 쉼표로 구분한 여러 개별 원료를 모두 검사합니다.
 */
function canShowForIngredientQuery(
  product: Product,
  rawQuery: string
): boolean {
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

  const [
    selectedBrand,
    setSelectedBrand,
  ] = useState("");

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

  const hasActiveFilter =
    excludedGroups.length > 0 ||
    ingredientQuery.trim().length > 0 ||
    selectedBrand.length > 0 ||
    selectedFoodForm.length > 0 ||
    selectedLifeStage.length > 0;

  const filteredProducts =
    hasActiveFilter
      ? products.filter((product) => {
          /*
           * 원료 그룹 버튼은 not-listed로
           * 확인된 제품만 통과시킵니다.
           *
           * contains, unknown, 미등록 상태는
           * 결과에서 제외됩니다.
           */
          const passesGroupFilters =
            excludedGroups.every(
              (group) =>
                product
                  .ingredientStatus?.[
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
            product.brand ===
              selectedBrand;

          const passesFoodForm =
            !selectedFoodForm ||
            product.foodForm ===
              selectedFoodForm;

          const passesLifeStage =
            !selectedLifeStage ||
            product.lifeStage.includes(
              selectedLifeStage
            ) ||
            product.lifeStage.includes(
              "all"
            );

          return (
            passesGroupFilters &&
            passesIngredientQuery &&
            passesBrand &&
            passesFoodForm &&
            passesLifeStage
          );
        })
      : [];

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
    <div className="grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 lg:sticky lg:top-24">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <p className="text-sm font-semibold text-[#2563EB]">
              조건 선택
            </p>

            <h2 className="text-xl font-bold">
              사료 필터
            </h2>
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="shrink-0 text-sm text-[#2563EB] hover:underline"
            >
              모두 지우기
            </button>
          )}
        </div>

        <section className="mb-6 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/40">
          <h3 className="mb-1 font-bold">
            피하고 싶은 원료
          </h3>

          <p className="mb-2 text-xs leading-5 text-[var(--muted-foreground)]">
  선택한 원료가 표시되지 않은
  제품만 찾습니다.
</p>

<Link
  href="/ingredient-standards"
  className="mb-4 inline-flex text-xs font-semibold text-[#2563EB] hover:underline"
>
  원료 분류 기준 보기 →
</Link>

<div className="flex flex-wrap gap-2">
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
                    aria-pressed={
                      isSelected
                    }
                    className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? "border-[#2563EB] bg-[#2563EB] text-white"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[#2563EB]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              }
            )}
          </div>
        </section>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              개별 원료 제외
            </span>

            <input
              type="search"
              value={ingredientQuery}
              onChange={(event) =>
                setIngredientQuery(
                  event.target.value
                )
              }
              placeholder="예: 렌즈콩, 게, 밀"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition focus:border-[#2563EB]"
            />

            <span className="mt-2 block text-xs leading-5 text-[var(--muted-foreground)]">
              여러 원료는 쉼표로
              구분하세요. 유사한 이름은
              공통 원료 사전을 기준으로
              검색합니다.
            </span>
          </label>

          <label className="block border-t border-[var(--border)] pt-5">
            <span className="mb-2 block text-sm font-semibold">
              급여 연령
            </span>

            <select
              value={
                selectedLifeStage
              }
              onChange={(event) =>
                setSelectedLifeStage(
                  event.target
                    .value as
                    | ""
                    | LifeStage
                )
              }
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm"
            >
              <option value="">
                급여 연령
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

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
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
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm"
            >
              <option value="">
                사료 형태
              </option>

              <option value="dry">
                건식
              </option>

              <option value="wet">
                습식
              </option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              브랜드
            </span>

            <select
              value={selectedBrand}
              onChange={(event) =>
                setSelectedBrand(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm"
            >
              <option value="">
                브랜드
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
        </div>
      </aside>

      <main className="min-w-0">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-[#2563EB]">
              사료 탐색
            </p>

            <h2 className="text-2xl font-bold">
              {hasActiveFilter
                ? "조건에 맞는 사료"
                : "사료 찾기"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {hasActiveFilter && (
              <span className="text-sm text-[var(--muted-foreground)]">
                총{" "}
                {
                  filteredProducts.length
                }
                개
              </span>
            )}

            <Link
              href="/products"
              className="text-sm font-semibold text-[#2563EB] hover:underline"
            >
              전체 제품 보기 →
            </Link>
          </div>
        </header>

        {hasActiveFilter && (
          <div className="mb-5 flex flex-wrap gap-2">
            {excludedGroups.map(
              (group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() =>
                    toggleExclusion(
                      group
                    )
                  }
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-200"
                >
                  {
                    INGREDIENT_GROUP_NAMES[
                      group
                    ]
                  }{" "}
                  제외 ×
                </button>
              )
            )}

            {ingredientQuery.trim() && (
              <button
                type="button"
                onClick={() =>
                  setIngredientQuery("")
                }
                className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-200"
              >
                {ingredientQuery.trim()}{" "}
                제외 ×
              </button>
            )}

            {selectedLifeStage && (
              <button
                type="button"
                onClick={() =>
                  setSelectedLifeStage(
                    ""
                  )
                }
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800"
              >
                {
                  lifeStageNames[
                    selectedLifeStage
                  ]
                }{" "}
                ×
              </button>
            )}

            {selectedFoodForm && (
              <button
                type="button"
                onClick={() =>
                  setSelectedFoodForm("")
                }
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800"
              >
                {
                  foodFormNames[
                    selectedFoodForm
                  ]
                }{" "}
                ×
              </button>
            )}

            {selectedBrand && (
              <button
                type="button"
                onClick={() =>
                  setSelectedBrand("")
                }
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800"
              >
                {selectedBrand} ×
              </button>
            )}
          </div>
        )}

        {comparisonSlugs.length >
          0 && (
          <section className="mb-5 rounded-xl border border-[#2563EB] bg-blue-50 p-4 dark:bg-blue-950">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold">
                  비교할 제품{" "}
                  {
                    comparisonSlugs.length
                  }
                  /2
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
                  href={
                    comparisonHref
                  }
                  className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold !text-white"
                >
                  선택 제품 비교
                </Link>
              ) : (
                <p className="text-sm">
                  제품을 하나 더
                  선택하세요.
                </p>
              )}
            </div>
          </section>
        )}

        {!hasActiveFilter ? (
          <div className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--muted)] p-8 text-center">
            <div>
              <p className="mb-2 text-xl font-bold">
                우리 고양이의 조건을
                선택해 보세요
              </p>

              <p className="mx-auto max-w-xl break-keep text-sm leading-6 text-[var(--muted-foreground)]">
                피하고 싶은 원료,
                급여 연령, 사료 형태
                또는 브랜드를 선택하면
                확인된 표시정보를
                기준으로 사료를
                찾아드립니다.
              </p>

              <Link
                href="/products"
                className="mt-5 inline-block text-sm font-semibold text-[#2563EB] hover:underline"
              >
                등록된 전체 제품
                둘러보기 →
              </Link>
            </div>
          </div>
        ) : filteredProducts.length >
          0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredProducts.map(
              (product) => {
                const isComparisonSelected =
                  comparisonSlugs.includes(
                    product.slug
                  );

                const comparisonLimitReached =
                  comparisonSlugs.length >=
                    2 &&
                  !isComparisonSelected;

                return (
                  <article
                    key={
                      product.slug
                    }
                    className="rounded-xl border border-[var(--border)] p-4 transition hover:border-[#2563EB] hover:shadow-sm"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white"
                      >
                        {product.image ? (
                          <Image
                            src={
                              product.image
                            }
                            alt={`${product.name} 제품 이미지`}
                            width={160}
                            height={160}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <span className="px-2 text-center text-xs text-gray-400">
                            이미지 준비 중
                          </span>
                        )}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                          <p className="text-sm text-[#2563EB]">
                            {
                              product.brand
                            }
                          </p>

                          <div className="flex flex-wrap gap-1">
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                              {
                                foodFormNames[
                                  product
                                    .foodForm
                                ]
                              }
                            </span>

                            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                              {product.isVeterinaryDiet
                                ? "처방식"
                                : "일반식"}
                            </span>
                          </div>
                        </div>

                        <h3 className="mb-2 break-keep text-lg font-bold">
                          <Link
                            href={`/products/${product.slug}`}
                            className="!text-[var(--foreground)] hover:!text-[#2563EB]"
                          >
                            {
                              product.name
                            }
                          </Link>
                        </h3>

                        {product.summary && (
                          <p className="mb-3 break-keep text-sm leading-6 text-[var(--muted-foreground)]">
                            {
                              product.summary
                            }
                          </p>
                        )}

                        <p className="mb-1 text-sm">
                          <span className="font-semibold text-[#2563EB]">
                            급여 연령:
                          </span>{" "}
                          {product.lifeStage
                            .map(
                              (
                                stage
                              ) =>
                                lifeStageNames[
                                  stage
                                ]
                            )
                            .join(", ")}
                        </p>

                        <p className="break-keep text-sm">
                          <span className="font-semibold text-[#2563EB]">
                            주단백질:
                          </span>{" "}
                          {product.mainProteins.join(
                            ", "
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-semibold text-[#2563EB] hover:underline"
                      >
                        상세정보 보기 →
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleComparison(
                            product.slug
                          )
                        }
                        disabled={
                          comparisonLimitReached
                        }
                        aria-pressed={
                          isComparisonSelected
                        }
                        className={
                          isComparisonSelected
                            ? "rounded-lg border border-[#2563EB] bg-[#2563EB] px-3 py-2 text-sm font-semibold text-white"
                            : comparisonLimitReached
                              ? "cursor-not-allowed rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-gray-400"
                              : "rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold hover:border-[#2563EB]"
                        }
                      >
                        {isComparisonSelected
                          ? "선택 해제"
                          : "비교 선택"}
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] p-10 text-center">
            <p className="text-lg font-bold">
              조건에 맞는 사료를
              찾지 못했습니다.
            </p>

            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              제외 조건을 줄이거나
              원료명을 다시 확인해
              보세요.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:border-[#2563EB]"
            >
              조건 초기화
            </button>
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-[var(--muted-foreground)]">
          검색 결과는 제품에 표시된
          원재료 정보를 기준으로
          제공됩니다. 표시되지 않은
          원료의 부재나 제조 과정에서의
          교차 접촉까지 보장하지
          않습니다. 처방이나 질환
          치료를 위한 의료 조언이
          아니며, 건강 문제가 있다면
          수의사와 상담하세요.
        </p>
      </main>
    </div>
  );
}