import * as React from 'react';

import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import TitleDescription from 'src/components/UIElements/TitleDescription/TitleDescription';

const SignInPrompt: React.FC = () => {
  const { state, actions } = useAuthState();

  return (
    <div className="sign-in-prompt">
      <TitleDescription title="You must be logged in to play." descriptionStart="Please login with your Gmail or Discord account." />

      <FlatButton text="Sign In" width={165} onClick={actions.loginWithRedirect} ghost />

    </div>
  );
};

export default SignInPrompt;
