import * as React from 'react';
import VideoFeed from 'src/components/game/VideoFeed';
import { useAuthState, useGameState } from 'src/state/hooks';
import PlayerStats from 'src/components/UIElements/PlayerStats/PlayerStats';

import { Box } from '@chakra-ui/react';
// import SpectatorInformation from './SpectatorInformation/SpectatorInformation';

const VideoFeedSection: React.FC = () => {
  const authState = useAuthState();
  const { state } = useGameState();
  return (
    <Box as="section" backgroundColor="#111111" position="relative">
      <VideoFeed width="100%" height="480" />
      {authState.state.isAuthenticated && <PlayerStats credits={state.credits} points={state.points} freeplay={state.freeplay} />}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        background="linear-gradient(0deg, #111111, transparent)"
        width="100%"
        height="105px"
        zIndex={200}
      />
    </Box>
  );
};

export default VideoFeedSection;
