/** @jsxImportSource @emotion/react */

import tw from 'twin.macro';
import { useAuth0 } from '@auth0/auth0-react';

const Button = tw.button`rounded-lg px-8 py-1 bg-red-400 text-white font-semibold text-xl`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Logga in</Button>;
};

export default LoginButton;
