import * as React from 'react';
import VideoFeed from 'src/components/game/VideoFeed';
import { useGameState } from 'src/state/hooks';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import Timer from '../../../../game/Timer/Timer';

import './VideoFeedSection.scss';
import CurrentlyPlayingScreen from '../ContentSection/LoggedInContent/PlayGameScreens/CurrentlyPlayingScreen';
import TransparentGameControls from './TransparentGameControls/TransparentGameControls';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SwitchCameraButton from './SwitchCameraButton/SwitchCameraButton';
// import SpectatorInformation from './SpectatorInformation/SpectatorInformation';

const VideoFeedSection: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';

  return (
    <section id="video-feed-section">
      <SwitchCameraButton />
      <VideoFeed width="100%" height="480" />

      <TransparentGameControls />
    </section>
  );
};

export default VideoFeedSection;
