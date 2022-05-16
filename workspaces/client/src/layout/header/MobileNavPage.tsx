import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';

import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  LightMode,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaCoins, FaPlay, FaTrophy, FaStore } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import SignInPrompt from './SignInPrompt';

const MobileNavPage: React.FC = () => {
  const { state, actions } = useAuthState();
  const gameState = useGameState();

  const ProfileContent = () => (
    <>
      <Center marginTop={4}>
        <Avatar src={state.picture} />
        <Heading as="h2" size="md" fontWeight={500} marginLeft={3}>
          {state.name}
        </Heading>
      </Center>
      <Flex justifyContent="space-evenly">
        <HStack>
          <Text fontWeight={700}>{gameState.state.points}</Text>
          <Text>TotalPoints</Text>
        </HStack>
        <Center height="50px" alignSelf="center" marginLeft="20px">
          <Divider orientation="vertical" backgroundColor="white" />
        </Center>
        <HStack>
          <Icon as={FaCoins} boxSize={30} />
          <VStack alignItems="flex-start">
            <HStack>
              <Text fontWeight={700}>{gameState.state.credits}</Text>
              <Text>Credits</Text>
            </HStack>
            <HStack>
              <Text fontWeight={700}>{gameState.state.freeplay}</Text>
              <Text>Freeplay</Text>
            </HStack>
          </VStack>
        </HStack>
      </Flex>
      <Center>
        <LightMode>
          <Button
            marginTop={4}
            width="74%"
            color="purple"
            leftIcon={<Icon as={MdLogout} />}
            onClick={() => actions.logout()}
            onKeyDown={() => actions.logout()}
          >
            logout
          </Button>
        </LightMode>
      </Center>
    </>
  );

  return (
    <Flex as="nav" flexDirection="column" flexBasis={1} bg="#7a61a1" height="100%">
      <Box marginBottom={10}>{state.isAuthenticated ? <ProfileContent /> : <SignInPrompt />}</Box>
      <Divider backgroundColor="white" />
      <Box>
        <Tabs isLazy isFitted orientation="vertical" variant="unstyled" colorScheme="whiteAlpha" padding={3}>
          <TabList as={Stack} width="100%" spacing={4}>
            <Tab
              as={NavLink}
              _disabled={{ opacity: 0.5 }}
              to="/"
              _activeLink={{ background: 'linear-gradient(90deg,#a288ca,#8471a4)' }}
              justifyContent="flex-start"
            >
              <Icon as={FaPlay} marginRight={2} />
              Play
            </Tab>
            <Tab
              as={NavLink}
              _disabled={{ opacity: 0.5 }}
              _activeLink={{ background: 'linear-gradient(90deg,#a288ca,#8471a4)' }}
              to="/leaderboards"
              justifyContent="flex-start"
            >
              <Icon as={FaTrophy} marginRight={2} />
              Leaderboards
            </Tab>
            <Tab
              as={NavLink}
              _disabled={{ opacity: 0.5 }}
              _activeLink={{ background: 'linear-gradient(90deg,#a288ca,#8471a4)' }}
              to="/store"
              justifyContent="flex-start"
              isDisabled
            >
              <Icon as={FaStore} marginRight={2} />
              Store
            </Tab>
          </TabList>
        </Tabs>
        <Divider backgroundColor="white" />
        <Tabs orientation="vertical" variant="unstyled" padding={3}>
          <TabList as={Stack} alignItems="flex-start">
            <Tab as={NavLink} to="/about">
              <Text>About Fuku</Text>
            </Tab>
            <Tab as={NavLink} to="/privacy">
              <Text> Privacy Policy </Text>
            </Tab>
          </TabList>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default MobileNavPage;
