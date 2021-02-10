import * as React from 'react';
import { isMobile } from 'react-device-detect';
import './App.scss';
// workaround for react-awesome-button css import bug
import './styles.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutScreen from './components/Screens/AboutScreen/AboutScreen';
import ProfileScreen from './components/Screens/ProfileScreen/ProfileScreen';
import Sidebar from './components/Screens/MainScreen/Sidebar/Sidebar';
import Provider from './state';
import ContentContainer from './components/UIElements/ContentContainer/ContentContainer';
import VerticalNavigation from './components/VerticalNavigation/VerticalNavigation';
import MainScreen from './components/Screens/MainScreen/MainScreen';
import LeaderboardsScreen from './components/Screens/LeaderboardsScreen/LeaderboardsScreen';
import StoreScreen from './components/Screens/StoreScreen/StoreScreen';
import PrizesScreen from './components/Screens/PrizesScreen/PrizesScreen';
import ClawCustomizationScreen from './components/Screens/ClawCustomizationScreen/ClawCustomizationScreen';
// import SideBar from './components';

const App: React.FC = () => {
  const routes = (
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
  return (
    <Provider>
      <Router>
        <Header />
        <div className="app-body-wrapper">
          {!isMobile && <VerticalNavigation />}
          <main>
            <ContentContainer>{routes}</ContentContainer>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
