export type ProductType = "food" | "treat";
export type FoodForm = "dry" | "wet";
export type ProductPurpose = "complete" | "supplementary";
export type LifeStage = "kitten" | "adult" | "senior" | "all";

export type IngredientGroup =
  | "chicken"
  | "beef"
  | "pork"
  | "fish"
  | "dairy"
  | "egg"
  | "grain";

export type IngredientStatus =
  | "contains"
  | "not-listed"
  | "unknown";

export type IngredientForm =
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
  aliases?: string[];
};  

export type Product = {
  slug: string;
  name: string;
  brand: string;
  image?: string;

  productType: ProductType;
  foodForm: FoodForm;
  purpose: ProductPurpose;
  lifeStage: LifeStage[];
  
  isVeterinaryDiet?: boolean;
  dietaryUses?: string[];

  mainProteins: string[];
  ingredients: string[];
  ingredientDetails?: IngredientDetail[];

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
  image?: string;
  affiliateUrl?: string;

  notes?: string;
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

export type NutrientBasis = "min" | "max" | "typical";