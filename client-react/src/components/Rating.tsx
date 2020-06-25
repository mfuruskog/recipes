/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const StarIcon = styled(FontAwesomeIcon)`
  ${tw`text-yellow-600`}
`;
const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <StarIcon icon={i < rating ? faStarSolid : faStarRegular} key={i} />
      ))}
    </div>
  );
};
export default Rating;
