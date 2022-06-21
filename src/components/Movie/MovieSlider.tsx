import type { NextPage } from 'next';

import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Item } from '@/utils/types';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  data: Item[];
  loop?: boolean;
}

const MovieSlider: NextPage<MovieSliderProps> = ({ data, loop = true }) => (
  <Swiper
    style={{
      width: 'calc(100vw - 16px)',
      paddingLeft: '16px',
      paddingRight: '16px',
    }}
    modules={[Navigation, Autoplay]}
    spaceBetween={30}
    autoplay={{ delay: 5000, disableOnInteraction: true }}
    slidesPerView="auto"
    loop={loop}
    slidesPerGroupAuto
    navigation
  >
    <div
      style={{
        display: 'flex',
      }}
    >
      {data.map((item) => (
        <SwiperSlide
          key={item.id}
          style={{
            width: '200px',
            display: 'flex',
          }}
        >
          <MovieCard item={item} width={200} height={300} />
        </SwiperSlide>
      ))}
    </div>
  </Swiper>
);

export default MovieSlider;
