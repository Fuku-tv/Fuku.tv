import * as React from 'react';

import useAuthState from 'src/state/hooks/useAuthState';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';

const SignInPrompt: React.FC = () => {
  const { actions } = useAuthState();

  return (
    <Stack marginTop={3} alignItems="center" spacing={6}>
      <Heading>You must be logged in to play.</Heading>
      <Text>Please login with your Gmail or Discord account.</Text>
      <Button variant="outline" borderColor="white" width={165} onClick={actions.loginWithRedirect}>
        Sign In
      </Button>
    </Stack>
  );
};

export default SignInPrompt;
