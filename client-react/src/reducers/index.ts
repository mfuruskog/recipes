import { Recipe } from '../types';

import { GET_RECIPES } from '../constants';

export type ActionType = {
  type: GET_RECIPES;
};
export const initialState = {
  recipes: [] as Recipe[],
};
export type StateType = typeof initialState;

export default function reducer(
  state: StateType = initialState,
  action: ActionType
) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: [
          {
            _id: '5ebd1d5240d500bf2b5416cd',
            title: 'Köttförssås med spagetti mms',
            url: 'https://google.se',
            type: 'fish',
            rating: 3,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis odio est, a pharetra diam pulvinar quis. Duis aliquam augue quis tristique egestas. Phasellus ac bibendum justo.',
          },
        ],
      };
    default:
      return state;
  }
}
