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

  const post = async (values: RecipeFormData) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/recipes`,
        values,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      dispatch(addRecipe(data));
      history.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      <Header>
        <Back onClick={() => history.push('/')}>
          <BackIcon icon={faAngleLeft} />
          Bakåt
        </Back>
      </Header>
      <Main>
        <RecipeForm callback={post}></RecipeForm>
      </Main>
    </Container>
  );
};

export default AddRecipe;
