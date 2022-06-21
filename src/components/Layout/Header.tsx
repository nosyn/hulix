import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';

// Mantine UI
import { Anchor, Group, useMantineTheme, Header as MHeader } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export const HEADER_HEIGHT = 60;

const Header: NextPage = () => {
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll();

  return (
    <MHeader
      sx={(themed) => {
        return {
          backgroundColor: themed.fn.rgba(theme.primaryColor, scroll.y < 300 ? 0 : 0.5),
          border: '0px',
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

        <ColorSchemeToggle />
      </Group>
    </MHeader>
  );
};

export default Header;
