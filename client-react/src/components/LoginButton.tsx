/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import { useAuth0 } from '@auth0/auth0-react';

const Button = tw.button`rounded-lg px-4 py-1 bg-red-400`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
