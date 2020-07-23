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
import { useHistory } from 'react-router-dom';

const Container = tw.div`w-full md:w-1/2`;
const Main = tw.main`h-full`;
const AddRecipeButton = tw.button`bg-red-400 text-white font-semibold rounded-md px-4 h-8 mb-8`;
const LoginContainer = tw.div`w-full flex flex-wrap justify-center`;
const Intro = tw.p`p-4 text-xl mb-4`;

const Home: React.FC = () => {
  const { state } = useContext(RecipeContext);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

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
      {isAuthenticated ? (
        <React.Fragment>
          <div tw="w-full flex justify-center">
            <AddRecipeButton onClick={() => history.push('/add')}>
              Lägg till recept
            </AddRecipeButton>
          </div>
          <Main>
            <Filters></Filters>
            {filterData().map((recipe, index) => (
              <RecipeItem recipe={recipe} key={index}></RecipeItem>
            ))}
          </Main>
        </React.Fragment>
      ) : (
        <LoginContainer>
          <Intro>
            I Receptlådan kan du lagra dina receptlänkar på ett smidigt sätt.
            Kom igång genom att logga in!
          </Intro>
          <LoginButton></LoginButton>
        </LoginContainer>
      )}
    </Container>
  );
};

export default Home;
