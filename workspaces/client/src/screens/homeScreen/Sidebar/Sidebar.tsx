import * as React from 'react';
// import {Messages} from '../../Messages';
import { isMobile } from 'react-device-detect';
import GameChat from 'src/components/UIElements/GameChat/GameChat';

import { Box, Flex } from '@chakra-ui/react';
import SidebarWidget from './SidebarWidget/SidebarWidget';

import GameQueue from './GameQueue/GameQueue';
import SpectatorInformation from '../VideoFeedSection/SpectatorInformation/SpectatorInformation';

const SideBar: React.FC = () => (
  <Box as="aside" height="100%" color="white">
    <Flex flexDirection="column" height="100%" paddingY={{ base: 4, md: 0 }} paddingX={4}>
      <SidebarWidget title="Game Queue" header={<SpectatorInformation showQueue={!isMobile} />}>
        <GameQueue />
      </SidebarWidget>
      {!isMobile && (
        // Trick to get the chatbar height to fill the grid

        <Box flexGrow={1} marginTop="30px" minHeight="400px">
          <SidebarWidget title="Chat" fullHeight>
            <GameChat />
          </SidebarWidget>
        </Box>
      )}
    </Flex>
  </Box>
);

export default SideBar;
