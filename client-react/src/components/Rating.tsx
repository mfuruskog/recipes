/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <FontAwesomeIcon
          tw="text-yellow-600"
          icon={i < rating ? faStarSolid : faStarRegular}
          key={i}
        />
      ))}
    </div>
  );
};
export default Rating;
