/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import RecipeForm, { RecipeFormData } from '../components/RecipeForm';
import { useHistory } from 'react-router-dom';
import { RecipeContext } from '../contexts/recipe-context';
import { addRecipe } from '../actions';

const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between sm:w-full md:w-1/2 px-4 mt-4`;

const AddRecipe: React.FC = () => {
  const history = useHistory();
  const { dispatch } = useContext(RecipeContext);
  return (
    <div>
      <Header>
        <Link tw="flex" to={`/`}>
          <FontAwesomeIcon icon={faAngleLeft} tw="text-2xl mr-1" />
          Bakåt
        </Link>
      </Header>
      <Main>
        <RecipeForm
          callback={(values: RecipeFormData) => {
            axios
              .post(`http://localhost:3000/recipes`, values)
              .then((response) => {
                dispatch(addRecipe(response.data));
                history.push('/');
              });
          }}
        ></RecipeForm>
      </Main>
    </div>
  );
};

export default AddRecipe;
