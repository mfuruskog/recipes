/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faAngleLeft,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from '@auth0/auth0-react';

import { Recipe } from '../types/index';
import Rating from '../components/Rating';
import Emoji from '../components/Emoji';
import RecipeForm, { RecipeFormData } from '../components/RecipeForm';
import { RecipeContext } from '../contexts/recipe-context';
import { updateRecipe, deleteRecipe } from '../actions';

const Container = tw.div`w-full md:w-1/2`;
const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between px-4 mt-4`;
const RecipeTitle = tw.h1`w-full text-center text-2xl font-semibold border-b border-gray-300 mb-4`;
const RecipeType = tw.span``;
const RecipeDescription = tw.div`w-full my-3`;
const RecipeLink = tw.a`text-green-600`;
const Menu = tw.span``;
const Back = tw.button`flex`;
const BackIcon = styled(FontAwesomeIcon)`
  ${tw`text-2xl mr-1`}
`;
const DeleteButton = tw.button`mr-4`;

const RecipeDetails: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState<Recipe>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRecipe(state.recipes.data.find((r) => r._id === id) as Recipe);
  }, [state, id]);

  const HeaderContent = () => {
    if (isEditing)
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
    return (
      <React.Fragment>
        <Back onClick={() => history.push('/')}>
          <BackIcon icon={faAngleLeft} />
          Bakåt
        </Back>
        <Menu>
          {recipe ? (
            <React.Fragment>
              <DeleteButton
                onClick={() => {
                  const deleteCall = async () => {
                    try {
                      const accessToken = await getAccessTokenSilently({
                        audience: process.env.REACT_APP_AUTH_AUDIENCE,
                      });
                      axios
                        .delete(
                          `${process.env.REACT_APP_API_URL}/recipes/${recipe._id}`,
                          {
                            headers: {
                              authorization: `Bearer ${accessToken}`,
                            },
                          }
                        )
                        .then((response) => {
                          dispatch(deleteRecipe(response.data._id));
                          history.push('/');
                        });
                    } catch (e) {
                      console.log(e.message);
                    }
                  };
                  deleteCall();
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </DeleteButton>
              <button onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </React.Fragment>
          ) : null}
        </Menu>
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
          <RecipeType>
            <Emoji symbol={recipe.type.emoji} label={recipe.type.name}></Emoji>
          </RecipeType>
          <RecipeDescription>{recipe.description}</RecipeDescription>
          <RecipeLink href={recipe.url}>
            Gå till recept <FontAwesomeIcon icon={faExternalLinkAlt} />
          </RecipeLink>
        </React.Fragment>
      );
    return (
      <RecipeForm
        recipe={recipe}
        callback={(values: RecipeFormData, _id: string) => {
          const put = async () => {
            try {
              const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH_AUDIENCE,
              });
              axios
                .put(
                  `${process.env.REACT_APP_API_URL}/recipes/${_id}`,
                  values,
                  {
                    headers: {
                      authorization: `Bearer ${accessToken}`,
                    },
                  }
                )
                .then((response) => {
                  dispatch(updateRecipe(response.data));
                  setIsEditing(false);
                });
            } catch (e) {
              console.log(e.message);
            }
          };
          put();
        }}
      ></RecipeForm>
    );
  };

  return (
    <Container>
      <Header>
        <HeaderContent></HeaderContent>
      </Header>
      <Main>
        <MainContent></MainContent>
      </Main>
    </Container>
  );
};

export default RecipeDetails;
