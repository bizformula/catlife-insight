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

type NutrientRangeFieldProps = {
  label: string;
  minimum: string;
  maximum: string;
  onMinimumChange: (value: string) => void;
  onMaximumChange: (value: string) => void;
  disabled: boolean;
  invalid: boolean;
  minimumPlaceholder: string;
  maximumPlaceholder: string;
};

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
  powder: "분말",
};

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

function canShowForSingleIngredient(
  product: Product,
  rawQuery: string
): boolean {
  const query =
    normalizeIngredientName(rawQuery);

  if (!query) {
    return true;
  }

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

  if (
    dictionaryItem &&
    (!product.ingredientDetails ||
      product.ingredientDetails.length === 0)
  ) {
    return false;
  }

  return true;
}

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

function parseNutrientInput(
  value: string
): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);

  if (
    !Number.isFinite(parsed) ||
    parsed < 0
  ) {
    return null;
  }

  return parsed;
}

function NutrientRangeField({
  label,
  minimum,
  maximum,
  onMinimumChange,
  onMaximumChange,
  disabled,
  invalid,
  minimumPlaceholder,
  maximumPlaceholder,
}: NutrientRangeFieldProps) {
  const inputClassName =
    "min-w-0 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--point)] disabled:cursor-not-allowed disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:opacity-70";

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-[11px] text-[var(--muted-foreground)]">
            최소
          </span>

          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              value={minimum}
              onChange={(event) =>
                onMinimumChange(
                  event.target.value
                )
              }
              disabled={disabled}
              placeholder={
                minimumPlaceholder
              }
              className={inputClassName}
            />

            <span className="shrink-0 text-[11px]">
              % 이상
            </span>
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-[11px] text-[var(--muted-foreground)]">
            최대
          </span>

          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              value={maximum}
              onChange={(event) =>
                onMaximumChange(
                  event.target.value
                )
              }
              disabled={disabled}
              placeholder={
                maximumPlaceholder
              }
              className={inputClassName}
            />

            <span className="shrink-0 text-[11px]">
              % 이하
            </span>
          </div>
        </label>
      </div>

      {invalid && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          최소값은 최대값보다 클 수
          없습니다.
        </p>
      )}
    </div>
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

  const [productQuery, setProductQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

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
    minimumProtein,
    setMinimumProtein,
  ] = useState("");

  const [
    maximumProtein,
    setMaximumProtein,
  ] = useState("");

  const [
    minimumFat,
    setMinimumFat,
  ] = useState("");

  const [
    maximumFat,
    setMaximumFat,
  ] = useState("");

  const [
    comparisonSlugs,
    setComparisonSlugs,
  ] = useState<string[]>([]);

  const minimumProteinValue =
    parseNutrientInput(minimumProtein);

  const maximumProteinValue =
    parseNutrientInput(maximumProtein);

  const minimumFatValue =
    parseNutrientInput(minimumFat);

  const maximumFatValue =
    parseNutrientInput(maximumFat);

  const hasNutrientFilter =
    minimumProteinValue !== null ||
    maximumProteinValue !== null ||
    minimumFatValue !== null ||
    maximumFatValue !== null;

  const hasInvalidProteinRange =
    minimumProteinValue !== null &&
    maximumProteinValue !== null &&
    minimumProteinValue >
      maximumProteinValue;

  const hasInvalidFatRange =
    minimumFatValue !== null &&
    maximumFatValue !== null &&
    minimumFatValue >
      maximumFatValue;

  const hasInvalidNutrientRange =
    hasInvalidProteinRange ||
    hasInvalidFatRange;

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

  const resetNutrientFilters = () => {
    setMinimumProtein("");
    setMaximumProtein("");
    setMinimumFat("");
    setMaximumFat("");
  };

  const handleFoodFormChange = (
    foodForm: "" | FoodForm
  ) => {
    if (
      foodForm !== selectedFoodForm
    ) {
      resetNutrientFilters();
    }

    setSelectedFoodForm(foodForm);
  };

  const clearFoodForm = () => {
    setSelectedFoodForm("");
    resetNutrientFilters();
  };

  const resetFilters = () => {
    setExcludedGroups([]);
    setIngredientQuery("");
    setProductQuery("");
    setVisibleCount(16);
    setSelectedBrand("");
    setSelectedFoodForm("");
    setSelectedLifeStage("");
    resetNutrientFilters();
  };

  const hasActiveFilter =
    productQuery.trim().length > 0 ||
    excludedGroups.length > 0 ||
    ingredientQuery.trim().length > 0 ||
    selectedBrand.length > 0 ||
    selectedFoodForm.length > 0 ||
    selectedLifeStage.length > 0 ||
    hasNutrientFilter;

  const filteredProducts =
    !hasInvalidNutrientRange
      ? products.filter((product) => {
          const q = productQuery.trim().toLocaleLowerCase("ko");
          const passesProductQuery = !q || `${product.name} ${product.brand}`.toLocaleLowerCase("ko").includes(q);
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

          const protein =
            product.guaranteedAnalysis
              .protein;

          const fat =
            product.guaranteedAnalysis
              .fat;

          const passesProteinMinimum =
            minimumProteinValue ===
              null ||
            (typeof protein ===
              "number" &&
              protein >=
                minimumProteinValue);

          const passesProteinMaximum =
            maximumProteinValue ===
              null ||
            (typeof protein ===
              "number" &&
              protein <=
                maximumProteinValue);

          const passesFatMinimum =
            minimumFatValue === null ||
            (typeof fat === "number" &&
              fat >= minimumFatValue);

          const passesFatMaximum =
            maximumFatValue === null ||
            (typeof fat === "number" &&
              fat <= maximumFatValue);

          return (
            passesProductQuery &&
            passesGroupFilters &&
            passesIngredientQuery &&
            passesBrand &&
            passesFoodForm &&
            passesLifeStage &&
            passesProteinMinimum &&
            passesProteinMaximum &&
            passesFatMinimum &&
            passesFatMaximum
          );
        })
      : [];

  const visibleProducts = filteredProducts.slice(0, visibleCount);

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
    <div className="space-y-6">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-2">
          <h2 className="text-lg font-bold">사료 찾기</h2>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[var(--point)] hover:underline"
            >
              모두 지우기
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block min-w-0">
              <span className="sr-only">사료명 검색</span>
              <input type="search" value={productQuery}
                onChange={(event) => { setProductQuery(event.target.value); setVisibleCount(16); }}
                placeholder="사료명 검색"
                aria-label="사료명 검색"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--point)]" />
            </label>
            <label className="block min-w-0">
              <span className="sr-only">브랜드 선택</span>
              <select value={selectedBrand} onChange={(event) => { setSelectedBrand(event.target.value); setVisibleCount(16); }}
                aria-label="브랜드 선택"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm">
                <option value="">전체 브랜드</option>
                {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="sr-only">급여 연령</span>
              <select value={selectedLifeStage} onChange={(event) => { setSelectedLifeStage(event.target.value as "" | LifeStage); setVisibleCount(16); }}
                aria-label="급여 연령"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm">
                <option value="">전체 연령</option>
                <option value="kitten">자묘</option>
                <option value="adult">성묘</option>
                <option value="senior">노령묘</option>
                <option value="all">전연령 전용</option>
              </select>
            </label>
            <label className="block min-w-0">
              <span className="sr-only">사료 형태</span>
              <select value={selectedFoodForm} onChange={(event) => { handleFoodFormChange(event.target.value as "" | FoodForm); setVisibleCount(16); }}
                aria-label="사료 형태"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm">
                <option value="">전체 형태</option>
                <option value="dry">건식</option>
                <option value="wet">습식</option>
                <option value="powder">분말</option>
              </select>
            </label>
          </div>

          <section className="rounded-xl bg-[var(--point-soft)] px-3 py-3 dark:bg-[var(--point-soft)]">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <h3 className="text-sm font-bold">피하고 싶은 원료</h3>
              <Link
                href="/ingredient-standards"
                className="text-xs font-semibold text-[var(--point)] hover:underline"
              >
                원료 분류 기준 보기 →
              </Link>
            </div>

            <label className="block">
              <span className="sr-only">제외할 원료명 입력</span>
              <input
                type="search"
                value={ingredientQuery}
                onChange={(event) => setIngredientQuery(event.target.value)}
                placeholder="피하고 싶은 원료 직접 입력 (예: 렌즈콩, 게, 밀)"
                aria-label="피하고 싶은 원료 직접 입력"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--point)]"
              />
            </label>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {exclusionOptions
                .filter((option, index) => showAllIngredients || index < 6 || excludedGroups.includes(option.value))
                .map((option) => {
                  const isSelected = excludedGroups.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleExclusion(option.value)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "border-[var(--point)] bg-[var(--point)] text-white"
                          : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--point)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              <button
                type="button"
                onClick={() => setShowAllIngredients((value) => !value)}
                aria-expanded={showAllIngredients}
                className="px-1 py-1.5 text-xs font-semibold text-[var(--point)] hover:underline"
              >
                {showAllIngredients ? "접기 ↑" : "원료 더 보기 ↓"}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] leading-4 text-[var(--muted-foreground)]">
              여러 원료는 쉼표로 구분 · 선택한 원료가 표시된 제품 제외
            </p>
          </section>

          <button type="button" onClick={() => setShowAdvanced((value) => !value)}
            aria-expanded={showAdvanced}
            className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-left text-sm font-bold hover:border-[var(--point)]">
            <span>상세검색 · 영양성분 {hasNutrientFilter ? "(조건 적용 중)" : ""}</span>
            <span>{showAdvanced ? "접기 ↑" : "펼치기 ↓"}</span>
          </button>
          {showAdvanced && (
          <div className="space-y-4">
          <section className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 p-4 sm:p-5">
            <div className="mb-4">
              <h3 className="mt-1 text-lg font-bold">
                영양성분 조건
              </h3>

              <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">
                공개된 영양성분 표시값으로
                제품 범위를 좁힐 수
                있습니다.
              </p>
            </div>

            {!selectedFoodForm ? (
              <div className="mb-4 rounded-lg bg-[var(--point-soft)] p-3 text-xs leading-5 text-[var(--point)] dark:bg-[var(--point-soft)] dark:text-[var(--foreground)]">
                영양성분 검색을 사용하려면
                먼저 사료 형태를
                선택해주세요. 건식과
                습식은 수분 함량 차이가
                커서 표시값을 직접
                비교하기 어렵습니다.
              </div>
            ) : (
              <div className="mb-4 rounded-lg bg-[var(--point-soft)] p-3 text-xs leading-5 text-[var(--point)] dark:bg-[var(--point-soft)] dark:text-[var(--foreground)]">
                현재{" "}
                <strong>
                  {
                    foodFormNames[
                      selectedFoodForm
                    ]
                  }
                </strong>{" "}
                제품끼리 영양성분
                표시값을 비교합니다.
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              <NutrientRangeField
                label="조단백질 표시값"
                minimum={minimumProtein}
                maximum={maximumProtein}
                onMinimumChange={
                  setMinimumProtein
                }
                onMaximumChange={
                  setMaximumProtein
                }
                disabled={!selectedFoodForm}
                invalid={
                  hasInvalidProteinRange
                }
                minimumPlaceholder="예: 30"
                maximumPlaceholder="예: 35"
              />

              <NutrientRangeField
                label="조지방 표시값"
                minimum={minimumFat}
                maximum={maximumFat}
                onMinimumChange={
                  setMinimumFat
                }
                onMaximumChange={
                  setMaximumFat
                }
                disabled={!selectedFoodForm}
                invalid={
                  hasInvalidFatRange
                }
                minimumPlaceholder="예: 10"
                maximumPlaceholder="예: 15"
              />
            </div>

            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <p className="text-[11px] leading-5 text-[var(--muted-foreground)]">
                ‘이상·이하’ 조건은
                Catlife에 등록된 표시
                숫자를 비교합니다.
                제조사가 최소값(min)으로
                공개한 수치는 실제 함량의
                상한을 의미하지 않습니다.
              </p>
            </div>
          </section>
          </div>
          )}
        </div>
      </section>

      <main className="min-w-0">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <h2 className="text-2xl font-bold">검색 결과</h2>

          <div className="flex items-center gap-4">
            {!hasInvalidNutrientRange && (
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
              className="text-sm font-semibold text-[var(--point)] hover:underline"
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
                    toggleExclusion(group)
                  }
                  className="rounded-full bg-[var(--point-soft)] px-3 py-1.5 text-sm text-[var(--point)] dark:bg-[var(--point-soft)] dark:text-[var(--foreground)]"
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
                className="rounded-full bg-[var(--point-soft)] px-3 py-1.5 text-sm text-[var(--point)] dark:bg-[var(--point-soft)] dark:text-[var(--foreground)]"
              >
                {ingredientQuery.trim()}{" "}
                제외 ×
              </button>
            )}

            {selectedLifeStage && (
              <button
                type="button"
                onClick={() =>
                  setSelectedLifeStage("")
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
                onClick={clearFoodForm}
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

            {minimumProteinValue !==
              null && (
              <button
                type="button"
                onClick={() =>
                  setMinimumProtein("")
                }
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"
              >
                조단백질{" "}
                {minimumProteinValue}% 이상
                ×
              </button>
            )}

            {maximumProteinValue !==
              null && (
              <button
                type="button"
                onClick={() =>
                  setMaximumProtein("")
                }
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200"
              >
                조단백질{" "}
                {maximumProteinValue}% 이하
                ×
              </button>
            )}

            {minimumFatValue !== null && (
              <button
                type="button"
                onClick={() =>
                  setMinimumFat("")
                }
                className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-700 dark:bg-amber-950 dark:text-amber-200"
              >
                조지방{" "}
                {minimumFatValue}% 이상 ×
              </button>
            )}

            {maximumFatValue !== null && (
              <button
                type="button"
                onClick={() =>
                  setMaximumFat("")
                }
                className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-700 dark:bg-amber-950 dark:text-amber-200"
              >
                조지방{" "}
                {maximumFatValue}% 이하 ×
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

        {hasInvalidNutrientRange && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            영양성분 범위를 다시
            확인해주세요. 최소값은
            최대값보다 클 수 없습니다.
          </div>
        )}

        {comparisonSlugs.length > 0 && (
          <section className="mb-5 rounded-xl border border-[var(--point)] bg-[var(--point-soft)] p-4 dark:bg-[var(--point-soft)]">
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
                  href={comparisonHref}
                  className="rounded-lg bg-[var(--point)] px-4 py-2 text-sm font-semibold !text-white"
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

        {hasInvalidNutrientRange ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center">
            <p className="text-lg font-bold">
              영양성분 범위를
              확인해주세요.
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="space-y-3">
            {visibleProducts.map((product) => {
              const isComparisonSelected = comparisonSlugs.includes(product.slug);
              const comparisonLimitReached = comparisonSlugs.length >= 2 && !isComparisonSelected;
              return (
                <article key={product.slug} className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] p-3 transition hover:border-[var(--point)] sm:flex-nowrap">
                  <Link href={`/products/${product.slug}`} className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white sm:h-20 sm:w-20">
                    {product.image ? <Image src={product.image} alt={`${product.name} 제품 이미지`} width={100} height={100} className="h-full w-full object-contain p-1" /> : <span className="text-center text-xs text-gray-400">이미지 없음</span>}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[var(--muted-foreground)]">{product.brand} · {foodFormNames[product.foodForm]} · {product.lifeStage.map((stage) => lifeStageNames[stage]).join(", ")}{product.isVeterinaryDiet ? " · 처방식" : ""}</p>
                    <Link href={`/products/${product.slug}`} className="mt-1 block break-keep font-bold text-[var(--foreground)] hover:text-[var(--point)]">{product.name}</Link>
                    <p className="mt-1 line-clamp-1 text-xs text-[var(--muted-foreground)]">주단백질: {product.mainProteins.join(", ") || "정보 없음"}</p>
                    <Link href={`/products/${product.slug}`} className="mt-1 inline-block text-xs font-semibold text-[var(--point)] hover:underline">상세정보 보기 →</Link>
                  </div>
                  <button type="button" onClick={() => toggleComparison(product.slug)} disabled={comparisonLimitReached} aria-pressed={isComparisonSelected}
                    className={isComparisonSelected ? "shrink-0 rounded-lg bg-[var(--point)] px-3 py-2 text-sm font-semibold text-white" : comparisonLimitReached ? "shrink-0 cursor-not-allowed rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-gray-400" : "shrink-0 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold hover:border-[var(--point)]"}>
                    {isComparisonSelected ? "선택 해제" : "비교 선택"}
                  </button>
                </article>
              );
            })}
            {filteredProducts.length > visibleCount && (
              <button type="button" onClick={() => setVisibleCount((count) => count + 16)}
                className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold hover:border-[var(--point)]">
                더 보기 ({visibleProducts.length} / {filteredProducts.length}개)
              </button>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] p-10 text-center">
            <p className="text-lg font-bold">
              조건에 맞는 사료를
              찾지 못했습니다.
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              제외 원료나 영양성분
              범위를 줄이거나 사료
              형태를 다시 확인해
              보세요.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:border-[var(--point)]"
            >
              조건 초기화
            </button>
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-[var(--muted-foreground)]">
          검색 결과는 제품에 공개된
          원재료와 영양성분 표시정보를
          기준으로 제공됩니다.
          표시되지 않은 원료의 부재나
          제조 과정에서의 교차 접촉을
          보장하지 않습니다. 영양성분의
          최소값·최대값·대표값은 의미가
          다를 수 있으므로 제품 상세와
          최신 포장을 함께 확인하세요.
          처방이나 질환 치료를 위한
          의료 조언이 아니며, 건강
          문제가 있다면 수의사와
          상담하세요.
        </p>
      </main>
    </div>
  );
}