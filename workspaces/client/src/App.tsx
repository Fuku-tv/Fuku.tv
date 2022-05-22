/* eslint-disable import/no-unassigned-import */
import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';
import * as React from 'react';
import CookieConsent from 'react-cookie-consent';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './layout/header';
import Main from './layout/Main';
import Provider from './state';

// load fonts for Chakra UI
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/rubik';
import '@fontsource/east-sea-dokdo';

// 3. extend the theme
const theme = extendTheme({
  // lock on dark mode
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: {
    global: {
      html: {
        // prevent scrollbar from shifting content to the left
        overflowY: 'overlay',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        cursor: 'pointer',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#686868',
        borderRadius: '8px',
        width: '8px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgorund: '#7d7d7d;',
      },
    },
  },
  // load font for body and heading
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
});

const App: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    // prevent flash of faux text
    Promise.all([document.fonts.load('16px "East Sea Dokdo"'), document.fonts.load('16px "Inter"'), document.fonts.load('16px "Rubik"')]).then(() => {
      setIsReady(true);
    });
  });
  return (
    isReady && (
      <Provider>
        <Router>
          <ChakraProvider resetCSS theme={theme}>
            <Flex flexDirection="column" minHeight="100vh">
              <Header />
              <Main />
            </Flex>
          </ChakraProvider>
        </Router>
        <CookieConsent style={{ textAlign: 'center', fontSize: '14px' }}>
          This website uses cookies to enhance the user experience. This site is inteded for use by users 13 and older
        </CookieConsent>
      </Provider>
    )
  );
};

export default App;
