import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, { initialState, StateType } from '../reducers';
import { setRecipes, ActionType } from '../actions';

type Props = {
  children: React.ReactNode;
};
export const RecipeContext = React.createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const RecipeProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes`)
      .then((response) => dispatch(setRecipes(response.data)));
  }, [dispatch]);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};
