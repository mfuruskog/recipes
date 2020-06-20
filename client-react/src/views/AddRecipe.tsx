/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import RecipeForm from '../components/RecipeForm';

const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between sm:w-full md:w-1/2 px-4 mt-4`;

const AddRecipe: React.FC = () => {
  return (
    <div>
      <Header>
        <Link tw="flex" to={`/`}>
          <FontAwesomeIcon icon={faAngleLeft} tw="text-2xl mr-1" />
          Bakåt
        </Link>
      </Header>
      <Main>
        <RecipeForm></RecipeForm>
      </Main>
    </div>
  );
};

export default AddRecipe;
