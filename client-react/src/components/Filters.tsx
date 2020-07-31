/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React, { useContext } from 'react';
import { RecipeContext } from '../contexts/recipe-context';
import { setFilter } from '../actions';

const FiltersContainer = tw.div`w-full mb-4 px-4`;
const TypeFilter = tw.select`p-2`;
const Type = tw.option``;

const Filters = () => {
  const { state, dispatch } = useContext(RecipeContext);

  const applyTypeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ ...state.filters, type: event.target.value }));
  };

  return (
    <FiltersContainer>
      <TypeFilter value={state.filters.type} onChange={applyTypeFilter}>
        <Type value="">Välj</Type>
        {state.recipeTypes.data.map((type, index) => (
          <Type value={type.key} key={index}>
            {type.emoji} {type.name}
          </Type>
        ))}
      </TypeFilter>
    </FiltersContainer>
  );
};

export default Filters;
