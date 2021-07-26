import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  playerList: [],
};

const leaderboardSlice = createSlice({
  name: 'LEADERBOARD',
  initialState,
  reducers: {
    updateLeaderboards(state, action) {
      return {
        ...state,
        playerLList: action.payload,
      };
    },
  },
});

export const { actions } = leaderboardSlice;

export default leaderboardSlice.reducer;
