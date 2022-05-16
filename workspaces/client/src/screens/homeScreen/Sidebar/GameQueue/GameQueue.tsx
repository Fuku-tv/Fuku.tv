import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { useGameState } from 'src/state/hooks';

const GameQueue: React.FC = () => {
  const { state } = useGameState();

  return (
    <Center padding="6px">
      {state.currentlyPlaying ? (
        <Stack alignItems="center">
          <Text>Now Playing</Text>
          <Text fontWeight="bold">{state.currentlyPlaying}</Text>
        </Stack>
      ) : (
        <Box padding={3}>
          <Text>Queue Is Empty</Text>
        </Box>
      )}
    </Center>
  );
};

export default GameQueue;
