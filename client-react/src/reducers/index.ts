import { Recipe } from '../types';

import { SET_RECIPES } from '../constants';
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
    default:
      return state;
  }
}
