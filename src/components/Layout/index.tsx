// Mantine UI
import { AppShell, Global } from '@mantine/core';
import { useWindowEvent } from '@mantine/hooks';
import { useEffect } from 'react';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // This will set the height of the device equal to the height of inner document
  // Allow the height to always work on mobile device
  const setDocumentHeight = () => {
    document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`);
    document.documentElement.style.setProperty('--doc-width', `${window.innerWidth}px`);
  };

  useEffect(() => {
    setDocumentHeight();
  }, []);

  useWindowEvent('resize', setDocumentHeight);

  return (
    <AppShell
      styles={{
        main: {
          padding: 0,
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      header={<Header />}
    >
      <Global
        styles={() => ({
          ':root': {
            '--doc-height': '100%',
            '--doc-width': '100%',
          },
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
        })}
      />

      {children}
    </AppShell>
  );
};

export default Layout;
