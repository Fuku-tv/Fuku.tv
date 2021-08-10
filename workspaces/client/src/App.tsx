import * as React from 'react';
import CookieConsent from 'react-cookie-consent';
import { BrowserRouter as Router } from 'react-router-dom';
import * as styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Provider from './state';

const props = {};
const App: React.FC = () => (
  <Provider>
    <Router>
      <Header />
      <div className={styles.appBodyWrapper}>
        <Main />
      </div>
    </Router>
    <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
      This website uses cookies to enhance the user experience. And is only used by users 13 and older for COPPA lulz
    </CookieConsent>
  </Provider>
);

export default App;
