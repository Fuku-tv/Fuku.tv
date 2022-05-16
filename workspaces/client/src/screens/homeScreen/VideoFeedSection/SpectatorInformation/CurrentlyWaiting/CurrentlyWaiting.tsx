import * as React from 'react';
import { useGameState } from 'src/state/hooks';

import { FaUserFriends } from 'react-icons/fa';
import { Center, Flex, Icon, Text } from '@chakra-ui/react';

const CurrentlyWaiting: React.FC = () => {
  const { state } = useGameState();
  return (
    <Flex>
      <Center>
        <Icon as={FaUserFriends} />
      </Center>

      <Text as="span" marginLeft={2} fontSize="14px">
        <Text as="span" fontWeight="bold">
          {state.queue}
        </Text>{' '}
        in queue
      </Text>
    </Flex>
  );
};

export default CurrentlyWaiting;
