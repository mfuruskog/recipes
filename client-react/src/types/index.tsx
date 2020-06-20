export interface Recipe {
  _id: string;
  title: string;
  description: string;
  url: string;
  rating: number;
  type: string;
}

export interface RecipeType {
  type: string;
  name: string;
  emoji: string;
}
