export const SITE_NAME = "Catlife Insight";

export const SITE_DESCRIPTION =
  "고양이 사료와 간식의 성분표를 쉽게 읽고 비교하는 곳";

export const CATEGORIES = [
  {
    slug: "nutrition-guide",
    name: "사료·간식",
  },
    {
    slug: "cat-nutrition",
    name: "건강·영양",
  },
   {
    slug: "ingredients",
    name: "원료 사전",
  },
   {
    slug: "cat-life",
    name: "생활용품",
  },
  {
    slug: "pola-story",
    name: "폴라 이야기",
  },
] as const;

export function getCategoryName(
  slug: string
): string {
  const category = CATEGORIES.find(
    (item) => item.slug === slug
  );

  return category?.name ?? slug;
}