import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

// Mantine UI
import { Anchor, Badge, Box, Button, Grid, Group, Modal, Text, Title } from '@mantine/core';
import { FaPlayCircle, FaYoutube } from 'react-icons/fa';

// Utils
import { imageOriginal, imageResize } from '@/utils/constants';
import { Cast, Detail, Item, VideoTrailer } from '@/utils/types';

// Components
import Image from '../Shared/Image';
import Meta from '../Shared/Meta';
import MovieSlider from '../Movie/MovieSlider';
import StarRating from '../Shared/StarRating';

interface ItemViewProps {
  media_type: 'movie' | 'tv';
  data: Detail;
  casts: Cast[];
  similar: Item[];
  videos: VideoTrailer[];
}

const ItemView: NextPage<ItemViewProps> = ({ media_type, data, casts, similar, videos }) => {
  const [trailerModalOpened, setTrailerModalOpened] = useState(false);
  const isTrailer = videos.length > 0;

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
              {isTrailer && (
                <Anchor>
                  <Button
                    onClick={() => setTrailerModalOpened(true)}
                    leftIcon={<FaYoutube size={14} />}
                  >
                    Watch Trailer
                  </Button>
                </Anchor>
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
                  <Badge size="lg" variant="gradient" key={item.name}>
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
                  <Grid.Col xl={1} lg={2} md={2} sm={2} span={3} key={item.id}>
                    <Image src={imageResize(item.profile_path)} alt="" />
                    <Text size="xl">{item.name}</Text>
                    <Text size="sm">as {item.character}</Text>
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
      {isTrailer && (
        <Modal
          opened={trailerModalOpened}
          onClose={() => setTrailerModalOpened(false)}
          title="Movie Trailer"
          styles={{
            modal: {
              width: '56.25%',
            },
          }}
        >
          {videos.map((item) => (
            <Box key={item.key} my="lg">
              <Title order={2} mx="md" mt="lg">
                {item.name}
              </Title>
              <Box
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  width: '100%',
                  height: 0,
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Box>
          ))}
        </Modal>
      )}
    </>
  );
};

export default ItemView;
