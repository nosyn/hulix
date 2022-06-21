import type { NextPage } from 'next';
import Link from 'next/link';
import { imageResize } from '../../utils/constants';

import Image from '../Shared/Image';
import { Item } from '../../utils/types';

interface MovieCardProps {
  item: Item;
  height: number | string;
  width: number | string;
}

const MovieCard: NextPage<MovieCardProps> = ({ item, height, width }) => (
  <Link href={item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`}>
    <a>
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        <Image
          style={{ height, width, objectFit: 'cover' }}
          src={imageResize(item.poster_path)}
          alt=""
        />
        <p
          style={{
            overflow: 'hidden',
            padding: '0.5rem',
            transitionProperty:
              'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            transitionDuration: '300ms',
            width: '100%',
            height: '60px',
          }}
        >
          {item.title || item.name}
        </p>
      </div>
    </a>
  </Link>
);

export default MovieCard;
