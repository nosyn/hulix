import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Anchor, Box, Text, Title } from '@mantine/core';

// Components
import Image from '@/components/Shared/Image';
import Meta from '@/components/Shared/Meta';
import StarRating from '@/components/Shared/StarRating';

// Utils
import { embedMovie, imageOriginal, imageResize } from '@/utils/constants';
import { Detail, Item } from '@/utils/types';
import { getWatchMovieContent } from '@/utils/api';
import { HEADER_HEIGHT } from '@/components/Layout/Header';

interface WatchMovieProps {
  data: Detail;
  similar: Item[];
}

const WatchMovie: NextPage<WatchMovieProps> = ({ similar, data }) => {
  return (
    <>
      <Meta
        title={`${data.title} - Watch Episode - eCinema`}
        description="Watch the movie"
        image={imageOriginal(data.backdrop_path)}
      />
      <Box
        sx={() => ({
          display: 'flex',
          marginTop: `${HEADER_HEIGHT + 20}px`,
          flexDirection: 'column',
          gap: '2rem',
          ['@media (min-width: 1024px)']: {
            paddingLeft: '5rem',
            paddingRight: '5rem',
            flexDirection: 'row',
          },
        })}
        px="xl"
      >
        <Box
          style={{
            flexGrow: 1,
          }}
        >
          <Box style={{ paddingBottom: '56.25%', position: 'relative', width: '100%', height: 0 }}>
            <iframe
              title={data.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src={embedMovie(data.id)}
              frameBorder="0"
              allowFullScreen
            />
          </Box>
          <Box
            style={{
              display: 'flex',
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <Link href={`/movie/${data.id}`} passHref>
              <Anchor
                sx={(theme) => ({
                  transitionProperty:
                    'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
                  fontSize: '1.5rem',
                  lineHeight: '2rem',
                  '&:hover': {
                    color: theme.colors.orange,
                  },
                })}
              >
                {data.title}
              </Anchor>
            </Link>
            <Text>{data.overview}</Text>
            <Text>Release Date: {data.release_date}</Text>
            <StarRating
              maximum={10}
              stars={Math.round(data.vote_average)}
              extraText={` (${data.vote_count} votes)`}
            />
          </Box>
        </Box>
        <Box>
          <Title order={2}>Similar Movies</Title>
          <Box
            sx={() => ({
              display: 'flex',
              overflowY: 'auto',
              flexDirection: 'column',
              flexShrink: 0,
              width: '100%',
              gap: '1rem',
              maxHeight: '400px',
              position: 'relative',
              ['@media (min-width: 1024px)']: {
                width: '20rem',
                maxHeight: '80vh',
              },
            })}
            mb="lg"
          >
            {similar.map((item) => (
              <Link key={item.id} href={`/movie/${item.id}`} passHref>
                <Anchor mb="xs">
                  <Box
                    style={{
                      display: 'flex',
                      paddingRight: '1.25rem',
                      cursor: 'pointer',
                      gap: '1rem',
                    }}
                  >
                    <Image
                      style={{
                        objectFit: 'cover',
                        transitionProperty:
                          'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
                        transitionDuration: '300ms',
                        width: '92px',
                        height: '120px',
                      }}
                      src={imageResize(item.poster_path, 'w92')}
                      alt=""
                    />
                    <Box
                      style={{
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        transitionProperty:
                          'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
                        transitionDuration: '300ms',
                      }}
                    >
                      <Title order={6}>{item.title}</Title>
                      <StarRating stars={Math.round(item.vote_average / 2)} maximum={5} />
                    </Box>
                  </Box>
                </Anchor>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const response = await getWatchMovieContent(id);

    return {
      props: {
        ...response,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default WatchMovie;
