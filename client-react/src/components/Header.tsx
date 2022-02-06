/** @jsxImportSource @emotion/react */

import tw from 'twin.macro';

const HeaderContainer = tw.div`flex flex-col justify-between items-center p-2 bg-red-100`;
const Heading = tw.h1`font-bold text-4xl mb-2`;
const Header = () => {
  return (
    <HeaderContainer>
      <Heading>Receptlådan</Heading>
    </HeaderContainer>
  );
};

export default Header;
