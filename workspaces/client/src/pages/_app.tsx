/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Provider from 'src/state';
import '../global.scss';
import Header from 'src/components/Header/Header';
import CookieConsent from 'react-cookie-consent';
import Main from 'src/components/Main/Main';
import Head from 'next/head';
import styles from '../App.module.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <Head>
        <title>Fuku.tv</title>
      </Head>
      <div>
        <Provider>
          <Header />
          <div className={styles.app_body_wrapper}>
            <Main>
              <Component {...pageProps} />
            </Main>
          </div>
        </Provider>
        <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
          This website uses cookies to enhance the user experience. And is only used by users 13 and older for COPPA lulz
        </CookieConsent>
      </div>
    </>
  );
};

export default App;
