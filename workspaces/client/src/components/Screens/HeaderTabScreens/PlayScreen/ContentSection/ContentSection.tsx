import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import SwitchCameraButton from '../../../../UIElements/SwitchCameraButton/SwitchCameraButton';
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
  return <section id="content-section">{authState.state.isAuthenticated ? <LoggedInContent /> : <LoggedOutContent />}</section>;
};

export default ContentSection;
