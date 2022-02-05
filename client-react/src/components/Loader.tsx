/** @jsx jsx */

import { jsx } from '@emotion/react';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

type LoaderProps = {
  size?: number;
};

const Loader: React.FC<LoaderProps> = ({ size = 32 }) => {
  return <ClipLoader color={'#FC8181'} size={size} />;
};

export default Loader;
