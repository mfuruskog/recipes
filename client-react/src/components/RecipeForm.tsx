/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { MAX_RATING } from '../constants';
import { Recipe } from '../types';
import { RecipeContext } from '../contexts/recipe-context';
import Emoji from '../components/Emoji';
import Button from '../components/Button';
import Loader from '../components/Loader';

const Form = tw.form`flex flex-col w-full`;
const Label = tw.label`flex flex-wrap mb-4`;
const RadioGroup = tw.div`mb-4`;
const TextInput = tw.input`w-full p-1 rounded-sm`;
const Rating = tw.div`w-full flex justify-end flex-row-reverse text-yellow-600 text-xl`;
const RatingLabel = tw.label`cursor-pointer`;
const RatingInput = tw.input`absolute h-0 w-0 cursor-pointer`;

type StarProps = {
  index: number;
  rating: string;
};

const Star = styled(FontAwesomeIcon)<StarProps>`
  ${tw`text-gray-400`}
  ${({ index, rating }) =>
    rating && index <= parseInt(rating) && tw`text-yellow-600`}
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
  loading?: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, callback }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, errors, watch } = useForm<RecipeFormData>({
    defaultValues: {
      title: recipe?.title,
      url: recipe?.url,
      rating: recipe?.rating?.toString(),
      type: recipe?.type._id,
      description: recipe?.description,
    },
  });
  const { state } = useContext(RecipeContext);

  const onSubmit = async (values: RecipeFormData) => {
    setLoading(true);
    await callback(values, recipe?._id);
    setLoading(false);
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
        <TextInput type="text" name="url" ref={register}></TextInput>
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
                ref={register}
                value={MAX_RATING - i}
              />
              <Star
                icon={faStarSolid}
                index={MAX_RATING - i}
                rating={watchRating}
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
          {state.filters.recipeTypes.map((r, i) => (
            <TypeLabel key={i} selected={watchType === r._id}>
              <TypeInput
                type="radio"
                name="type"
                ref={register({ required: 'Obligatoriskt' })}
                value={r._id}
              />{' '}
              <Emoji symbol={r.emoji} label={r.name} />
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
      <Button disabled={loading} type="submit">
        {!loading ? 'Spara' : <Loader size={24} />}
      </Button>
    </Form>
  );
};
export default RecipeForm;
