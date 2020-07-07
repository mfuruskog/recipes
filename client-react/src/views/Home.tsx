/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext } from 'react';

import Header from '../components/Header';
import Filters from '../components/Filters';
import RecipeItem from '../components/RecipeItem';
import LoginButton from '../components/LoginButton';
import { RecipeContext } from '../contexts/recipe-context';
import { useAuth0 } from '@auth0/auth0-react';

const Container = tw.div`w-full md:w-1/2`;
const Main = tw.main`h-full`;

const Home: React.FC = () => {
  const { state } = useContext(RecipeContext);
  const { isAuthenticated } = useAuth0();

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
      {isAuthenticated ? (
        <React.Fragment>
          <Header></Header>
          <Filters></Filters>
          <Main>
            {filterData().map((recipe, index) => (
              <RecipeItem recipe={recipe} key={index}></RecipeItem>
            ))}
          </Main>
        </React.Fragment>
      ) : (
        <LoginButton></LoginButton>
      )}
    </Container>
  );
};

export default Home;
