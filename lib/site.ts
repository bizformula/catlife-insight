export const SITE_NAME = "캣라이프 인사이트";

export const SITE_DESCRIPTION =
  "고양이 사료와 간식의 성분표를 쉽게 읽고 비교하는 곳";

export const CATEGORIES = [
  {
    slug: "nutrition-guide",
    name: "성분 가이드",
  },
  {
    slug: "product-analysis",
    name: "제품 분석",
  },
  {
    slug: "comparison",
    name: "제품 비교",
  },
  {
    slug: "ingredients",
    name: "원료 사전",
  },
  {
    slug: "cat-nutrition",
    name: "반려묘 영양",
  },
] as const;

export function getCategoryName(slug: string): string {
  const category = CATEGORIES.find(
    (item) => item.slug === slug,
  );

  return category?.name ?? slug;
}