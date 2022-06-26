import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';

// Mantine UI
import { Anchor, Group, useMantineTheme, Header as MHeader, ActionIcon } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import { useWindowScroll } from '@mantine/hooks';
import { ColorSchemeToggle } from '../Shared/ColorSchemeToggle';

export const HEADER_HEIGHT = 60;

const Header: NextPage = () => {
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll();

  return (
    <MHeader
      sx={(themed) => {
        return {
          backgroundColor: themed.fn.rgba(
            theme.colorScheme === 'dark' ? theme.primaryColor : theme.colors.indigo[2],
            scroll.y < 1 ? 0 : 0.7
          ),
          transitionProperty:
            'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
          transitionDuration: '500ms',
          border: 'none',
        };
      }}
      height={HEADER_HEIGHT}
    >
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <Link href="/" passHref>
          <Anchor>
            <Image width={40} height={40} src="/favicon.svg" alt="App Logo" />
          </Anchor>
        </Link>

        <Group>
          <Link href="/search" passHref>
            <ActionIcon component="a" variant="transparent" color="blue">
              <FaSearch size={18} />
            </ActionIcon>
          </Link>
          <ColorSchemeToggle />
        </Group>
      </Group>
    </MHeader>
  );
};

export default Header;
