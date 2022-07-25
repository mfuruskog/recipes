export interface Recipe {
  _id: string;
  title: string;
  description: string;
  url: string;
  rating: number;
  types: RecipeType[];
  create_date: Date;
}

export interface RecipeType {
  _id: string;
  key: string;
  name: string;
  emoji: string;
}

export interface RecipeFilter {
  selectedType?: string;
}

export interface Invite {
  _id: string;
  receiver: string;
  sender: string;
}
