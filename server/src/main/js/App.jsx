import * as React from 'react';
import { useState } from 'react';
import { MantineProvider, AppShell, Navbar, Header, ColorSchemeProvider, MediaQuery, Burger } from '@mantine/core';

import SiteHeader from './components/SiteHeader';
import SiteNavbar from './components/SiteNavbar';
import Content from "./views/Content";

export default function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const [opened, setOpened] = useState(false);
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell
          navbarOffsetBreakpoint="sm"
          navbar={
            <Navbar p="sm" hiddenBreakpoint="sm" hidden={!opened} width={{ base: 64 }}>
              <SiteNavbar />
            </Navbar>
          }
          header={
            <Header p="sm" height={47}>
              <SiteHeader />
            </Header>
          }>
          <Content />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
