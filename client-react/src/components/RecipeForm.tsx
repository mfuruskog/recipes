/** @jsxImportSource @emotion/react */

import tw, { styled } from 'twin.macro';
import React, { useContext, useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { MAX_RATING } from '../constants';
import { Recipe } from '../types';
import { AppContext } from '../contexts/app-context';
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
  description: string;
  types: string[];
};

interface RecipeFormProps {
  recipe?: Recipe;
  callback: Function;
  loading?: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, callback }) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, watch, formState: { errors } } = useForm<RecipeFormData>({
    defaultValues: {
      title: recipe?.title,
      url: recipe?.url,
      rating: recipe?.rating?.toString(),
      types: recipe ? recipe.types.map((t) => t._id) : [],
      description: recipe?.description,
    },
  });
  const { state } = useContext(AppContext);

  const onSubmit = async (values: RecipeFormData) => {
    setLoading(true);
    await callback(values, recipe?._id);
  };

  const watchRating = watch('rating');
  const watchTypes = watch('types');
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Titel{' '}
        <TextInput
          {...register("title", { required: "Obligatoriskt"})}
          type="text"
          placeholder="T.ex. Pasta Carbonara"
        ></TextInput>
        {errors.title && (
          <ValidationMessage>{errors.title.message}</ValidationMessage>
        )}
      </Label>

      <Label>
        Länk till recept{' '}
        <TextInput {...register("url")} type="text"></TextInput>
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
                {...register("rating")}
                type="radio"
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
          {state.filters.recipeTypes.map((r, i) => {
            return (
              <TypeLabel key={i} selected={watchTypes.includes(r._id)}>
                <TypeInput
                  {...register("types", { required: "Obligatoriskt" })}
                  type="checkbox"
                  name="types"
                  value={r._id}
                />{' '}
                <Emoji symbol={r.emoji} label={r.name} />
              </TypeLabel>
            );
          })}
        </Type>
        {errors.types && (
          <ValidationMessage>
            {((errors.types as unknown) as FieldError)?.message}
          </ValidationMessage>
        )}
      </RadioGroup>
      <Label>
        Beskrivning eller kommentar
        <DescriptionInput
          {...register("description")}
        ></DescriptionInput>
      </Label>
      <Button disabled={loading} type="submit">
        {!loading ? 'Spara' : <Loader size={24} />}
      </Button>
    </Form>
  );
};
export default RecipeForm;
