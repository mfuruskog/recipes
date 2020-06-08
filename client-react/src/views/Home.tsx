/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StoreState } from '../reducers';
import { getRecipes } from '../actions';
import Header from '../components/Header';
import RecipeItem from '../components/RecipeItem';

const Main = tw.main`h-full sm:w-full md:w-1/2`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(getRecipes());

  const recipes = useSelector((state: StoreState) => state.recipes).data;

  return (
    <div>
      <Header></Header>
      <Main>
        {recipes?.map((recipe, index) => (
          <RecipeItem recipe={recipe} key={index}></RecipeItem>
        ))}
      </Main>
    </div>
  );
};

export default Home;
