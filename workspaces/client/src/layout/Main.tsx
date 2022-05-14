import * as React from 'react';

import { Route, Routes } from 'react-router-dom';
import useAuthState from 'src/state/hooks/useAuthState';
import { useGameState } from 'src/state/hooks';

import { Box, Container } from '@chakra-ui/react';
import ClawCustomizationScreen from 'src/components/Screens/ClawCustomizationScreen/ClawCustomizationScreen';
import SuspensePage from 'src/components/elements/SuspensePage';

const HomePage = React.lazy(() => import('src/routes/Home'));
const LeaderboardsPage = React.lazy(() => import('src/routes/Leaderboards'));
const PrivacyPage = React.lazy(() => import('src/routes/Privacy'));
const AboutPage = React.lazy(() => import('src/routes/About'));
const ProfilePage = React.lazy(() => import('src/routes/Profile'));

const Main: React.FC = () => {
  const { actions } = useGameState();
  const authState = useAuthState();
  React.useEffect(() => {
    actions.mountStore();

    actions.startFuku();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box as="main" width="100%" className={!authState.state.isAuthenticated && 'logged-out'}>
      <Container maxWidth={{ base: '1050px', '2xl': '1350px' }}>
        <Routes>
          <Route path="/" element={<SuspensePage component={HomePage} />} />

          <Route path="/about" element={<SuspensePage component={AboutPage} />} />
          <Route path="/leaderboards" element={<SuspensePage component={LeaderboardsPage} />} />
          <Route path="/privacy" element={<SuspensePage component={PrivacyPage} />} />
          <Route path="/profile" element={<SuspensePage component={ProfilePage} />} />

          {/* <Route path="/prizes" exact>
              <PrizesScreen />
            </Route>
            <Route path="/store" exact>
              <StoreScreen />
            </Route> */}

          <Route path="/claw-customization" element={<ClawCustomizationScreen />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
    </Box>
  );
};

export default Main;
