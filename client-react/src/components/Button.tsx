/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonElement = tw.button`bg-red-400 flex items-center justify-center text-white font-semibold rounded-md px-4 h-8 mb-8 disabled:bg-red-200 disabled:cursor-not-allowed`;

export default function Button(
  props: ButtonProps
): React.ReactElement<ButtonProps> {
  const { children, ...rest } = props;
  return <ButtonElement {...rest}>{children}</ButtonElement>;
}
