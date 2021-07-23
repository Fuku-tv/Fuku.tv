import * as React from 'react';
import { isMobile } from 'react-device-detect';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';

import Header from '../Header/Header';
import AboutScreen from '../Screens/AboutScreen/AboutScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import ContentContainer from '../UIElements/ContentContainer/ContentContainer';
import VerticalNavigation from '../VerticalNavigation/VerticalNavigation';
import PlayScreen from '../Screens/HeaderTabScreens/PlayScreen/PlayScreen';
import LeaderboardsScreen from '../Screens/HeaderTabScreens/LeaderboardsScreen/LeaderboardsScreen';

import PrizesScreen from '../Screens/PrizesScreen/PrizesScreen';
import ClawCustomizationScreen from '../Screens/ClawCustomizationScreen/ClawCustomizationScreen';
import PlayerLevel from '../game/PlayerLevel/PlayerLevel';
import StoreScreen from '../Screens/HeaderTabScreens/StoreScreen/StoreScreen';
import styles from './Main.module.scss';

// import routes from './app/routes';
// import SideBar from './components';

const Main: React.FC = () => {
  // const playerStats = (
  //   <div className="player-stats-container">
  //     <div className="inner-wrapper">
  //       <div id="points-and-credits">
  //         <div className="stat-item-wrapper">
  //           <span className="player-stats__item">Credits:</span>
  //           <span className="player-stats__value">{gameState.state.credits}</span>
  //         </div>
  //         <div className="stat-item-wrapper">
  //           <span className="player-stats__item">Freeplay:</span>
  //           <span className="player-stats__value">{gameState.state.freeplay}</span>
  //         </div>
  //         <div className="stat-item-wrapper">
  //           <span className="player-stats__item">Points:</span>
  //           <span className="player-stats__value">{gameState.state.points}</span>
  //         </div>
  //       </div>
  //       <PlayerLevel />
  //     </div>
  //   </div>
  // );
  const { actions, state } = useGameState();
  const authState = useAuthState();
  React.useEffect(() => {
    actions.mountStore();

    actions.startFuku();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className={!authState.state.isAuthenticated && 'logged-out'}>
      <ContentContainer>
        <Switch>
          <Route path="/" exact>
            <PlayScreen />
          </Route>
          <Route path="/about" exact>
            <AboutScreen />
          </Route>
          <Route path="/profile" exact>
            <ProfileScreen />
          </Route>
          <Route path="/leaderboards" exact>
            <LeaderboardsScreen />
          </Route>
          <Route path="/prizes" exact>
            <PrizesScreen />
          </Route>
          <Route path="/store" exact>
            <StoreScreen />
          </Route>

          <Route path="/claw-customization" exact>
            <ClawCustomizationScreen />
          </Route>
          <Redirect to="/" />
        </Switch>
      </ContentContainer>
    </main>
  );
};

export default Main;
