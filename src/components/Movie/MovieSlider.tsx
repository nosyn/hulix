import type { NextPage } from 'next';

import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Item } from '../../utils/types';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  data: Item[];
  loop?: boolean;
}

// const useStyles = createStyles((theme, _params, getRef) => ({}));

const MovieSlider: NextPage<MovieSliderProps> = ({ data, loop = true }) => (
  <Swiper
    modules={[Navigation, Autoplay]}
    spaceBetween={30}
    autoplay={{ delay: 5000, disableOnInteraction: true }}
    slidesPerView={10}
    // slidesPerView="auto"
    loop={loop}
    slidesPerGroupAuto
    navigation
  >
    {data.map((item) => (
      <SwiperSlide key={item.id}>
        <MovieCard item={item} width={200} height={300} />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default MovieSlider;
