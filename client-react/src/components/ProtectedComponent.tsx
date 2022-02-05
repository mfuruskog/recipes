import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';


export const ProtectedComponent = ({
  component
}: React.PropsWithChildren<any>) => {
  let Comp = withAuthenticationRequired(component);
  return <Comp />
}
