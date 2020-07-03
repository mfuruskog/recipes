/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React, { useContext } from 'react';
import axios from 'axios';
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
            axios
              .post(`${process.env.REACT_APP_API_URL}/recipes`, values)
              .then((response) => {
                dispatch(addRecipe(response.data));
                history.push('/');
              });
          }}
        ></RecipeForm>
      </Main>
    </Container>
  );
};

export default AddRecipe;
