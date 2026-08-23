export type ProductType = "food" | "treat";

export type FoodForm =
  | "dry"
  | "wet"
  | "powder";

export type ProductPurpose =
  | "complete"
  | "supplementary";

export type LifeStage =
  | "kitten"
  | "adult"
  | "senior"
  | "all";

export type IngredientGroup =
  | "chicken"
  | "turkey"
  | "duck"
  | "quail"
  | "beef"
  | "pork"
  | "fish"
  | "dairy"
  | "egg"
  | "grain"
  | "legume"
  | "pseudograin"
  | "starch"
  | "vegetable";

export type IngredientStatus =
  | "contains"
  | "not-listed"
  | "unknown";

export type IngredientForm =
  | "fresh"
  | "raw"
  | "dried"
  | "whole"
  | "organ"
  | "bone"
  | "fat"
  | "oil"
  | "hydrolyzed"
  | "starch"
  | "extract"
  | "fiber"
  | "supplement"
  | "other";

export type IngredientSpecificity =
  | "specific"
  | "group-only";

export type IngredientDetail = {
  name: string;
  sourceText: string;
  form: IngredientForm;
  group?: IngredientGroup;
  specificity?: IngredientSpecificity;

  /*
   * 공통 별칭은 content/ingredient-dictionary.json에서 관리합니다.
   * 이 필드는 해당 제품에만 사용된 특별한 표현이 있을 때만 사용합니다.
   */
  aliases?: string[];
};

export type NutrientKey =
  | "protein"
  | "fat"
  | "fiber"
  | "ash"
  | "moisture"
  | "calcium"
  | "phosphorus"
  | "taurine";

export type NutrientBasis =
  | "min"
  | "max"
  | "typical";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  image?: string;
  summary?: string;

  productType: ProductType;
  foodForm: FoodForm;
  purpose: ProductPurpose;
  lifeStage: LifeStage[];

  isVeterinaryDiet?: boolean;
  dietaryUses?: string[];

  mainProteins: string[];
  ingredients: string[];
  ingredientDetails?: IngredientDetail[];

  /*
   * 기존 제품을 새 분류 체계로 옮기는 동안에는 Partial로 둡니다.
   * 모든 제품 수정이 끝나면 Record로 강화할 예정입니다.
   */
  ingredientStatus: Partial<
    Record<IngredientGroup, IngredientStatus>
  >;

  guaranteedAnalysis: {
    protein?: number;
    fat?: number;
    fiber?: number;
    ash?: number;
    moisture?: number;
    calcium?: number;
    phosphorus?: number;
    taurine?: number;
  };

  analysisBasis?: Partial<
    Record<NutrientKey, NutrientBasis>
  >;

  calories?: number;

  sourceUrl: string;
  checkedAt: string;
  affiliateUrl?: string;

  notes?: string;
};