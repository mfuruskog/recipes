/** @jsxImportSource @emotion/react */

import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import tw, { styled } from 'twin.macro';

const HeaderContainer = tw.div`grid grid-cols-12 mb-3 px-2`;
const Heading = tw.h1`col-start-3 justify-self-center col-span-8 text-4xl font-bold`;
const Settings = tw.button`col-start-12 justify-self-center self-center flex justify-center`
const SettingsIcon = styled(FontAwesomeIcon)`
  ${tw`text-2xl`}
`;
const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Heading>Receptlådan</Heading>
      <Settings onClick={() => navigate('/settings')}>
          <SettingsIcon icon={faCog} />
        </Settings>
      </HeaderContainer>
  );
};

export default Header;
