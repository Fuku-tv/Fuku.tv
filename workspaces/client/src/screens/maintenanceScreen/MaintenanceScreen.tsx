import { Center, Container, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';

const MaintenanceScreen = (props) => (
  <Container paddingTop={10}>
    <Center flexDirection="column">
      <Heading as="h1" marginY={10}>
        Under Maintenance
      </Heading>
      <Text marginY={10}>
        Our apologies, the clawgame is down until further notice. We are rebuilding everything on our end to accommodate our new location. This will
        take a couple of weeks as we are in the process of moving. I will let you know when we are back up on our Discord channel{' '}
      </Text>

      <Text>
        stay in touch with us at{' '}
        <Link color="blue.400" textDecoration="underline" href="https://discord.gg/uNNEDt5JBX">
          our Discord Link
        </Link>
      </Text>
    </Center>
  </Container>
);

export default MaintenanceScreen;
