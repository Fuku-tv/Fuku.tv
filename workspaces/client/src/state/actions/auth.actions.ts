import { Auth0ContextInterface } from '@auth0/auth0-react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as fukuService from 'src/services/fukuService';

export const loginPopup = createAsyncThunk('LOGIN_POPUP', async (auth: Auth0ContextInterface) => {
  await auth.loginWithPopup();
  const token = await auth.getAccessTokenSilently();
  return token;
});

export const loginRedirect = createAsyncThunk('LOGIN_REDIRECT', async (auth: Auth0ContextInterface) => {
  await auth.loginWithRedirect();
  const token = await auth.getAccessTokenSilently();
  return token;
});

export const getAccessTokenSilent = createAsyncThunk('GET_ACCESS_TOKEN_SILENT', async (auth: Auth0ContextInterface) => {
  const token = await auth.getAccessTokenSilently();
  fukuService.login(token);
  return token;
});

export const logout = createAsyncThunk('LOGOUT', async (auth: Auth0ContextInterface) => {
  fukuService.logout();
  auth.logout({
    returnTo: globalThis.window.location.origin,
  });
});
