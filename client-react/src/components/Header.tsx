/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import { useHistory } from 'react-router-dom';

const HeaderContainer = tw.div`flex flex-col justify-between items-center p-2 bg-red-100`;
const Heading = tw.h1`font-bold text-4xl mb-2`;
const AddRecipeButton = tw.button`bg-green-700 rounded-md text-white font-bold px-2 h-8 mb-2`;
const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer>
      <Heading>Receptlådan</Heading>
      <AddRecipeButton onClick={() => history.push('/add')}>
        Lägg till recept
      </AddRecipeButton>
    </HeaderContainer>
  );
};

export default Header;
