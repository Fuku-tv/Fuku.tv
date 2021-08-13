import * as React from 'react';
import { useAuthState, useGameState } from 'src/state/hooks';
import useNavigationState from 'src/state/hooks/useNavigationState';
import { isMobile } from 'react-device-detect';
import PlayerStats from 'src/components/UIElements/PlayerStats/PlayerStats';
import VideoFeedSection from './VideoFeedSection/VideoFeedSection';
import Navigation from './Navigation/Navigation';
import ContentSection from './ContentSection/ContentSection';
import SwitchCameraButton from '../../../UIElements/SwitchCameraButton/SwitchCameraButton';

import Sidebar from './Sidebar/Sidebar';
import styles from './PlayScreen.module.scss';
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

// ICONS

const play = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="play-circle"
    className="svg-inline--fa fa-play-circle fa-w-16"
    role="img"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"
    />
  </svg>
);

const leftArrow = (
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 443.5 443.5" xmlSpace="preserve">
    <g>
      <g>
        <path
          d="M107.3,233.7l204.8,204.8c6.7,6.7,17.5,6.7,24.1,0c6.7-6.7,6.7-17.5,0-24.1L143.5,221.7L336.2,28.9
			c6.4-6.6,6.4-17.1,0-23.7c-6.5-6.8-17.4-7-24.1-0.4L107.3,209.6C100.6,216.3,100.6,227.1,107.3,233.7z"
        />
      </g>
    </g>
  </svg>
);
