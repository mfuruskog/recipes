export interface Recipe {
  title: string;
  description: string;
  url: string;
  rating: number;
  types: RecipeType[];
  update_date: Date;
  user_id: string;
}

export interface RecipeType {
  key: string;
  name: string;
  emoji: string;
}
