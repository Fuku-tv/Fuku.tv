import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboard } from 'src/services/fukuApiService';

export const getLeaderboards = createAsyncThunk('GET_LEADERBOARDS', async () => {
  const playerList = await getLeaderboard();
  return playerList;
});

export default {};
