/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import App from 'next/app';
import Provider from 'src/state';
import Header from 'src/components/Header/Header';
import CookieConsent from 'react-cookie-consent';
import { BrowserRouter as Router } from 'react-router-dom';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Provider>
      <Router>
        <Header />
        <div className="app-body-wrapper">
          <Component {...pageProps} />
        </div>
      </Router>
      <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
        This website uses cookies to enhance the user experience. And is only used by users 13 and older for COPPA lulz
      </CookieConsent>
    </Provider>
  </>
);

export default MyApp;
