import { css } from '@emotion/css';
import * as React from 'react';
import CookieConsent from 'react-cookie-consent';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Provider from './state';

const styles = {
  appBodyWrapper: css`
    // min-height: 90vh;
    position: absolute;
    top: var(--headerHeight);
    width: 100%;
    height: calc(100% - var(--headerHeight));
    main {
      overflow-y: auto;
      position: fixed;
      width: calc(100% - var(--sideNavWidth));
      top: var(--headerHeight);
      width: 100%;
      height: calc(100% - var(--headerHeight));
      & > div {
        height: 100%;
        // padding-top: 30px;
        // height: calc(100% - 30px);
        // margin-top: 30px;
        // padding: 10px 0;
        // padding: 10px;
      }
    }
    @media only screen and (max-width: 600px) {
      main {
        padding: 0px !important;
        margin: 0 !important;
        left: 0 !important;
        width: 100% !important;
      }

      // .player-stats-container {
      //   justify-content: space-between !important;
      //   #level progress {
      //     width: 80px !important;
      //   }
      // }
    }
  `,
};

const App: React.FC = () => (
  <Provider>
    <Router>
      <Header />
      <div className={styles.appBodyWrapper}>
        <Main />
      </div>
    </Router>
    <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
      This website uses cookies to enhance the user experience. This site is inteded for use by users 13 and older
    </CookieConsent>
  </Provider>
);

export default App;
