import * as React from 'react';
import { isMobile } from 'react-device-detect';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import styles from './App.module.scss';
import Provider from './state';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
// import { useAuthState } from 'src/state/hooks';
// import AboutScreen from './components/Screens/AboutScreen/AboutScreen';
// import ProfileScreen from './components/Screens/ProfileScreen/ProfileScreen';
// import ContentContainer from './components/UIElements/ContentContainer/ContentContainer';
// import VerticalNavigation from './components/VerticalNavigation/VerticalNavigation';
// import MainScreen from './components/Screens/HeaderTabScreens/PlayScreen/PlayScreen';
// import LeaderboardsScreen from './components/Screens/HeaderTabScreens/LeaderboardsScreen/LeaderboardsScreen';
// import StoreScreen from './components/Screens/StoreScreen/StoreScreen';
// import PrizesScreen from './components/Screens/PrizesScreen/PrizesScreen';
// import ClawCustomizationScreen from './components/Screens/ClawCustomizationScreen/ClawCustomizationScreen';
// import routes from './app/routes';
// import SideBar from './components';

const App: React.FC = () => (
  <Provider>
    <Router>
      <Header />
      <div className={styles['app-body-wrapper']}>
        <Main />
      </div>
    </Router>
    <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
      This website uses cookies to enhance the user experience. And is only used by users 13 and older for COPPA lulz
    </CookieConsent>
  </Provider>
);

export default App;
