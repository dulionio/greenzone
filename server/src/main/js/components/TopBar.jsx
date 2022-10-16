import * as React from 'react';
import { Badge, Header } from "@mantine/core";

const HEADER_HEIGHT = 84;

export default function Top() {
  return (
    <Header>
      <Badge size="lg" color="green">GreenZone</Badge>
    </Header>
  );
}
