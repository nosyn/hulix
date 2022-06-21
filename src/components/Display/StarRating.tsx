import type { NextPage } from 'next';

import { Text } from '@mantine/core';

interface StarRatingProps {
  stars: number;
  maximum: number;
  extraText?: string;
}

const StarRating: NextPage<StarRatingProps> = ({ stars = 0, maximum, extraText = '' }) => {
  return (
    <div>
      {new Array(maximum).fill('').map((_, index) => (
        <Text component="span" key={index} size="xl" color={index < stars ? 'orange' : 'gray'}>
          &#9733;
        </Text>
      ))}
      <Text component="span">{extraText}</Text>
    </div>
  );
};

export default StarRating;
