import { RecipeType } from '../types';

export const SET_RECIPES = 'SET_RECIPES';
export type SET_RECIPES = typeof SET_RECIPES;

export const MAX_RATING: number = 5;

export const RECIPE_TYPES: RecipeType[] = [
  { type: 'vegetarian', name: 'Vegetarisk', emoji: '🥗' },
  { type: 'beef', name: 'Nöt', emoji: '🐄' },
  { type: 'pork', name: 'Fläsk', emoji: '🐖' },
  { type: 'fish', name: 'Fisk', emoji: '🐟' },
  { type: 'chicken', name: 'Kyckling', emoji: '🐔' },
  { type: 'lamb', name: 'Lamm', emoji: '🐑' },
];
