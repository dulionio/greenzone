'use strict';
import * as React from 'react';
import { MantineProvider, AppShell, Navbar, Header } from "@mantine/core";
import { TypographyStylesProvider } from "@mantine/core";
import Header from './components/Header';
import Footer from "./components/Footer";
import Content from "./views/Content";

function App() {
    return (
        <MantineProvider theme={{
            headings: {
                fontFamily: 'Roboto'
            }
        }}>
            <TypographyStylesProvider>
                <AppShell
                    navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{
                    }</Navbar>}
                    header={<Header height={60} p="xs">{
                        <Header />
                    }</Header>}
                    <Content />
                    <Footer />

                </AppShell>
            </TypographyStylesProvider>
        </MantineProvider>
    );
}

export default App;
