import * as React from 'react';
import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, Stack, createStyles } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconLeaf,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons';

import Header from './components/Header';
import Footer from "./components/Footer";
import Content from "./views/Content";

const menuItems = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
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

function NavbarLink ({ icon: Icon, label, active, onClick}) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={ cx(classes.link, { [classes.active]: active }) }>
                <Icon stroke={1.5} color="green" />
            </UnstyledButton>
        </Tooltip>
    );
}

export default function App() {
    const [ active, setActive ] = useState(2);
    const links = menuItems.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));
    return (
        <Navbar height={750} width={{ base: 80 }} p="md">
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
                    <NavbarLink icon={IconSwitchHorizontal} label="Change Account" />
                    <NavbarLink icon={IconLogout} label="Logout" />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
