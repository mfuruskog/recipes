/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faAngleLeft,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { Recipe } from '../types/index';
import Rating from '../components/Rating';
import recipesJson from '../data/recipes.json';

const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between sm:w-full md:w-1/2 px-4 mt-4`;
const RecipeTitle = tw.h1`w-full text-center text-2xl font-semibold border-b border-gray-300 mb-4`;
const RecipeType = tw.span``;
const RecipeDescription = tw.div`w-full my-3`;
const RecipeLink = tw.a`text-green-600`;

const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    setRecipe(recipesJson.find((r) => r._id === id) as Recipe);
  }, [id]);

  if (recipe)
    return (
      <div>
        <Header>
          <Link tw="flex" to={`/`}>
            <FontAwesomeIcon icon={faAngleLeft} tw="text-2xl mr-1" />
            Bakåt
          </Link>
          <Link tw="flex" to={`/`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </Header>
        <Main>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <Rating rating={recipe.rating}></Rating>
          <RecipeType>{recipe.type}</RecipeType>
          <RecipeDescription>{recipe.description}</RecipeDescription>
          <RecipeLink href={recipe.url}>
            Gå till recept <FontAwesomeIcon icon={faExternalLinkAlt} />
          </RecipeLink>
        </Main>
      </div>
    );

  return <div></div>;
};

export default RecipeDetails;
