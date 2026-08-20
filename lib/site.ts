export const SITE_NAME = "캣라이프 인사이트";

export const SITE_DESCRIPTION =
  "고양이 사료와 간식의 성분표를 쉽게 읽고 비교하는 곳";

export const CATEGORIES = [
  {
    slug: "nutrition-guide",
    name: "사료·간식 가이드",
  },
  {
    slug: "product-analysis",
    name: "제품 분석·비교",
  },
  {
    slug: "cat-nutrition",
    name: "건강·영양 정보",
  },
  {
    slug: "cat-life",
    name: "생활용품",
  },
] as const;

export function getCategoryName(slug: string): string {
  const category = CATEGORIES.find(
    (item) => item.slug === slug,
  );

  return category?.name ?? slug;
}