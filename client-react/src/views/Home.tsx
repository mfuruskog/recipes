/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext } from 'react';

import Header from '../components/Header';
import Filters from '../components/Filters';
import RecipeItem from '../components/RecipeItem';
import LoginButton from '../components/LoginButton';
import Button from '../components/Button';
import { RecipeContext } from '../contexts/recipe-context';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';

const Container = tw.div`w-full md:w-1/2`;
const Main = tw.main`flex flex-wrap justify-center`;
const LoginContainer = tw.div`w-full flex flex-wrap justify-center`;
const Intro = tw.p`p-4 text-xl mb-4`;

const Home: React.FC = () => {
  const { state } = useContext(RecipeContext);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  const filterData = () => {
    let filteredData = state.recipes.data;

    if (state.filters.selectedType)
      filteredData = filteredData.filter(
        (recipe) => recipe.type.key === state.filters.selectedType
      );
    return filteredData;
  };

  return (
    <Container>
      <Header></Header>
      {isAuthenticated ? (
        <React.Fragment>
          <div tw="w-full flex justify-center">
            <Button tw="mb-4" onClick={() => history.push('/add')}>
              Lägg till recept
            </Button>
          </div>
          <Main>
            <Filters></Filters>
            {state.recipes.loading ? (
              <Loader />
            ) : (
              filterData().map((recipe, index) => (
                <RecipeItem recipe={recipe} key={index}></RecipeItem>
              ))
            )}
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
