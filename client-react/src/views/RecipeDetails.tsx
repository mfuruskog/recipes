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
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import Button from '../components/Button';
import Loader from '../components/Loader';

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
const DeleteModal = styled(Dialog)`
  ${tw`w-5/6 bg-red-100 flex flex-wrap justify-between`}
`;
const DeleteModalHeading = tw.h2`w-full font-semibold text-center text-xl mb-4`;
const DeleteModalText = tw.p`w-full mb-8`;

const RecipeDetails: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState<Recipe>();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    setRecipe(state.recipes.data.find((r) => r._id === id) as Recipe);
  }, [state, id]);

  const put = async (values: RecipeFormData, _id: string) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      });
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/recipes/${_id}`,
        values,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(updateRecipe(data));
      setIsEditing(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      });
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/recipes/${id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(deleteRecipe(data._id));
      history.push('/');
    } catch (e) {
      setDeleting(false);
      console.log(e.message);
    }
  };

  const HeaderContent = () => {
    if (isEditing)
      return (
        <React.Fragment>
          <button tw="flex" onClick={() => setIsEditing(false)}>
            Avbryt
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
              <DeleteButton onClick={openDeleteModal}>
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
    return <RecipeForm recipe={recipe} callback={put}></RecipeForm>;
  };

  return (
    <Container>
      <Header>
        <HeaderContent></HeaderContent>
      </Header>
      <Main>
        <MainContent></MainContent>
      </Main>
      <DeleteModal isOpen={showDeleteModal} onDismiss={openDeleteModal}>
        <DeleteModalHeading>Ta bort recept</DeleteModalHeading>
        <DeleteModalText>
          Är du helt säker? Detta går inte att ångra.
        </DeleteModalText>
        <Button
          disabled={deleting}
          tw="bg-green-500 w-1/3"
          onClick={closeDeleteModal}
        >
          Avbryt
        </Button>
        <Button disabled={deleting} tw="bg-red-600 w-1/3" onClick={remove}>
          {!deleting ? 'Ja' : <Loader size={24} />}
        </Button>
      </DeleteModal>
    </Container>
  );
};

export default RecipeDetails;
