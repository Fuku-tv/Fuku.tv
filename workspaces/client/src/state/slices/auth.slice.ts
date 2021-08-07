import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccessTokenSilent, loginPopup, logout, getUserProfile } from '../actions/auth.actions';

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
    login: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => state);
    builder.addCase(loginPopup.fulfilled, (state, action) => ({
      ...state,
      isAuthenticated: true,
      accessToken: action.payload,
    }));
    builder.addCase(loginPopup.rejected, (state) => ({
      ...state,
      isAuthenticated: false,
    }));
    builder.addCase(getAccessTokenSilent.fulfilled, (state, action) => ({
      ...state,
      accessToken: action.payload,
    }));
    builder.addCase(logout.fulfilled, (state, action) => initialState);
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
