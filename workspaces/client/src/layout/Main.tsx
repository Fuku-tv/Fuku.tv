import * as React from 'react';

import { Route, Routes } from 'react-router-dom';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';

import { Box, Container } from '@chakra-ui/react';
import Home from 'src/routes/Home';
import About from 'src/routes/About';
import Leaderboards from 'src/routes/Leaderboards';
import Privacy from 'src/routes/Privacy';
import Test from 'src/routes/WebRtcTest';

const Main: React.FC = () => {
  const { actions } = useGameState();
  React.useEffect(() => {
    actions.mountStore();

    actions.startFuku();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box as="main" width="100%" flexGrow={1} backgroundColor="gray.900">
      <Container maxWidth={{ base: '1050px', '2xl': '1350px' }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/test" element={<Test />} />
          {/* <Route path="/profile" element={<Profile />} /> */}

          {/* <Route path="/prizes" exact>
              <PrizesScreen />
            </Route>
            <Route path="/store" exact>
              <StoreScreen />
            </Route> */}

          {/* <Route path="/claw-customization" element={<ClawCustomizationScreen />} /> */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </Box>
  );
};

export default Main;
