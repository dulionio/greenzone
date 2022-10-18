import * as React from 'react';
import {
  IconHome2,
  IconUser,
  IconGauge,
  IconPlug,
  IconTemperature,
  IconCalendarTime,
} from '@tabler/icons';
import {
  createStyles,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton
} from '@mantine/core';

const navData = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconCalendarTime, label: 'Schedule' },
  { icon: IconTemperature, label: 'Sensors' },
  { icon: IconPlug, label: 'Controllers' },
  { icon: IconUser, label: 'Account' },
];

const useStyles = createStyles((theme) => ({
  link: {
    width: 40,
    height: 40,
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

export default function SiteNavbar() {
  const [active, setActive] = React.useState(0);
  const links = navData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar.Section grow>
      <Stack justify="center" spacing={0}>
        {links}
      </Stack>
    </Navbar.Section>
  );
}
