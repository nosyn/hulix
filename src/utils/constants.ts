export const TMDB_API = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE = 'https://image.tmdb.org/t/p/';
export const EMBED_MOVIE_SOURCE = process.env.EMBED_MOVIE_SOURCE || '';

export const imageResize = (src: string, dimension: string = 'w200') =>
  `${TMDB_IMAGE}${dimension}${src}`;
export const imageOriginal = (src: string) => `${TMDB_IMAGE}original${src}`;
export const embedMovie = (id: number) =>
  EMBED_MOVIE_SOURCE ? `${EMBED_MOVIE_SOURCE}/movie?id=${id}` : '';
export const embedEpisode = (id: number, season: number, episode: number) =>
  EMBED_MOVIE_SOURCE ? `${EMBED_MOVIE_SOURCE}/tv?id=${id}&s=${season}&e=${episode}` : '';
