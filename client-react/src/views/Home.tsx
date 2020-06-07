/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useState, useEffect } from 'react';

import { Recipe } from '../types/index';
import Header from '../components/Header';
import RecipeItem from '../components/RecipeItem';
import recipesJson from '../data/recipes.json';
const recipesData = recipesJson.map((r) => r as Recipe);

const Main = tw.main`h-full sm:w-full md:w-1/2`;

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div>
      <Header></Header>
      <Main>
        {recipes.map((recipe, index) => (
          <RecipeItem recipe={recipe} key={index}></RecipeItem>
        ))}
      </Main>
    </div>
  );
};

export default Home;
