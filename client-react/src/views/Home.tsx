/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext, useEffect } from 'react';

import { getRecipes } from '../actions';
import Header from '../components/Header';
import RecipeItem from '../components/RecipeItem';
import { RecipeContext } from '../contexts/recipe-context';

const Main = tw.main`h-full sm:w-full md:w-1/2`;

const Home: React.FC = () => {
  const { state, dispatch } = useContext(RecipeContext);
  useEffect(() => {
    dispatch({ type: 'GET_RECIPES' });
  }, [dispatch]);

  return (
    <div>
      <Header></Header>
      <Main>
        {state.recipes.map((recipe, index) => (
          <RecipeItem recipe={recipe} key={index}></RecipeItem>
        ))}
      </Main>
    </div>
  );
};

export default Home;
