/** @jsx jsx */

import { jsx } from '@emotion/react';
import React from 'react';

type EmojiProps = {
  symbol: string;
  label?: string;
};

const Emoji: React.FC<EmojiProps> = ({ symbol, label }) => {
  return (
    <span role="img" aria-label={label}>
      {symbol}
    </span>
  );
};

export default Emoji;
