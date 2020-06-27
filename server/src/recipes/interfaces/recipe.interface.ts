export interface Recipe {
  title: string;
  description: string;
  url: string;
  rating: number;
  type: RecipeType;
  update_date: Date;
}

export interface RecipeType {
  key: string;
  name: string;
  emoji: string;
}
