import { RecipeType } from '../types';

export const SET_RECIPES = 'SET_RECIPES';
export type SET_RECIPES = typeof SET_RECIPES;
export const ADD_RECIPE = 'ADD_RECIPE';
export type ADD_RECIPE = typeof ADD_RECIPE;
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export type UPDATE_RECIPE = typeof UPDATE_RECIPE;
export const DELETE_RECIPE = 'DELETE_RECIPE';
export type DELETE_RECIPE = typeof DELETE_RECIPE;

export const MAX_RATING: number = 5;

export const RECIPE_TYPES: RecipeType[] = [
  { type: 'vegetarian', name: 'Vegetarisk', emoji: '🥗' },
  { type: 'beef', name: 'Nöt', emoji: '🐄' },
  { type: 'pork', name: 'Fläsk', emoji: '🐖' },
  { type: 'fish', name: 'Fisk', emoji: '🐟' },
  { type: 'chicken', name: 'Kyckling', emoji: '🐔' },
  { type: 'lamb', name: 'Lamm', emoji: '🐑' },
];
