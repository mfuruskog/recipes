/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { MAX_RATING, RECIPE_TYPES } from '../constants';
import { Recipe } from '../types';
import { RecipeContext } from '../contexts/recipe-context';
import { addRecipe } from '../actions';

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

type FormData = {
  title: string;
  url: string;
  rating: number;
  type: string;
  description: string;
};

interface RecipeFormProps {
  recipe?: Recipe;
  callback: Function;
}
const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, callback }) => {
  const { dispatch } = useContext(RecipeContext);
  const { handleSubmit, register, errors, watch } = useForm<FormData>({
    defaultValues: {
      title: recipe?.title,
      url: recipe?.url,
      rating: recipe?.rating,
      type: recipe?.type,
      description: recipe?.description,
    },
  });
  const onSubmit = (values: FormData) => {
    axios.post(`http://localhost:3000/recipes`, values).then((response) => {
      dispatch(addRecipe(response.data));
      callback();
    });
  };
  const watchRating = watch('rating');
  const watchType = watch('type');
  return (
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
  );
};
export default RecipeForm;
