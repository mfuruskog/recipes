import {
  SET_RECIPES_LOADING,
  SET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  SET_RECIPE_TYPES,
  SET_FILTER,
} from '../constants';
import { Recipe, RecipeType, RecipeFilter } from '../types';

export function setRecipesLoading() {
  return {
    type: SET_RECIPES_LOADING,
    payload: {},
  };
}
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

export function setFilter(filter: RecipeFilter) {
  return {
    type: SET_FILTER,
    payload: filter,
  };
}

export type ActionType = { type: string; payload?: any };
