import * as React from 'react';

// import './LoggedOutContent.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import TitleDescription from '../../../../UIElements/TitleDescription/TitleDescription';

const LoggedOutContent: React.FC = () => {
  const { state, actions } = useAuthState();

  return (
    <div className="sign-in-prompt">
      <TitleDescription title="You must be logged in to play." descriptionStart="Please login with your Gmail or Discord account." />

      <FlatButton text="SIGN IN" width={165} onClick={actions.loginWithRedirect} ghost />
    </div>
  );
};

export default LoggedOutContent;
