import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import useNavigationState from 'src/state/hooks/useNavigationState';

import PlayGameTab from './PlayGame/PlayGameTab';
// import PrizesTab from './Tabs/PrizesTab/PrizesTab';
// import Store from './Tabs/Store/Store';
// import Leaderboards from './Tabs/Leaderboards/Leaderboards';
// import UserProfile from './Tabs/UserProfile/UserProfile';
// import Controls from './Tabs/PlayGame/ControlsSection/Controls/Controls';
import './ContentSection.scss';
import SpectatorInformation from '../VideoFeedSection/SpectatorInformation/SpectatorInformation';
import SwitchCameraButton from '../VideoFeedSection/SwitchCameraButton/SwitchCameraButton';

const ContentSection: React.FC = () => {
  const { state, actions } = useGameState();
  const authState = useAuthState();
  const navState = useNavigationState();
  const [cameraIsFront, setCameraIsFront] = React.useState<boolean>(true);
  const cameraToggleHandler = () => {
    setCameraIsFront((prev) => !prev);
    console.log('change');
  };

  const credits = (
    <div className="spectator-information-container">
      <div className="credits">
        <span className="que-icon-wrapper">Credits: </span>
        <span>{state.credits}</span>
      </div>
      <div className="freeplay-credits">
        <span className="que-icon-wrapper">Freeplay: </span>
        <span>{state.freeplay}</span>
      </div>
    </div>
  );

  return (
    <section id="content-section">
      {credits}
      <SwitchCameraButton />
      <div className="inner-wrapper">
        <PlayGameTab />
      </div>
    </section>
  );
};

export default ContentSection;
