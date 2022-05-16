import * as React from 'react';

// import './LoggedOutContent.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import TitleDescription from '../../../components/UIElements/TitleDescription/TitleDescription';

const LoggedOutContent: React.FC = () => {
  const { state, actions } = useAuthState();

  return (
    <div className="sign-in-prompt">
      <TitleDescription title="Log In To Play" descriptionStart="Use your Gmail or Discord account to login." />

      <FlatButton text="SIGN IN" width={165} onClick={actions.loginWithRedirect} ghost />
    </div>
  );
};

export default LoggedOutContent;
