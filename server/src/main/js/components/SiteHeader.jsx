import * as React from 'react';
import { ActionIcon, Group, Text, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

export default function SiteHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Group>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle light/dark mode"
      >
        {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
      <Text>GreenZone</Text>
    </Group>
  );
}
