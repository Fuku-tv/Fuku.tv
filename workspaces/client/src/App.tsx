import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';
import * as React from 'react';
import CookieConsent from 'react-cookie-consent';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layout/header';
import Main from './layout/Main';
import Provider from './state';

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
    },
  },
  // load font

  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
});

const App: React.FC = () => (
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
);

export default App;
