/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';

const HeaderContainer = tw.div`flex flex-col justify-between items-center p-2 bg-blue-200`;
const Heading = tw.h1`font-bold text-4xl mb-2`;
const AddRecipeButton = tw.button`bg-green-700 rounded-md text-white font-bold px-2 h-8 mb-2`;
const Header = () => (
  <HeaderContainer>
    <Heading>Receptlådan</Heading>
    <AddRecipeButton>Lägg till recept</AddRecipeButton>
  </HeaderContainer>
);

export default Header;
