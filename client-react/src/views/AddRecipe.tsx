/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faStar as faStarSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { MAX_RATING, RECIPE_TYPES } from '../constants';

const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between sm:w-full md:w-1/2 px-4 mt-4`;
const Form = tw.form`flex flex-col`;
const Label = tw.label`flex flex-wrap mb-4`;
const TextInput = tw.input`w-full p-1 rounded-sm`;
const Rating = tw.div`w-full text-yellow-600 text-xl`;
const RatingInput = tw.input`absolute h-0 w-0 cursor-pointer`;

const Type = tw.div`w-full text-xl`;
type TypeProps = {
  selected: boolean;
};
const TypeLabel = styled.label<TypeProps>`
  ${tw`opacity-25`}
  ${({ selected }) => selected && tw`opacity-100`}
`;
const TypeInput = tw.input`absolute h-0 w-0 cursor-pointer`;
const DescriptionInput = tw.textarea`w-full resize-none h-32 p-1`;
const Submit = tw.button`bg-red-300 p-1 rounded-md font-bold`;
const ValidationMessage = tw.span`text-sm font-light text-red-600`;

type RecipeForm = {
  title: string;
  url: string;
  rating: number;
  type: string;
  description: string;
};
const AddRecipe: React.FC = () => {
  const { handleSubmit, register, errors, watch } = useForm<RecipeForm>();
  const onSubmit = (values: RecipeForm) => console.log(values);
  const watchRating = watch('rating');
  const watchType = watch('type');
  return (
    <div>
      <Header>
        <Link tw="flex" to={`/`}>
          <FontAwesomeIcon icon={faAngleLeft} tw="text-2xl mr-1" />
          Bakåt
        </Link>
      </Header>
      <Main>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Titel{' '}
            <TextInput
              type="text"
              name="title"
              placeholder="T.ex. Pasta Carbonara"
              ref={register({
                required: 'Obligatoriskt',
              })}
            ></TextInput>
            {errors.title && (
              <ValidationMessage>{errors.title.message}</ValidationMessage>
            )}
          </Label>

          <Label>
            Länk till recept{' '}
            <TextInput
              type="text"
              name="url"
              ref={register({
                required: 'Obligatoriskt',
              })}
            ></TextInput>
            {errors.url && (
              <ValidationMessage>{errors.url.message}</ValidationMessage>
            )}
          </Label>

          <Label>
            Betyg{' '}
            <Rating>
              {[...Array(MAX_RATING)].map((e, i) => (
                <label key={i + 1}>
                  <RatingInput
                    type="radio"
                    name="rating"
                    ref={register({ required: 'Obligatoriskt' })}
                    value={i + 1}
                  />
                  <FontAwesomeIcon
                    icon={i + 1 <= watchRating ? faStarSolid : faStarRegular}
                  ></FontAwesomeIcon>
                </label>
              ))}
            </Rating>
            {errors.rating && (
              <ValidationMessage>{errors.rating.message}</ValidationMessage>
            )}
          </Label>
          <Label>
            Typ
            <Type>
              {RECIPE_TYPES.map((r, i) => (
                <TypeLabel key={i} selected={watchType === r.type}>
                  <TypeInput
                    type="radio"
                    name="type"
                    ref={register({ required: 'Obligatoriskt' })}
                    value={r.type}
                  />{' '}
                  {r.emoji}
                </TypeLabel>
              ))}
            </Type>
            {errors.type && (
              <ValidationMessage>{errors.type.message}</ValidationMessage>
            )}
          </Label>
          <Label>
            Beskrivning eller kommentar
            <DescriptionInput
              name="description"
              ref={register()}
            ></DescriptionInput>
          </Label>
          <Submit type="submit">Spara</Submit>
        </Form>
      </Main>
    </div>
  );
};

export default AddRecipe;
