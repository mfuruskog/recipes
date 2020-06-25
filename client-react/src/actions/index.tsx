import { SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE } from '../constants';
import { Recipe } from '../types';

export function setRecipes(data: Recipe[]) {
  return {
    type: SET_RECIPES,
    payload: data,
  };
}

export function addRecipe(recipe: Recipe) {
  return {
    type: ADD_RECIPE,
    payload: recipe,
  };
}

export function updateRecipe(recipe: Recipe) {
  return {
    type: UPDATE_RECIPE,
    payload: recipe,
  };
}

export type ActionType = { type: string; payload?: any };
