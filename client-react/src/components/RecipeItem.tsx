/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';

import { Recipe } from '../types/index';

const Container = tw.div`flex flex-wrap justify-between bg-white p-3 border-b border-gray-200`;
const Created = tw.div`text-sm text-gray-500`;
const Title = tw.h2`w-full text-lg font-semibold`;
const Type = tw.span``;
const Rating = tw.span``;

const RecipeItem: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Container>
      <Created>2020-06-07</Created>
      <Title>{recipe.title}</Title>
      <Type>{recipe.type}</Type>
      <Rating>{recipe.rating}</Rating>
    </Container>
  );
};
export default RecipeItem;
