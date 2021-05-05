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
  const feedInformationBar = (
    <div className="video-feed__information-container">
      <div className="points">
        <span className="que-icon-wrapper">Points: </span>
        <span className="value">{state.points}</span>
      </div>
      <div className="game-plays-container">
        <div className="credits">
          <span className="que-icon-wrapper">Credits: </span>
          <span className="value">{state.credits}</span>
        </div>
        <div className="freeplay-credits">
          <span className="que-icon-wrapper">Freeplay: </span>
          <span className="value">{state.freeplay}</span>
        </div>
      </div>
    </div>
  );
  return (
    <section id="video-feed-section">
      {gameplay && <Timer />}
      <VideoFeed width="100%" height="480" />
      {feedInformationBar}
    </section>
  );
};

export default VideoFeedSection;
