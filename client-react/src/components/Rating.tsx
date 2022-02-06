/** @jsxImportSource @emotion/react */

import tw, { styled } from 'twin.macro';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

type StarProps = {
  index: number;
  rating: number;
};

const Star = styled(FontAwesomeIcon)<StarProps>`
  ${tw`text-gray-400`}
  ${({ index, rating }) => index < rating && tw`text-yellow-600`}
`;

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <Star icon={faStarSolid} index={i} rating={rating} key={i} />
      ))}
    </div>
  );
};
export default Rating;
