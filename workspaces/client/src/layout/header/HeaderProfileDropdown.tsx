import * as React from 'react';

import useAuthState from 'src/state/hooks/useAuthState';

import PlayerLevel from 'src/components/game/PlayerLevel/PlayerLevel';

import { Box, Button, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

const DropdownButton: React.FC = () => {
  const { state, actions } = useAuthState();

  return (
    <Menu>
      <MenuButton flexDir="row" as={Button} variant="unstyled">
        <HStack>
          <Box width="32px">
            <PlayerLevel />
          </Box>
          <Text textTransform="uppercase" fontWeight={500}>
            {state.username || state.nickname || state.name}
          </Text>
          <Icon as={FaCaretDown} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => actions.logout()} icon={<Icon as={MdLogout} boxSize={25} />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropdownButton;
