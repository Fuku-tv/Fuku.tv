import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import SwitchCameraButton from '../VideoFeedSection/SwitchCameraButton/SwitchCameraButton';
import LoggedOutContent from './LoggedOutContent';
import LoggedInContent from './LoggedInContent/LoggedInContent';

import './ContentSection.scss';

// import useNavigationState from 'src/state/hooks/useNavigationState';
// import PlayGameTab from './PlayGame/PlayGameTab';
// import PrizesTab from './Tabs/PrizesTab/PrizesTab';
// import Store from './Tabs/Store/Store';
// import Leaderboards from './Tabs/Leaderboards/Leaderboards';
// import UserProfile from './Tabs/UserProfile/UserProfile';
// import Controls from './Tabs/PlayGame/ControlsSection/Controls/Controls';
// import SpectatorInformation from '../VideoFeedSection/SpectatorInformation/SpectatorInformation';
// import DiscordChat from '../Sidebar/DiscordChat/DiscordChat';

const ContentSection: React.FC = () => {
  const authState = useAuthState();
  const { state, actions } = useGameState();
  const feedInformationBar = (
    <div className={`video-feed__information-container ${state.gameStatus === 'gameplay' && 'playing'}`}>
      <div className="points">{state.points} Points</div>
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
    <section id="content-section">
      <div className="inner-wrapper">
        <section id="play-game-tab">{authState.state.isAuthenticated ? <LoggedInContent /> : <LoggedOutContent />}</section>
      </div>
      {/* {authState.state.isAuthenticated && feedInformationBar} */}
    </section>
  );
};

export default ContentSection;
