import * as React from 'react';
import VideoFeed from 'src/components/game/VideoFeed';
import { useGameState } from 'src/state/hooks';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import PlayerStats from 'src/components/UIElements/PlayerStats/PlayerStats';
import Timer from '../../../../game/Timer/Timer';

import CurrentlyPlayingScreen from '../ContentSection/LoggedInContent/PlayGameScreens/CurrentlyPlayingScreen';
import TransparentGameControls from './TransparentGameControls/TransparentGameControls';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SwitchCameraButton from './SwitchCameraButton/SwitchCameraButton';
import './VideoFeedSection.scss';
// import SpectatorInformation from './SpectatorInformation/SpectatorInformation';

const VideoFeedSection: React.FC = () => {
  const { state, actions } = useGameState();
  const gameplay = state.gameStatus === 'gameplay';
  const feedInformationBar = (
    <div className={`video-feed__information-container `}>
      <div id="points" className="user-info-item">
        <span className="user-info-item__title">My Points</span>
        <span className="user-info-item__value">{state.points}</span>
      </div>
      <div className="game-plays-container">
        <div id="credits" className="user-info-item">
          <span className="user-info-item__title">Credits:</span>
          <span className="user-info-item__value">{state.credits}</span>
        </div>
        <div id="freeplay-credits" className="user-info-item">
          <span className="user-info-item__title">Freeplay:</span>
          <span className="user-info-item__value">{state.freeplay}</span>
        </div>
      </div>
    </div>
  );
  return (
    <section id="video-feed-section">
      {/* <SwitchCameraButton /> */}
      <PlayerStats />
      <VideoFeed width="100%" height="480" />
      <div className="gradient-container" />
    </section>
  );
};

export default VideoFeedSection;
