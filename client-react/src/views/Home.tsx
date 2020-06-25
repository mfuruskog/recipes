/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext } from 'react';

import Header from '../components/Header';
import RecipeItem from '../components/RecipeItem';
import { RecipeContext } from '../contexts/recipe-context';

const Main = tw.main`h-full sm:w-full md:w-1/2`;

const Home: React.FC = () => {
  const { state } = useContext(RecipeContext);

  return (
    <div>
      <Header></Header>
      <Main>
        {state.recipes.data.map((recipe, index) => (
          <RecipeItem recipe={recipe} key={index}></RecipeItem>
        ))}
      </Main>
    </div>
  );
};

export default Home;
