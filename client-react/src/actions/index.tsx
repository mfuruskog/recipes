import {
  SET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SET_RECIPE_TYPES,
} from '../constants';
import { Recipe, RecipeType } from '../types';

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

export function deleteRecipe(id: string) {
  return {
    type: DELETE_RECIPE,
    payload: id,
  };
}

export function setRecipeTypes(recipeTypes: RecipeType[]) {
  return {
    type: SET_RECIPE_TYPES,
    payload: recipeTypes,
  };
}

export type ActionType = { type: string; payload?: any };
