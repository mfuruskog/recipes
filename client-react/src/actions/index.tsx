import { SET_RECIPES } from '../constants';
import { Recipe } from '../types';

export function setRecipes(data: Recipe[]) {
  return {
    type: SET_RECIPES,
    payload: data,
  };
}
export type ActionType = ReturnType<typeof setRecipes>;
