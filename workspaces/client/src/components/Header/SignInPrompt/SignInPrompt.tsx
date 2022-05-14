import * as React from 'react';

import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';
import { Box } from '@chakra-ui/react';

const SignInPrompt: React.FC = () => {
  const { state, actions } = useAuthState();

  return (
    <Box className="sign-in-prompt" marginTop={3}>
      <TitleDescription title="You must be logged in to play." descriptionStart="Please login with your Gmail or Discord account." />

      <FlatButton text="Sign In" width={165} onClick={actions.loginWithRedirect} ghost />
    </Box>
  );
};

export default SignInPrompt;
