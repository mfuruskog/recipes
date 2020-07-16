/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React, { useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import RecipeForm, { RecipeFormData } from '../components/RecipeForm';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../contexts/recipe-context';
import { addRecipe } from '../actions';

const Container = tw.div`w-full md:w-1/2`;
const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between px-4 mt-4`;
const Back = tw.button`flex`;
const BackIcon = styled(FontAwesomeIcon)`
  ${tw`text-2xl mr-1`}
`;
const AddRecipe: React.FC = () => {
  const history = useHistory();
  const { dispatch } = useContext(RecipeContext);
  const { getAccessTokenSilently } = useAuth0();

  return (
    <Container>
      <Header>
        <Back onClick={() => history.push('/')}>
          <BackIcon icon={faAngleLeft} />
          Bakåt
        </Back>
      </Header>
      <Main>
        <RecipeForm
          callback={(values: RecipeFormData) => {
            const post = async () => {
              try {
                const accessToken = await getAccessTokenSilently({
                  audience: process.env.REACT_APP_AUTH_AUDIENCE,
                });
                axios
                  .post(`${process.env.REACT_APP_API_URL}/recipes`, values, {
                    headers: { authorization: `Bearer ${accessToken}` },
                  })
                  .then((response) => {
                    dispatch(addRecipe(response.data));
                    history.push('/');
                  });
              } catch (e) {
                console.log(e.message);
              }
            };
            post();
          }}
        ></RecipeForm>
      </Main>
    </Container>
  );
};

export default AddRecipe;
