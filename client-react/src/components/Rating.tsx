/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

type StarProps = {
  active: boolean;
};
const Star = styled(FontAwesomeIcon)<StarProps>`
  ${tw`text-gray-400`}
  ${({ active }) => active && tw`text-yellow-600`}
`;

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <Star icon={faStarSolid} active={i < rating} key={i} />
      ))}
    </div>
  );
};
export default Rating;
