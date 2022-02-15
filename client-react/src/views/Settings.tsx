/** @jsxImportSource @emotion/react */

import tw, { styled } from 'twin.macro';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Container = tw.div`w-full md:w-1/2`;
const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between px-4 mt-4`;
const Back = tw.button`flex`;
const BackIcon = styled(FontAwesomeIcon)`
  ${tw`text-2xl mr-1`}
`;

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Back onClick={() => navigate('/')}>
          <BackIcon icon={faAngleLeft} />
          Bakåt
        </Back>
      </Header>
      <Main>
      </Main>
    </Container>
  );
};

export default Settings;
