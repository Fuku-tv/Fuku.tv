import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLeaderboards } from '../actions/leaderboard.actions';

const initialState = {
  playerList: [],
};

const leaderboardSlice = createSlice({
  name: 'LEADERBOARD',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderboards.fulfilled, (state, action) => ({
      ...state,
      playerList: action.payload.playerList,
    }));
  },
});

export const { actions } = leaderboardSlice;

export default leaderboardSlice.reducer;
