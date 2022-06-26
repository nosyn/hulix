import { Anchor, Box, Button, Group, Text, Title } from '@mantine/core';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Fragment, useRef } from 'react';

// Components
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa';
import Meta from '../components/Shared/Meta';
import { getHomeData } from '../utils/api';
import { imageOriginal, imageResize } from '../utils/constants';
import { Item } from '../utils/types';
import MovieSlider from '../components/Movie/MovieSlider';
import Image from '@/components/Shared/Image';

interface HomePageProps {
  data: {
    [id: string]: Item[];
  };
  main: Item;
}

const HomePage: NextPage<HomePageProps> = ({ data, main }) => {
  return (
    <>
      <Meta
        title="Hulix - Movies for everyone"
        description="Watch your favorite movies and TV shows in out website."
        image="/preview.png"
      />

      <Box
        sx={() => ({
          display: 'none',
          position: 'relative',
          height: '56.25vw',
          ['@media (min-width: 768px)']: {
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          },
        })}
      >
        <Image
          src={imageOriginal(main.backdrop_path)}
          fit="cover"
          sx={() => ({
            position: 'absolute',
            width: '100%',
            height: '56.25vw',
          })}
          alt="Movie of the day"
        />

        <Box
          style={{
            display: 'flex',
            zIndex: 10,
            flex: '1 1 0%',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1rem',
              maxWidth: '30rem',
              marginLeft: '5rem',
            }}
            px="xs"
          >
            <Text
              component="p"
              align="center"
              sx={(theme) => ({
                color: theme.white,
                fontSize: '1.5rem',
                lineHeight: '1.5rem',
                maxWidth: '20rem',
                ['@media (min-width: 992px)']: {
                  fontSize: '3rem',
                  lineHeight: 1,
                },
              })}
            >
              {main.title || main.name}
            </Text>
            <Text
              sx={(theme) => ({
                color: theme.white,
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
                textAlign: 'justify',
                maxWidth: '36rem',
                ['@media (min-width: 992px)']: {
                  fontSize: '1.25rem',
                  lineHeight: '1.75rem',
                },
              })}
            >
              {main.overview}
            </Text>
            <Group>
              <Link href={`/movie/${main.id}/watch`} passHref>
                <Anchor>
                  <Button leftIcon={<FaPlayCircle size={14} />}>Watch Now</Button>
                </Anchor>
              </Link>
              <Link href={`/movie/${main.id}`} passHref>
                <Anchor>
                  <Button leftIcon={<FaInfoCircle size={14} />}>View Info</Button>
                </Anchor>
              </Link>
            </Group>
          </Box>
        </Box>
        <Box
          sx={() => ({
            flex: '1 1 0%',
            justifyContent: 'center',
            alignItems: 'center',
            ['@media (min-width: 768px)']: {
              display: 'flex',
            },
          })}
        >
          <Image
            sx={() => ({
              zIndex: 10,
              borderRadius: '0.75rem',
              width: '250px',
              ['@media (min-width: 992px)']: {
                width: '300px',
              },
            })}
            src={imageResize(main.poster_path, 'w300')}
            alt=""
          />
        </Box>
      </Box>

      {Object.keys(data).map((item, index) => (
        <Fragment key={item}>
          <Title
            sx={() => ({
              marginBottom: '0.75rem',
              marginLeft: '1rem',
              fontSize: '1.5rem',
              lineHeight: '2rem',
              marginTop: index === 0 ? '4rem' : '2rem',
              ['@media (min-width: 992px)']: {
                marginLeft: '4rem',
                marginTop: '2rem',
              },
            })}
          >
            {item}
          </Title>
          <MovieSlider data={data[item]} />
        </Fragment>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHomeData();
    const trending = data['Trending Movies'];
    const main = trending[new Date().getDate() % trending.length];
    return {
      props: {
        data,
        main,
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

export default HomePage;
