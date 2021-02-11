import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from './helpers/TypedStateHooks';
import { actions } from '../slices/auth.slice';
import { authActions } from '../actions';

const useAuthState = () => {
  const auth0 = useAuth0();
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();
  const state = useSelector((x) => x.auth);

  const loginWithRedirect = () => {
    dispatch(authActions.loginRedirect(auth0));
  };

  const loginWithPopup = () => {
    dispatch(authActions.loginPopup(auth0));
  };

  const getAccessTokenSilent = () => {
    dispatch(authActions.getAccessTokenSilent(auth0));
  };

  const logout = () => {
    dispatch(authActions.logout(auth0));
  };

  return {
    state,
    actions: {
      loginWithRedirect,
      getAccessTokenSilent,
      logout,
    },
  };
};

export default useAuthState;
