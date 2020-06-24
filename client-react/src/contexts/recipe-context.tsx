import React, { useReducer } from 'react';
import reducer, { initialState, StateType, ActionType } from '../reducers';

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

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};
