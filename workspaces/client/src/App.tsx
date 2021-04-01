import * as React from 'react';
import { isMobile } from 'react-device-detect';
import './App.scss';
// workaround for react-awesome-button css import bug
import './styles.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { useAuthState } from 'src/state/hooks';
import Header from './components/Header/Header';
import AboutScreen from './components/Screens/AboutScreen/AboutScreen';
import ProfileScreen from './components/Screens/ProfileScreen/ProfileScreen';
import Provider from './state';
import ContentContainer from './components/UIElements/ContentContainer/ContentContainer';
import VerticalNavigation from './components/VerticalNavigation/VerticalNavigation';
import MainScreen from './components/Screens/MainScreen/MainScreen';
import LeaderboardsScreen from './components/Screens/LeaderboardsScreen/LeaderboardsScreen';
import StoreScreen from './components/Screens/StoreScreen/StoreScreen';
import PrizesScreen from './components/Screens/PrizesScreen/PrizesScreen';
import ClawCustomizationScreen from './components/Screens/ClawCustomizationScreen/ClawCustomizationScreen';
import Main from './components/Main/Main';
// import routes from './app/routes';
// import SideBar from './components';

const App: React.FC = () => (
  <Provider>
    <Router>
      <Header />
      <div className="app-body-wrapper">
        {!isMobile && <VerticalNavigation />}
        <Main />
      </div>
    </Router>
    <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
      This website uses cookies to enhance the user experience. And is only used by users 13 and older for COPPA lulz
    </CookieConsent>
  </Provider>
);

export default App;
