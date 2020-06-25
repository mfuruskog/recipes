import { Recipe } from '../types';

import {
  SET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
} from '../constants';
import { ActionType } from '../actions';

export const initialState = {
  recipes: {
    data: [] as Recipe[],
  },
};
export type StateType = typeof initialState;

export default function reducer(
  state: StateType = initialState,
  action: ActionType
) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: {
          data: action.payload,
        },
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: {
          data: [...state.recipes.data, action.payload],
        },
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: {
          data: state.recipes.data.map((recipe) =>
            recipe._id === action.payload._id ? action.payload : recipe
          ),
        },
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: {
          data: state.recipes.data.filter(
            (recipe) => recipe._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
}
