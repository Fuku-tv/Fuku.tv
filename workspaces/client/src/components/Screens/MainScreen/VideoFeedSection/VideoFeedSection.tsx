import * as React from 'react';
import VideoFeed from 'src/components/game/VideoFeed';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useGameState } from 'src/state/hooks';
import SwitchCameraButton from './SwitchCameraButton/SwitchCameraButton';
import './VideoFeedSection.scss';
import SpectatorInformation from './SpectatorInformation/SpectatorInformation';
import Timer from '../ContentSection/PlayGame/ControlsSection/Timer/Timer';

const VideoFeedSection: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';
  return (
    <section id="video-feed-section">
      {!gameplay && <Timer />}
      <VideoFeed width="100%" height="480" />
    </section>
  );
};

export default VideoFeedSection;
