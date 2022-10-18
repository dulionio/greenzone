import * as React from 'react';
import { ActionIcon, Burger, Container, createStyles, Group, MediaQuery, Text, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { IconLeaf, IconMoonStars, IconSun } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  }
}));

export default function SiteHeader() {
  const [opened, setOpened] = React.useState(false);
  const { classes, cx } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Group className={classes.header}>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((opened) => !opened)}
          size="sm"
          />
      </MediaQuery>
      <Group spacing={2}>
        <UnstyledButton><IconLeaf /></UnstyledButton>
        <Text>GreenZone</Text>
      </Group>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle light/dark mode"
      >
        {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
    </Group>
  );
}
