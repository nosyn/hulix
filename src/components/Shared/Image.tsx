import { Image as MIMage } from '@mantine/core';
import type { ImageProps as MImageProps } from '@mantine/core';
import { Ref, useState } from 'react';

interface ImageProps extends MImageProps {
  ref?: Ref<HTMLDivElement>;
}

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
