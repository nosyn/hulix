import Link from 'next/link';
import type { NextPage } from 'next';

// Mantine UI and Icons
import { ActionIcon, Anchor, Group } from '@mantine/core';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  current: number;
  maximum: number;
  resolveLink: (page: number) => string;
}

const Pagination: NextPage<PaginationProps> = ({ current, maximum, resolveLink }) => {
  return (
    <Group spacing="xs" mt="xs">
      {current > 1 && (
        <Link href={resolveLink(current - 1)} passHref>
          <Anchor>
            <ActionIcon variant="transparent" color="pink">
              <FaChevronLeft />
            </ActionIcon>
          </Anchor>
        </Link>
      )}
      {current < 5 ? (
        <>
          {new Array(maximum < 5 ? maximum : 5).fill('').map((_, index) => (
            <Link key={index} href={resolveLink(index + 1)} passHref>
              <Anchor color={current === index + 1 ? 'blue' : 'gray'}>{index + 1}</Anchor>
            </Link>
          ))}
          {maximum > 5 && (
            <>
              <span>...</span>
              <Link href={resolveLink(maximum)} passHref>
                <Anchor color="gray">{maximum}</Anchor>
              </Link>
            </>
          )}
        </>
      ) : current > maximum - 4 ? (
        <>
          <Link href={resolveLink(1)} passHref>
            <Anchor>1</Anchor>
          </Link>
          <span>...</span>
          {new Array(5).fill('').map((_, index) => (
            <Link key={index} href={resolveLink(maximum - 4 + index)} passHref>
              <Anchor color={current === maximum - 4 + index ? 'blue' : 'gray'}>
                {maximum - 4 + index}
              </Anchor>
            </Link>
          ))}
        </>
      ) : (
        <>
          <Link href={resolveLink(1)} passHref>
            <Anchor color="gray">1</Anchor>
          </Link>
          <span>...</span>
          {new Array(5).fill('').map((_, index) => (
            <Link key={index} href={resolveLink(current - 2 + index)} passHref>
              <Anchor color={current === current - 2 + index ? 'blue' : 'gray'}>
                {current - 2 + index}
              </Anchor>
            </Link>
          ))}
          <span>...</span>
          <Link href={resolveLink(maximum)} passHref>
            <Anchor color="gray"> {maximum}</Anchor>
          </Link>
        </>
      )}
      {current < maximum && (
        <Link href={resolveLink(current + 1)} passHref>
          <Anchor>
            <ActionIcon variant="transparent" color="pink">
              <FaChevronRight />
            </ActionIcon>
          </Anchor>
        </Link>
      )}
    </Group>
  );
};

export default Pagination;
