import * as React from 'react';
import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, Stack, createStyles, MantineProvider, Group, AppShell } from '@mantine/core';
import {
  IconHome2,
  IconLeaf,
  IconUser,
  IconLogout,
  IconPlug,
  IconTemperature,
  IconCalendarTime,
  IconChartInfographic,
} from '@tabler/icons';

import TopBar from './components/TopBar';
import Content from "./views/Content";

const menuItems = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconChartInfographic, label: 'Dashboard' },
  { icon: IconCalendarTime, label: 'Schedule' },
  { icon: IconTemperature, label: 'Sensors' },
  { icon: IconPlug, label: 'Controllers' },
  { icon: IconUser, label: 'Account' },
];

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1.5} color="green" />
      </UnstyledButton>
    </Tooltip>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const links = menuItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        style={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
      >
      </AppShell>  




      <TopBar />
      <Group>
        <Navbar width={{ base: 80 }} p="md">
          <Center>
            <IconLeaf type="mark" color="green" size={30} />
          </Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavbarLink icon={IconLogout} label="Logout" />
            </Stack>
          </Navbar.Section>
        </Navbar>
        <Content />
      </Group>
    </MantineProvider>
  );
}
