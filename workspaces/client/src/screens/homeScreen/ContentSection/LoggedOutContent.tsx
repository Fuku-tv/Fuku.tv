import * as React from 'react';

// import './LoggedOutContent.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';

const LoggedOutContent: React.FC = () => {
  const { actions } = useAuthState();

  return (
    <Box marginX="auto" textAlign="center">
      <Stack paddingBottom="20px">
        <Heading as="h2" fontSize="22px">
          Log In To Play
        </Heading>
        <Text>Use your Gmail or Discord account to login.</Text>
      </Stack>

      <Button variant="outline" width={165} borderRadius={2} onClick={actions.loginWithRedirect} borderColor="white">
        SIGN IN
      </Button>
    </Box>
  );
};

export default LoggedOutContent;
