import * as React from 'react';
import { useState } from 'react';
import { MantineProvider, AppShell, Navbar, Header, ColorSchemeProvider} from '@mantine/core';

import SiteHeader from './components/SiteHeader';
import SiteNavbar from './components/SiteNavbar';
import Content from "./views/Content";

export default function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell
          header={<Header height={47} p="xs"><SiteHeader /></Header>}
          navbar={<Navbar width={{ base: 47 }} p="xs"><SiteNavbar /></Navbar>}>
          <Content />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
