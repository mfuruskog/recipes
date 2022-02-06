/** @jsxImportSource @emotion/react */

import tw from 'twin.macro';
import React, { useContext } from 'react';
import { RecipeContext } from '../contexts/recipe-context';
import { setFilter } from '../actions';
import Loader from '../components/Loader';

const FiltersContainer = tw.div`w-full justify-center flex mb-4 px-4`;
const TypeFilter = tw.select`p-2`;
const Type = tw.option``;

const Filters = () => {
  const { state, dispatch } = useContext(RecipeContext);

  const applyTypeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ ...state.filters, selectedType: event.target.value }));
  };

  return (
    <FiltersContainer>
      {state.filters.loading ? (
        <Loader />
      ) : (
        <TypeFilter
          value={state.filters.selectedType}
          onChange={applyTypeFilter}
        >
          <Type value="">Välj</Type>
          {state.filters.recipeTypes.map((type, index) => (
            <Type value={type.key} key={index}>
              {type.emoji} {type.name}
            </Type>
          ))}
        </TypeFilter>
      )}
    </FiltersContainer>
  );
};

export default Filters;
