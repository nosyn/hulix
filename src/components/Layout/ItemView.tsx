import type { NextPage } from 'next';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { Anchor, Badge, Box, Button, Container, Grid, Group, Text, Title } from '@mantine/core';

import { FaPlayCircle, FaYoutube, FaTimes } from 'react-icons/fa';
import { imageOriginal, imageResize } from '@/utils/constants';

import Image from '../Shared/Image';
import { Cast, Detail, Item, VideoTrailer } from '@/utils/types';
import Meta from '../Shared/Meta';
import MovieSlider from '../Movie/MovieSlider';
import StarRating from '../Display/StarRating';

interface ItemViewProps {
  media_type: 'movie' | 'tv';
  data: Detail;
  casts: Cast[];
  similar: Item[];
  videos: VideoTrailer[];
}

const ItemView: NextPage<ItemViewProps> = ({ media_type, data, casts, similar, videos }) => {
  const [trailerModalOpened, setTrailerModalOpened] = useState(false);

  return (
    <>
      <Meta
        title={media_type === 'movie' ? `${data.title} - Movie` : `${data.name} - TV`}
        description="Viewing Info"
        image={imageOriginal(data.backdrop_path)}
      />
      <Box
        style={{
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={() => ({
            backgroundImage: `url("${imageOriginal(data.backdrop_path)}")`,
            backgroundPosition: '50%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100vw',
            opacity: 0.5,
            zIndex: -1,
            height: '350px',
            ['@media (min-width: 768px)']: {
              height: '500px',
            },
          })}
        />
        <Box
          sx={() => ({
            display: 'flex',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '6rem',
            flexDirection: 'column',
            gap: '1.25rem',
            ['@media (min-width: 768px)']: {
              paddingLeft: '5rem',
              paddingRight: '5rem',
              paddingTop: '13rem',
              flexDirection: 'row',
            },
          })}
        >
          <Box
            sx={() => ({
              display: 'flex',
              flexShrink: 0,
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              ['@media (min-width: 768px)']: {
                width: '300px',
              },
            })}
          >
            <Image
              style={{
                borderRadius: '0.75rem',
              }}
              src={imageResize(data.poster_path, 'w300')}
              alt=""
            />
          </Box>
          <Group direction="column" spacing="md">
            <Group spacing="xs">
              {media_type === 'movie' ? (
                <Link href={`/movie/${data.id}/watch`} passHref>
                  <Anchor>
                    <Button leftIcon={<FaPlayCircle size={14} />}>Watch Now</Button>
                  </Anchor>
                </Link>
              ) : data.seasons.length > 0 && data.seasons[0].episode_count > 0 ? (
                <Link href={`/tv/${data.id}/watch`} passHref>
                  <Anchor>
                    <Button>
                      <FaPlayCircle />
                      <span>Watch now</span>
                    </Button>
                  </Anchor>
                </Link>
              ) : (
                <></>
              )}
              {videos.length > 0 && (
                <Button onClick={() => setTrailerModalOpened(true)}>
                  <Anchor>
                    <Button leftIcon={<FaYoutube size={14} />}>Watch Trailer</Button>
                  </Anchor>
                </Button>
              )}
            </Group>
            <Title
              sx={(theme) => ({
                color: theme.colors.gray[0],
              })}
            >
              {media_type === 'movie' ? data.title : data.name}
            </Title>
            <Text
              sx={(theme) => ({
                color: theme.colors.gray[0],
              })}
              size="xl"
            >
              {data.overview}
            </Text>
            {data.release_date && (
              <Text
                sx={(theme) => ({
                  color: theme.colors.gray[0],
                })}
              >
                Release Date: {data.release_date}
              </Text>
            )}
            {data.last_air_date && (
              <Text
                sx={(theme) => ({
                  color: theme.colors.gray[0],
                })}
              >
                Last Episode Date: {data.last_air_date}
              </Text>
            )}
            {data.genres && (
              <Group>
                {data.genres.map((item) => (
                  <Badge size="lg" variant="gradient">
                    {item.name}
                  </Badge>
                ))}
              </Group>
            )}
            <Group>
              {data.vote_average ? (
                <StarRating
                  stars={Math.round(data.vote_average)}
                  maximum={10}
                  extraText={` (${data.vote_count} votes)`}
                />
              ) : (
                <></>
              )}
            </Group>
            {data.homepage && (
              <Text size="xl" style={{ wordBreak: 'break-all' }}>
                Official website:{' '}
                <Anchor href={data.homepage} target="_blank" size="xl" rel="noopener noreferrer">
                  {data.homepage}
                </Anchor>
              </Text>
            )}
          </Group>
        </Box>
        <Box
          sx={() => ({
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            ['@media (min-width: 768px)']: {
              marginTop: '5rem',
            },
          })}
        >
          {casts && (
            <>
              <Title order={2} my="lg">
                Casts
              </Title>
              <Grid>
                {casts.map((item) => (
                  <Grid.Col xl={1} lg={2} md={2} sm={2} span={3}>
                    <Image
                      className="w-full h-auto object-cover rounded-xl"
                      src={imageResize(item.profile_path)}
                      alt=""
                    />
                    <p className="text-center">{item.name}</p>
                    <p className="text-orange text-center">{item.character}</p>
                  </Grid.Col>
                ))}
              </Grid>
            </>
          )}
        </Box>
        {similar && (
          <>
            <Title my="md" ml="lg" order={2}>
              Similar Movies
            </Title>
            <MovieSlider data={similar} loop={false} />
          </>
        )}
      </Box>
      {/* {trailerModalOpened && (
        <div
          onClick={() => setTrailerModalOpened(false)}
          className="fixed top-0 left-0 z-[60] w-screen h-screen flex justify-center items-center bg-[#2a2a2a80]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-screen max-w-xl flex flex-col gap-3 items-start overflow-y-auto bg-dark-lighten p-5 rounded-lg"
          >
            <div className="flex justify-between w-full">
              <h1 className="text-2xl ml-2">Movie Trailer</h1>
              <Button className="cursor-pointer" onClick={() => setTrailerModalOpened(false)}>
                <FaTimes size={30} />
              </Button>
            </div>
            {videos.length > 0 &&
              videos.map((item) => (
                <Fragment key={item.key}>
                  <h1 className="text-lg mx-2 mt-4">{item.name}</h1>
                  <div className="relative h-0 w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      )} */}
    </>
  );
};

export default ItemView;
