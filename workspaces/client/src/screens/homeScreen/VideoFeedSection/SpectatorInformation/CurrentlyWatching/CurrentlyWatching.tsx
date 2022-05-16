import * as React from 'react';
import { useGameState } from 'src/state/hooks';

import { Icon, Text } from '@chakra-ui/react';
import { FaRegEye } from 'react-icons/fa';

const CurrentlyWatching: React.FC = (props) => {
  const { state } = useGameState();
  return (
    <>
      <Icon as={FaRegEye} />

      <Text as="span" marginLeft={2}>
        {state.watch}
      </Text>
    </>
  );
};

export default CurrentlyWatching;
