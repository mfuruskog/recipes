/** @jsxImportSource @emotion/react */

import tw, { styled } from 'twin.macro';
import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { setInvites } from '../actions';
import { AppContext } from '../contexts/app-context';
import Loader from '../components/Loader';

const Container = tw.div`w-full md:w-1/2`;
const Header = tw.header`flex justify-between px-4 mt-4`;

const Main = tw.main`flex flex-wrap justify-between mt-4`;
const Back = tw.button`flex`;
const BackIcon = styled(FontAwesomeIcon)`
  ${tw`text-2xl mr-1`}
`;

const InviteHeading = tw.h2`text-xl font-semibold m-3`
const InviteItem = tw.div`w-full flex flex-wrap justify-between bg-white p-3 border-b border-gray-200`;
const Email = tw.h3`w-3/4 text-lg font-semibold leading-8`;
const InviteActions = tw.div``
const Accept = tw.button`rounded-full border-2 w-8 h-8`
const AcceptIcon = styled(FontAwesomeIcon)`
  ${tw``}
`
const Reject = tw.button`rounded-full border-2 w-8 h-8 mr-2`
const RejectIcon = styled(FontAwesomeIcon)`
  ${tw``}
`

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { state, dispatch } = useContext(AppContext);

  const acceptInvite = async (id: string) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
    });

    await axios.post(
      `${process.env.REACT_APP_API_URL}/invite/${id}/accept`, {},
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
  }

  const rejectInvite = async (id: string) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
    });

    await axios.post(
      `${process.env.REACT_APP_API_URL}/invite/${id}/reject`, {},
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
  }
  
  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH_AUDIENCE,
        });
        axios
          .get(`${process.env.REACT_APP_API_URL}/invite/received`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => dispatch(setInvites(response.data)));
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message)
        }
      }
    };
    getData();
  }, [])
  
  
  return (
    <Container>
      <Header>
        <Back onClick={() => navigate('/')}>
          <BackIcon icon={faAngleLeft} />
          Bakåt
        </Back>
      </Header>
      <Main>
      <InviteHeading>Inbjudningar</InviteHeading>
      {state.invites.loading ? (
              <Loader />
            ) : (
              
              state.invites.data.map((invite, index) => (
                <InviteItem key={index}>
                  <Email>{invite.sender}</Email>
                  <InviteActions>
                  <Reject onClick={() => rejectInvite(invite._id)}>
                    <RejectIcon icon={faTimes} />
                  </Reject>
                  <Accept onClick={() => acceptInvite(invite._id)}>
                    <AcceptIcon icon={faCheck} />
                  </Accept>
                  </InviteActions>
              </InviteItem>
              ))
            )}
      </Main>
    </Container>
  );
};

export default Settings;
