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
import RecipeForm from '../components/RecipeForm';

const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between sm:w-full md:w-1/2 px-4 mt-4`;
const RecipeTitle = tw.h1`w-full text-center text-2xl font-semibold border-b border-gray-300 mb-4`;
const RecipeType = tw.span``;
const RecipeDescription = tw.div`w-full my-3`;
const RecipeLink = tw.a`text-green-600`;

const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRecipe(recipesJson.find((r) => r._id === id) as Recipe);
  }, [id]);

  const HeaderContent = () => {
    if (!isEditing)
      return (
        <React.Fragment>
          <Link tw="flex" to={`/`}>
            <FontAwesomeIcon icon={faAngleLeft} tw="text-2xl mr-1" />
            Bakåt
          </Link>
          <FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)} />
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <button tw="flex" onClick={() => setIsEditing(false)}>
          Avbryt
        </button>

        <button tw="flex" onClick={() => setIsEditing(false)}>
          Spara
        </button>
      </React.Fragment>
    );
  };

  const MainContent = () => {
    if (!recipe) return null;
    if (recipe && !isEditing)
      return (
        <React.Fragment>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <Rating rating={recipe.rating}></Rating>
          <RecipeType>{recipe.type}</RecipeType>
          <RecipeDescription>{recipe.description}</RecipeDescription>
          <RecipeLink href={recipe.url}>
            Gå till recept <FontAwesomeIcon icon={faExternalLinkAlt} />
          </RecipeLink>
        </React.Fragment>
      );
    return <RecipeForm recipe={recipe}></RecipeForm>;
  };

  return (
    <React.Fragment>
      <Header>
        <HeaderContent></HeaderContent>
      </Header>
      <Main>
        <MainContent></MainContent>
      </Main>
    </React.Fragment>
  );
};

export default RecipeDetails;
