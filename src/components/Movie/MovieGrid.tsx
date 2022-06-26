import type { NextPage } from 'next';

// Mantine UI
import { Box, Grid } from '@mantine/core';

// Utils
import { Item } from '@/utils/types';

// Components
import MovieCard from './MovieCard';
import Pagination from '@/components/Shared/Pagination';

interface MovieGridProps {
  data: Item[];
  currentPage: number;
  maximumPage: number;
  resolveLink: (page: number) => string;
}

const MovieGrid: NextPage<MovieGridProps> = ({ data, currentPage, maximumPage, resolveLink }) => {
  return (
    <>
      <Grid>
        {data.map((item) => (
          <Grid.Col xl={1} lg={2} md={2} sm={2} xs={3} key={item.id}>
            <MovieCard item={item} key={item.id} width="100%" height={270} />
          </Grid.Col>
        ))}
      </Grid>
      <Box>
        {maximumPage > 1 && (
          <Pagination current={currentPage} maximum={maximumPage} resolveLink={resolveLink} />
        )}
      </Box>
    </>
  );
};

export default MovieGrid;
