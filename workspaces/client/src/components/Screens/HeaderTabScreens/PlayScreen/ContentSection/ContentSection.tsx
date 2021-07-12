import * as React from 'react';
import { useAuthState } from 'src/state/hooks';
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

  return (
    <section id="content-section">
      <SwitchCameraButton />
      <div className="inner-wrapper">
        <section id="play-game-tab">{authState.state.isAuthenticated ? <LoggedInContent /> : <LoggedOutContent />}</section>
      </div>
    </section>
  );
};

export default ContentSection;
