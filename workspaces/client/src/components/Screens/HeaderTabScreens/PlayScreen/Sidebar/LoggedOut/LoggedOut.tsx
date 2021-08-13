import * as React from 'react';
import useAuthState from 'src/state/hooks/useAuthState';
import styles from './LoggedOut.module.scss';

interface Props {
  setIsSignedIn: () => void;
  isSignedIn: boolean;
}

const LoggedOut: React.FC<Props> = ({ setIsSignedIn, isSignedIn }) => (
  // const {state, actions} = useAuthState();

  <section id="logged-out-section">
    <h2>Player Login</h2>
    <p className="description">Login/sign up using your Google account.</p>

    <button
      style={{
        padding: '12px',
      }}
      onClick={setIsSignedIn}
    >
      Sign In
    </button>
  </section>
);
export default LoggedOut;
