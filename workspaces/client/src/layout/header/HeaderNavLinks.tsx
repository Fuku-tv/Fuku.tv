import * as React from 'react';
import { NavLink } from 'react-router-dom';
import useAuthState from 'src/state/hooks/useAuthState';
import { Button, Flex, Tab, TabList, Tabs } from '@chakra-ui/react';
import HeaderProfileDropdown from './HeaderProfileDropdown';

const activeLinkStyle = {
  background: 'linear-gradient(180deg, rgba(124, 99, 163, 1) 0%, rgba(164, 139, 203, 1) 100%);',
  borderBottom: '2px solid #fff',
};

const HeadeNavLinks: React.FC = () => {
  const { state, actions } = useAuthState();

  return (
    <Flex as="nav" alignItems="center" height="100%">
      <Tabs isLazy variant="unstyled" height="100%" color="white">
        <TabList height="100%" marginRight={5}>
          <Tab as={NavLink} to="/" _activeLink={activeLinkStyle} paddingX={22}>
            Play
          </Tab>
          <Tab as={NavLink} to="/about" _activeLink={activeLinkStyle} paddingX={22}>
            About
          </Tab>
          <Tab as={NavLink} to="/leaderboards" _activeLink={activeLinkStyle} paddingX={22}>
            Leaderboards
          </Tab>
          <Tab as={NavLink} to="/privacy" _activeLink={activeLinkStyle} paddingLeft={22}>
            Privacy
          </Tab>
        </TabList>
      </Tabs>

      {state.isAuthenticated ? (
        <HeaderProfileDropdown />
      ) : (
        <Button variant="outline" borderColor="white" onClick={actions.loginWithRedirect}>
          SIGN IN
        </Button>
      )}
    </Flex>
  );
};

export default HeadeNavLinks;
