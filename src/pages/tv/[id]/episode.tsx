import Link from 'next/link';
import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

// Mantine UI
import { Anchor, Box, Paper, Text, Title } from '@mantine/core';

// Utils
import { Detail, Episode, Season } from '@/utils/types';
import { embedEpisode, imageOriginal, imageResize } from '@/utils/constants';
import { getTVSeasons } from '@/utils/api';

// Components
import Image from '@/components/Shared/Image';
import Meta from '@/components/Shared/Meta';
import StarRating from '@/components/Shared/StarRating';
import { HEADER_HEIGHT } from '@/components/Layout/Header';

interface TVEpisodeProps {
  seasons: Season[];
  data: Detail;
  seasonId: number;
  episodeId: number;
  episode: Episode;
}

const TVEpisode: NextPage<TVEpisodeProps> = ({ seasons, data, seasonId, episodeId, episode }) => {
  const [opened, setOpened] = useState<number | undefined>(Number(seasonId));

  return (
    <>
      <Meta
        title={`${data.name} - Episode ${episodeId} - Season ${seasonId} - eCinema`}
        description="Watch TV Episode"
        image={imageOriginal(episode.still_path)}
      />
      <Box
        sx={() => ({
          display: 'flex',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          marginTop: `${HEADER_HEIGHT + 20}px`,
          flexDirection: 'column',
          gap: '2rem',
          '@media (min-width: 1024px)': {
            paddingLeft: '5rem',
            paddingRight: '5rem',
            flexDirection: 'row',
          },
        })}
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <div style={{ paddingBottom: '56.25%', position: 'relative', width: '100%', height: 0 }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src={embedEpisode(data.id, seasonId, episodeId)}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <Link href={`/tv/${data.id}`} passHref>
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
                {data.name}
              </Anchor>
            </Link>
            <Title>{episode.name}</Title>
            <Text>{episode.overview}</Text>
            <Text>Release Date: {episode.air_date}</Text>
            <StarRating
              maximum={10}
              stars={Math.round(episode.vote_average)}
              extraText={` (${episode.vote_count} votes)`}
            />
          </div>
        </div>
        <Box
          sx={() => ({
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          })}
        >
          <Title order={3}>Other episodes</Title>
          {seasons.map((item) => (
            <Fragment key={item.season_number}>
              <Paper
                withBorder
                shadow="sm"
                p="xs"
                mt="xs"
                radius="xs"
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden',
                  gap: '0.5rem',
                  transitionProperty:
                    'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
                  transitionDuration: '300ms',
                  cursor: 'pointer',
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],

                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
                  },
                })}
                onClick={() =>
                  opened === item.season_number
                    ? setOpened(undefined)
                    : setOpened(item.season_number)
                }
              >
                <Image
                  width={45}
                  src={imageResize(item.poster_path, 'w45')}
                  alt={`${item.name} poster`}
                />

                <Title
                  order={5}
                  align="center"
                  sx={(theme) => ({
                    color: opened === item.season_number ? theme.colors.orange : '',
                  })}
                >
                  {item.name}
                </Title>
              </Paper>

              {opened === item.season_number && (
                <Box
                  mt="xs"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {item.episodes.map((e) => (
                    <Link
                      key={e.episode_number}
                      href={{
                        pathname: `/tv/${data.id}/episode`,
                        query: {
                          season: item.season_number,
                          episode: e.episode_number,
                        },
                      }}
                      passHref
                    >
                      <Anchor>
                        <Paper
                          sx={(theme) => ({
                            display: 'flex',
                            flexShrink: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': {
                              backgroundColor:
                                theme.colorScheme === 'dark'
                                  ? theme.colors.dark[5]
                                  : theme.colors.gray[3],
                            },
                          })}
                          radius="xs"
                          shadow="lg"
                          withBorder
                        >
                          <Image
                            style={{
                              objectFit: 'cover',
                              marginRight: '1rem',
                              flexShrink: 0,
                              borderRadius: '0.375rem',
                              width: '154px',
                            }}
                            src={imageResize(e.still_path, 'w154')}
                            alt=""
                          />
                          <div
                            style={{
                              flexGrow: 1,
                            }}
                          >
                            <Text
                              sx={(theme) => ({
                                color:
                                  e.episode_number === Number(episodeId) ? theme.colors.orange : '',
                              })}
                              style={{}}
                            >
                              Episode {e.episode_number}
                            </Text>
                          </div>
                        </Paper>
                      </Anchor>
                    </Link>
                  ))}
                </Box>
              )}
            </Fragment>
          ))}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  try {
    const id = params?.id as string;

    const seasonId = query.season as string;
    const episodeId = query.episode as string;

    if (!seasonId || !episodeId) return { notFound: true };

    const response = (await getTVSeasons(id)) as {
      data: Detail;
      seasons: Season[];
    };

    const episode = response.seasons
      .find((item) => item.season_number === Number(seasonId))
      ?.episodes.find((item) => item.episode_number === Number(episodeId));

    if (!episode) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...response,
        seasonId,
        episodeId,
        episode,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default TVEpisode;
