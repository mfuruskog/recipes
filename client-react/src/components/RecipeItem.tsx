/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Rating from '../components/Rating';
import { Recipe } from '../types/index';

const Container = tw.div`flex flex-wrap justify-between bg-white p-3 border-b border-gray-200`;
const Created = tw.div`text-sm text-gray-500`;
const Title = tw.h2`w-full text-lg font-semibold`;
const Type = tw.span``;

const RecipeItem: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`recipe/${recipe._id}`)}>
      <Created>2020-06-07</Created>
      <Title>{recipe.title}</Title>
      <Type>{recipe.type}</Type>
      <Rating rating={recipe.rating}></Rating>
    </Container>
  );
};
export default RecipeItem;
