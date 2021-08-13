import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useAuthState } from './hooks';
import { useDispatch } from './hooks/useReduxState';
import { actions as authActions } from './slices/auth.slice';

import store from './store';

/**
 * direct child component to the parent Provider component (allows consumption of parent providers at this level)
 * @param props
 */
const ProviderChild: React.FC = (props) => {
  const auth0 = useAuth0();
  const { state, actions } = useAuthState();
  const dispatch = useDispatch();
  // check if user is already logged in via cookie, then just populate current user
  React.useEffect(() => {
    async function getToken() {
      if (auth0.isAuthenticated && state.accessToken === '') {
        actions.getAccessTokenSilent();

        dispatch(authActions.login({ isAuthenticated: true, ...auth0.user }));
      }
    }
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0.isAuthenticated, state.accessToken]);
  return <>{props.children}</>;
};

export const Provider: React.FC = (props) => (
  <Auth0Provider
    domain="fukutv-alpha.us.auth0.com"
    clientId="6N4jkRkDRisBK9GjkCsMjLmESvOpAZN1"
    redirectUri={typeof window !== 'undefined' && window.location.origin}
  >
    <ReduxProvider store={store}>
      <ProviderChild> {props.children}</ProviderChild>
    </ReduxProvider>
  </Auth0Provider>
);

export default Provider;
