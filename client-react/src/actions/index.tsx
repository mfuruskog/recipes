import { GET_RECIPES } from '../constants';

import recipesJson from '../data/recipes.json';

export function getRecipes() {
  return {
    type: GET_RECIPES,
    payload: recipesJson,
  };
}
export type ActionTypes = ReturnType<typeof getRecipes>;
