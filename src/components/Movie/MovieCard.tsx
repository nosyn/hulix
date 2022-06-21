import type { NextPage } from 'next';
import Link from 'next/link';
import { Anchor, Text } from '@mantine/core';
import { imageResize } from '@/utils/constants';

import Image from '@/components/Shared/Image';
import { Item } from '@/utils/types';

interface MovieCardProps {
  item: Item;
  height: number | string;
  width: number | string;
}

const MovieCard: NextPage<MovieCardProps> = ({ item, height, width }) => (
  <Link href={item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`} passHref>
    <Anchor>
      <Image fit="cover" height={height} width={width} src={imageResize(item.poster_path)} alt="" />
      <Text
        p="xs"
        style={{
          overflow: 'hidden',
          transitionProperty:
            'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
          transitionDuration: '300ms',
          width: '100%',
          height: '60px',
        }}
      >
        {item.title || item.name}
      </Text>
    </Anchor>
  </Link>
);

export default MovieCard;
