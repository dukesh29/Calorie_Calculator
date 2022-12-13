export interface MealResponse {
  category: string;
  text: string;
  kcal: string;
}

export interface MealList {
  [id: string]: MealResponse;
}

export interface Meal extends MealResponse {
  id: string;
}

