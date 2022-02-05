/** @jsx jsx */

import { jsx } from '@emotion/react';
import tw from 'twin.macro';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import Rating from '../components/Rating';
import { Recipe } from '../types/index';
import Emoji from '../components/Emoji';

const Container = tw.div`w-full flex flex-wrap justify-between bg-white p-3 border-b border-gray-200 cursor-pointer`;
const Created = tw.div`text-sm text-gray-500`;
const Title = tw.h2`w-full text-lg font-semibold`;
const Types = tw.ul`flex`;
const Type = tw.li`mr-1`;

const RecipeItem: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`recipe/${recipe._id}`)}>
      <Created>{format(new Date(recipe.create_date), 'yyyy-MM-dd')}</Created>
      <Title>{recipe.title}</Title>
      <Types>
        {recipe.types.map((t, i) => (
          <Type key={i}>
            <Emoji symbol={t.emoji} label={t.name}></Emoji>
          </Type>
        ))}
      </Types>
      <Rating rating={recipe.rating}></Rating>
    </Container>
  );
};
export default RecipeItem;
