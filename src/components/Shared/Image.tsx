import { Image as MIMage } from '@mantine/core';
import type { ImageProps } from '@mantine/core';
import { useState } from 'react';

const Image = ({ ...rest }: ImageProps) => {
  const [error, setError] = useState(false);

  return (
    <MIMage
      {...rest}
      onError={() => {
        setError(true);
      }}
      withPlaceholder={error}
    />
  );
};

export default Image;
