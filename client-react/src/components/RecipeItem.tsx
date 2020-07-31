/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import Rating from '../components/Rating';
import { Recipe } from '../types/index';
import Emoji from '../components/Emoji';

const Container = tw.div`w-full flex flex-wrap justify-between bg-white p-3 border-b border-gray-200 cursor-pointer`;
const Created = tw.div`text-sm text-gray-500`;
const Title = tw.h2`w-full text-lg font-semibold`;
const Type = tw.span``;

const RecipeItem: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`recipe/${recipe._id}`)}>
      <Created>{format(new Date(recipe.create_date), 'yyyy-MM-dd')}</Created>
      <Title>{recipe.title}</Title>
      <Type>
        <Emoji symbol={recipe.type.emoji} label={recipe.type.name}></Emoji>
      </Type>
      <Rating rating={recipe.rating}></Rating>
    </Container>
  );
};
export default RecipeItem;
