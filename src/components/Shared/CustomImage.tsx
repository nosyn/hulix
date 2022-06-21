import { Image } from '@mantine/core';
import type { ImageProps } from '@mantine/core';
import { Ref, useState } from 'react';

interface CustomImageProps extends ImageProps {
  ref?: Ref<HTMLDivElement>;
}

const CustomImage = ({ ...rest }: CustomImageProps) => {
  const [error, setError] = useState(false);

  return (
    <Image
      {...rest}
      onError={() => {
        setError(true);
      }}
      withPlaceholder={error}
    />
  );
};

export default CustomImage;
