/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext } from 'react';

import Header from '../components/Header';
import Filters from '../components/Filters';
import RecipeItem from '../components/RecipeItem';
import { RecipeContext } from '../contexts/recipe-context';

const Container = tw.div`w-full md:w-1/2`;
const Main = tw.main`h-full`;

const Home: React.FC = () => {
  const { state } = useContext(RecipeContext);

  const filterData = () => {
    let filteredData = state.recipes.data;

    if (state.filters.type)
      filteredData = filteredData.filter(
        (recipe) => recipe.type.key === state.filters.type
      );
    return filteredData;
  };

  return (
    <Container>
      <Header></Header>
      <Filters></Filters>
      <Main>
        {filterData().map((recipe, index) => (
          <RecipeItem recipe={recipe} key={index}></RecipeItem>
        ))}
      </Main>
    </Container>
  );
};

export default Home;
