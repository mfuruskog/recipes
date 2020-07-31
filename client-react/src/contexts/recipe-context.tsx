import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, { initialState, StateType } from '../reducers';
import {
  setRecipesLoading,
  setRecipes,
  setRecipeTypes,
  ActionType,
} from '../actions';
import { useAuth0 } from '@auth0/auth0-react';

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
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      const getData = async () => {
        dispatch(setRecipesLoading());
        try {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
          });
          axios
            .get(`${process.env.REACT_APP_API_URL}/recipes`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => dispatch(setRecipes(response.data)));
          axios
            .get(`${process.env.REACT_APP_API_URL}/recipetypes`)
            .then((response) => dispatch(setRecipeTypes(response.data)));
        } catch (e) {
          console.log(e.message);
        }
      };
      getData();
    }
  }, [dispatch, getAccessTokenSilently, isAuthenticated]);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};
