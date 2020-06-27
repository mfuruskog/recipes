export interface Recipe {
  _id: string;
  title: string;
  description: string;
  url: string;
  rating: number;
  type: RecipeType;
}

export interface RecipeType {
  _id: string;
  key: string;
  name: string;
  emoji: string;
}
