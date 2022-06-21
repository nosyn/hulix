// Ref: https://ui.mantine.dev/category/error-pages
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Container, SimpleGrid, Title, Button, createStyles, Text } from '@mantine/core';
import Meta from '@/components/Shared/Meta';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },
  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

const NotFound: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Meta title="404 Not Found - eCinema" description="404 Not Found" image="/not-found.png" />
      <Container className={classes.root}>
        <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
          <Image src="/404.svg" width={640} height={360} />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text color="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Link href="/" passHref>
              <Button variant="outline" size="md" mt="xl" className={classes.control}>
                Get back to home page
              </Button>
            </Link>
          </div>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default NotFound;
