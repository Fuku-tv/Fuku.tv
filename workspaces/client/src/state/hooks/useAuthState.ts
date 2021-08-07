import { useAuth0 } from '@auth0/auth0-react';
import { StateHook, useDispatch, useSelector } from './helpers/TypedStateHooks';
import { actions } from '../slices/auth.slice';
import { authActions } from '../actions';
import useActions from './helpers/useActions';

const useAuthState = () => {
  const auth0 = useAuth0();
  const state = useSelector((x) => x.auth);
  const boundActions = useActions({ ...actions, ...authActions });

  const loginWithRedirect = () => {
    boundActions.loginRedirect(auth0);
  };

  const loginWithPopup = () => {
    boundActions.loginPopup(auth0);
  };

  const getAccessTokenSilent = () => {
    boundActions.getAccessTokenSilent(auth0);
  };
  const getUserProfile = () => {
    boundActions.getUserProfile(auth0);
  };

  const logout = () => {
    boundActions.logout(auth0);
  };

  return {
    state,
    actions: {
      loginWithRedirect,
      getAccessTokenSilent,
      getUserProfile,
      logout,
    },
  };
};

export default useAuthState;
