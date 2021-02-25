import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endStream, startFuku, startStream } from '../actions/game.actions';

const initialState = {
  timer: 30,
  queue: 0,
  watch: 0,
  credits: 0,
  gameStatus: '',
  cameraIsForward: true,
  error: {},
};

const gameSlice = createSlice({
  name: 'GAME',
  initialState,
  reducers: {
    gamestats(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        credits: action.payload.credits,
        queue: action.payload.queue,
        watch: action.payload.watch,
      };
    },
    setTime(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        timer: action.payload.timer,
      };
    },
    setGameStatus(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      };
    },
    toggleCameraDirection(state) {
      return {
        ...state,
        cameraIsForward: !state.cameraIsForward,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startStream.fulfilled, (state, action) => {
      return state;
    });
    builder.addCase(startStream.rejected, (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    });
    builder.addCase(endStream.fulfilled, (state) => {
      return state;
    });
    builder.addCase(startFuku.rejected, (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    });
  },
});

export const { actions } = gameSlice;

export default gameSlice.reducer;
