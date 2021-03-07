import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccessTokenSilent, loginPopup, logout } from '../actions/auth.actions';

const initialState = {
  nickname: '',
  name: '',
  username: '',
  email: '',
  isAuthenticated: false,
  picture: '',
  accessToken: '',
};

const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [loginPopup.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload,
      };
    },
    [loginPopup.rejected.toString()]: (state) => {
      return {
        ...state,
        isAuthenticated: false,
      };
    },
    [getAccessTokenSilent.fulfilled.toString()]: (state, action) => {
      return {
        ...state,
        accessToken: action.payload,
      };
    },
    [logout.fulfilled.toString()]: (state, action) => {
      return initialState;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
