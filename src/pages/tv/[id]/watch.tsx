import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPage } from 'next';
import { Fragment, useState } from 'react';

// Mantine UI
import {
  Anchor,
  Box,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';

// Utils
import { Detail, Season } from '@/utils/types';
import { imageOriginal, imageResize } from '@/utils/constants';
import { getTVSeasons } from '@/utils/api';

// Components
import Image from '@/components/Shared/Image';
import Meta from '@/components/Shared/Meta';
import StarRating from '@/components/Shared/StarRating';

interface WatchTVProps {
  seasons: Season[];
  data: Detail;
}

const WatchTV: NextPage<WatchTVProps> = ({ seasons, data }) => {
  const [opened, setOpened] = useState<number | undefined>();

  return (
    <>
      <Meta
        title={`${data.name} - Seasons - eCinema`}
        description="View Seasons"
        image={imageOriginal(data.backdrop_path)}
      />

      <Container px={0} pt="xl">
        <Box px="xl" mt="xl">
          <Group align="start">
            <Image
              style={{
                margin: '0 auto',
              }}
              src={imageResize(data.poster_path)}
              alt=""
            />

            <Group
              direction="column"
              sx={() => ({
                flexGrow: 1,
              })}
            >
              <Link href={`/tv/${data.id}`} passHref>
                <Anchor>
                  <Title>{data.name}</Title>
                </Anchor>
              </Link>
              <Text
                align="justify"
                style={{
                  maxWidth: '568px',
                }}
              >
                <TypographyStylesProvider>{data.overview}</TypographyStylesProvider>
              </Text>
              <Text size="sm">{data.last_air_date}</Text>
              <StarRating
                stars={Math.round(data.vote_average)}
                maximum={10}
                extraText={` (${data.vote_count} votes)`}
              />
            </Group>
          </Group>
          <Title order={1} my="md">
            Seasons
          </Title>
          {seasons.map((item) => (
            <Fragment key={item.season_number}>
              <Paper
                withBorder
                shadow="sm"
                p="md"
                mt="md"
                radius="lg"
                sx={(theme) => ({
                  display: 'flex',
                  overflow: 'hidden',
                  gap: '1rem',
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
                  width={154}
                  src={imageResize(item.poster_path, 'w154')}
                  alt={`${item.name} poster`}
                />

                <Stack justify="center" spacing="xs">
                  <Title
                    order={2}
                    sx={(theme) => ({
                      color: opened === item.season_number ? theme.colors.orange : '',
                    })}
                  >
                    {item.name}
                  </Title>
                  <Text component="p" size="lg">
                    {item.episodes.length} Episode
                    {item.episodes.length === 1 ? '' : 's'}
                  </Text>
                </Stack>
              </Paper>

              {opened === item.season_number && (
                <Paper shadow="xl" mt="md" py="md" withBorder>
                  {item.episodes.map((e, index) => (
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
                        <div
                          key={e.episode_number}
                          style={{
                            display: 'flex',
                            overflow: 'hidden',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem',
                            transitionProperty:
                              'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
                            transitionDuration: '300ms',
                            alignItems: 'center',
                            width: '100%',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                          }}
                        >
                          <Box
                            sx={() => ({
                              display: 'none',
                              flexShrink: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '2.5rem',
                              ['@media (min-width: 768px)']: {
                                display: 'flex',
                              },
                            })}
                          >
                            <Title order={3} align="center">
                              {index + 1}
                            </Title>
                          </Box>
                          <Image
                            style={{
                              objectFit: 'cover',
                              marginRight: '1rem',
                              flexShrink: 0,
                              borderRadius: '0.375rem',
                              width: '154px',
                              height: '87px',
                            }}
                            src={imageResize(e.still_path, 'w154')}
                            alt=""
                          />
                          <div
                            style={{
                              flexGrow: 1,
                            }}
                          >
                            <Title order={3}>{e.name}</Title>
                            <Text weight="lighter" size="md">
                              {e.air_date}
                            </Text>
                          </div>
                        </div>
                      </Anchor>
                    </Link>
                  ))}
                </Paper>
              )}
            </Fragment>
          ))}
        </Box>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;

    const result = await getTVSeasons(id);

    return {
      props: {
        ...result,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log(error);
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

export default WatchTV;
