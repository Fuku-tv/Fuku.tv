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
import MainScreen from '../Screens/MainScreen/MainScreen';
import LeaderboardsScreen from '../Screens/LeaderboardsScreen/LeaderboardsScreen';
import StoreScreen from '../Screens/StoreScreen/StoreScreen';
import PrizesScreen from '../Screens/PrizesScreen/PrizesScreen';
import ClawCustomizationScreen from '../Screens/ClawCustomizationScreen/ClawCustomizationScreen';

// import routes from './app/routes';
// import SideBar from './components';

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <MainScreen />
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
);

const Main: React.FC = () => {
  const { state, actions } = useAuthState();
  const gameState = useGameState();
  const playerStats = (
    <div className="player-stats-container">
      <div className="inner-wrapper">
        <div id="points-and-credits">
          <div className="stat-item-wrapper">
            <span className="player-stats__item">Credits:</span>
            <span className="player-stats__value">{gameState.state.credits}</span>
          </div>
          <div className="stat-item-wrapper">
            <span className="player-stats__item">Points:</span>
            <span className="player-stats__value">{gameState.state.points}</span>
          </div>
          <div className="stat-freeplay-wrapper">
            <span className="player-stats__item">Freeplay:</span>
            <span className="player-stats__value">{gameState.state.creeplay}</span>
          </div>
        </div>
        <div id="level">
          <div className="stat-item-wrapper">
            <span className="player-stats__item">Level:</span>
            <span className="player-stats__value">6</span>
          </div>
          <progress min="0" max="100" value="63" />
        </div>
      </div>
    </div>
  );

  return (
    <main>
      {playerStats}
      <ContentContainer>
        <Routes />
      </ContentContainer>
    </main>
  );
};

export default Main;
