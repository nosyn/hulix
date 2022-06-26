import { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

// Mantine UI & Icons
import { Box, Container, TextInput, Title } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

// Utils
import { SearchResult } from '@/utils/types';
import { search } from '@/utils/api';

// Components
import Meta from '@/components/Shared/Meta';
import MovieGrid from '@/components/Movie/MovieGrid';

interface SearchProps {
  result: SearchResult;
  newPage: boolean;
  q: string;
}

const Search: NextPage<SearchProps> = ({ result, newPage = false, q }) => {
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSearchFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      router.push({ pathname: '/search', query: { q: searchInputValue } });
    }
  };

  return (
    <>
      <Meta
        title={newPage ? 'Search - eCinema' : `${q} - Search - eCinema`}
        description={newPage ? 'Searching for movies' : `Search result for ${q}`}
        image="/preview.png"
      />
      <Container
        style={{
          marginTop: '80px',
        }}
        fluid
      >
        <form onSubmit={handleSearchFormSubmit}>
          <Title order={2}>Find your favorite movies and TV shows</Title>
          <Box
            style={{
              width: '80%',
              minWidth: '320px',
            }}
          >
            <TextInput
              my="md"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Breaking Bad"
              icon={<FaSearch size={25} />}
            />
          </Box>
        </form>
        {result && (
          <Box m="md">
            <Title order={3} my="xl">
              Search result for &quot;{q}&quot; ({result.total_results}{' '}
              {result.total_results <= 1 ? 'result' : 'results'} found)
            </Title>
            {result.results.length > 0 && (
              <MovieGrid
                data={result.results}
                currentPage={result.page}
                maximumPage={result.total_pages}
                resolveLink={(page) => `/search?q=${encodeURIComponent(q)}&page=${page}`}
              />
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const q = query.q as string;
    const page = query.page ? Number(query.page) : 1;

    if (!q) {
      return {
        props: {
          newPage: true,
        },
      };
    }

    const response = await search(q, page);

    return {
      props: {
        result: response,
        q,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Search;
