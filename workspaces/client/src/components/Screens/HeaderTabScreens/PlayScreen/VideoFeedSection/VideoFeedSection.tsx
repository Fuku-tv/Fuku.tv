import * as React from 'react';
import VideoFeed from 'src/components/game/VideoFeed';
import { useGameState } from 'src/state/hooks';
import Timer from '../../../../game/Timer/Timer';
import './VideoFeedSection.scss';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import SwitchCameraButton from './SwitchCameraButton/SwitchCameraButton';
// import SpectatorInformation from './SpectatorInformation/SpectatorInformation';

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
