import { RecipeType } from '../types';

export const GET_RECIPES = 'GET_RECIPES';
export type GET_RECIPES = typeof GET_RECIPES;

export const MAX_RATING: number = 5;

export const RECIPE_TYPES: RecipeType[] = [
  { type: 'vegetarian', name: 'Vegetarisk', emoji: '🥗' },
  { type: 'beef', name: 'Nöt', emoji: '🐄' },
  { type: 'pork', name: 'Fläsk', emoji: '🐖' },
  { type: 'fish', name: 'Fisk', emoji: '🐟' },
  { type: 'chicken', name: 'Kyckling', emoji: '🐔' },
  { type: 'lamb', name: 'Lamm', emoji: '🐑' },
];
