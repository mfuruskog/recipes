import { Recipe } from '../types';

import { GET_RECIPES } from '../constants';

export const initialState = {
  recipes: {
    data: [] as Recipe[],
  },
};

export type StoreState = typeof initialState;

export default function reducer(state = initialState, action: any): StoreState {
  switch (action.type) {
    case GET_RECIPES:
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
