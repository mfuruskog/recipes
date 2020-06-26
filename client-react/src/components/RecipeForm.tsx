/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { MAX_RATING, RECIPE_TYPES } from '../constants';
import { Recipe } from '../types';

const Form = tw.form`flex flex-col`;
const Label = tw.label`flex flex-wrap mb-4`;
const RadioGroup = tw.div`mb-4`;
const TextInput = tw.input`w-full p-1 rounded-sm`;
const Rating = tw.div`w-full flex justify-end flex-row-reverse text-yellow-600 text-xl`;
const RatingLabel = tw.label`cursor-pointer`;
const RatingInput = tw.input`absolute h-0 w-0 cursor-pointer`;

type StarProps = {
  index: number;
  rating: number;
};

const Star = styled(FontAwesomeIcon)<StarProps>`
  ${tw`text-gray-400`}
  ${({ index, rating }) => index < rating && tw`text-yellow-600`}
`;

const Type = tw.div`w-full text-xl`;
type TypeProps = {
  selected: boolean;
};
const TypeLabel = styled.label<TypeProps>`
  ${tw`opacity-25 hover:opacity-100 cursor-pointer transition duration-100 ease-in`}
  ${({ selected }) => selected && tw`opacity-100`}
`;
const TypeInput = tw.input`absolute h-0 w-0 cursor-pointer`;
const DescriptionInput = tw.textarea`w-full resize-none h-32 p-1`;
const Submit = tw.button`bg-red-300 p-1 rounded-md font-bold`;
const ValidationMessage = tw.span`text-sm font-light text-red-600`;

export type RecipeFormData = {
  title: string;
  url: string;
  rating: string;
  type: string;
  description: string;
};

interface RecipeFormProps {
  recipe?: Recipe;
  callback: Function;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, callback }) => {
  const { handleSubmit, register, errors, watch } = useForm<RecipeFormData>({
    defaultValues: {
      title: recipe?.title,
      url: recipe?.url,
      rating: recipe?.rating.toString(),
      type: recipe?.type,
      description: recipe?.description,
    },
  });
  const onSubmit = (values: RecipeFormData) => {
    callback(values, recipe?._id);
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

      <RadioGroup>
        Betyg
        <Rating>
          {[...Array(MAX_RATING)].map((e, i) => (
            <RatingLabel className={'star'} key={MAX_RATING - i}>
              <RatingInput
                type="radio"
                name="rating"
                ref={register({ required: 'Obligatoriskt' })}
                value={MAX_RATING - i}
              />
              <Star
                icon={faStarSolid}
                index={MAX_RATING - i}
                rating={parseInt(watchRating)}
              ></Star>
            </RatingLabel>
          ))}
        </Rating>
        {errors.rating && (
          <ValidationMessage>{errors.rating.message}</ValidationMessage>
        )}
      </RadioGroup>
      <RadioGroup>
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
      </RadioGroup>
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
