import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import useNavigationState from 'src/state/hooks/useNavigationState';
import VideoFeedSection from './VideoFeedSection/VideoFeedSection';
import ContentSection from './ContentSection/ContentSection';
import SwitchCameraButton from '../../../UIElements/SwitchCameraButton/SwitchCameraButton';

import Sidebar from './Sidebar/Sidebar';
// eslint-disable-next-line import/no-unassigned-import
import './PlayScreen.scss';
import CurrentlyWatching from './VideoFeedSection/SpectatorInformation/CurrentlyWatching/CurrentlyWatching';

const MainScreen: React.FC = () => {
  const { actions, state } = useGameState();
  const authState = useAuthState();
  const navState = useNavigationState();
  const [sidebarIsActive, setSidebarIsActive] = React.useState<boolean>(true);

  const contentAreaHeader = (
    <div className="content-area__header">
      <h2>Fuku Claw Game</h2>
      <div className="currently-watching-container">
        <CurrentlyWatching />
      </div>

      <SwitchCameraButton />
    </div>
  );

  return (
    <>
      <div className="main-inner-wrapper">
        <div className="content-area">
          {contentAreaHeader}
          <VideoFeedSection />
          <ContentSection />
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default MainScreen;
