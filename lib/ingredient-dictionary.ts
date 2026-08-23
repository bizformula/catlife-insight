import ingredientDictionaryData from "@/content/ingredient-dictionary.json";
import type {
  IngredientGroup,
} from "@/types/product";

export type IngredientDictionaryItem = {
  canonicalName: string;
  group: IngredientGroup;
  aliases: string[];
};

export const ingredientDictionary =
  ingredientDictionaryData as IngredientDictionaryItem[];

/**
 * 원료명을 검색하기 좋은 형태로 정리합니다.
 *
 * 예:
 * " 렌틸   콩 " → "렌틸 콩"
 * "LENTIL" → "lentil"
 */
export function normalizeIngredientName(
  value: string
): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\u200B/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 사전 항목에서 검색할 수 있는 모든 명칭을 반환합니다.
 * 대표 명칭과 별칭을 합쳐서 반환합니다.
 */
export function getIngredientNames(
  item: IngredientDictionaryItem
): string[] {
  return [
    item.canonicalName,
    ...item.aliases,
  ];
}

/**
 * 사용자가 입력한 명칭과 일치하는 사전 항목을 찾습니다.
 *
 * 예:
 * 렌즈콩 → 렌틸콩 항목
 * lentil → 렌틸콩 항목
 */
export function findIngredientDictionaryItem(
  rawQuery: string
): IngredientDictionaryItem | undefined {
  const query = normalizeIngredientName(rawQuery);

  if (!query) {
    return undefined;
  }

  return ingredientDictionary.find((item) =>
    getIngredientNames(item).some(
      (name) =>
        normalizeIngredientName(name) === query
    )
  );
}

/**
 * 입력한 원료가 어떤 원료 그룹에 속하는지 반환합니다.
 *
 * 예:
 * 렌즈콩 → legume
 * 옥수수 → grain
 * 감자 → starch
 */
export function findIngredientGroup(
  rawQuery: string
): IngredientGroup | undefined {
  return findIngredientDictionaryItem(rawQuery)?.group;
}

/**
 * 입력한 명칭의 대표 원료명을 반환합니다.
 * 사전에 없으면 정리된 입력값을 그대로 반환합니다.
 *
 * 예:
 * 렌즈콩 → 렌틸콩
 * chickpea → 병아리콩
 */
export function getCanonicalIngredientName(
  rawQuery: string
): string {
  const item =
    findIngredientDictionaryItem(rawQuery);

  return (
    item?.canonicalName ??
    normalizeIngredientName(rawQuery)
  );
}

/**
 * 두 원료명이 같은 원료를 의미하는지 확인합니다.
 *
 * 예:
 * 렌즈콩, 렌틸콩 → true
 * lentil, 통적렌틸콩 → true
 */
export function areEquivalentIngredientNames(
  firstName: string,
  secondName: string
): boolean {
  const first =
    findIngredientDictionaryItem(firstName);

  const second =
    findIngredientDictionaryItem(secondName);

  if (first && second) {
    return (
      first.canonicalName ===
      second.canonicalName
    );
  }

  return (
    normalizeIngredientName(firstName) ===
    normalizeIngredientName(secondName)
  );
}

/**
 * 특정 원료와 동일한 뜻으로 사용하는 모든 검색어를 반환합니다.
 *
 * 예:
 * 렌즈콩 입력 시
 * ["렌틸콩", "렌즈콩", "렌틸", ...] 반환
 */
export function getEquivalentIngredientNames(
  rawQuery: string
): string[] {
  const item =
    findIngredientDictionaryItem(rawQuery);

  if (!item) {
    const normalized =
      normalizeIngredientName(rawQuery);

    return normalized ? [normalized] : [];
  }

  return Array.from(
    new Set(
      getIngredientNames(item).map(
        normalizeIngredientName
      )
    )
  );
}

/**
 * 화면에 표시할 원료 그룹 한글명입니다.
 */
export const INGREDIENT_GROUP_NAMES:
  Record<IngredientGroup, string> = {
  chicken: "닭",
  turkey: "칠면조",
  duck: "오리",
  quail: "메추리",
  beef: "소",
  pork: "돼지",
  fish: "생선·해산물",
  dairy: "유제품",
  egg: "달걀",
  grain: "곡물",
  legume: "콩류",
  pseudograin: "유사곡물",
  starch: "전분질 원료",
  vegetable: "채소",
};