import type { PayloadAction } from '@reduxjs/toolkit';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { endStream, startFuku, startStream } from '../actions/game.actions';

const initialState = {
  timer: 30,
  queue: 0,
  watch: 0,
  credits: 0,
  freeplay: 0,
  points: 0,
  pointsWon: 0,
  gameStatus: '',
  chat: [],
  cameraIsForward: true,
  error: {},
  winnerModalActive: false,
  isPlayerInQueue: false,
  currentlyPlaying: '',
};

const gameSlice = createSlice({
  name: 'GAME',
  initialState,
  reducers: {
    queueStatus(state, action) {
      return {
        ...state,
        isPlayerInQueue: action.payload,
      };
    },
    gameStats(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        credits: action.payload.credits === undefined ? state.credits : action.payload.credits,
        points: action.payload.points === undefined ? state.points : action.payload.points,
        freeplay: action.payload.freeplay === undefined ? state.freeplay : action.payload.freeplay,
        queue: action.payload.queue === undefined ? state.queue : action.payload.queue,
        watch: action.payload.watch === undefined ? state.watch : action.payload.watch,
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
    setPoints(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        points: action.payload.points,
      };
    },
    sendChatMessage(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    },

    setCurrentlyPlaying(state, action: PayloadAction<string>) {
      return {
        ...state,
        currentlyPlaying: action.payload,
      };
    },

    toggleWinnerModal(state, action: PayloadAction<typeof initialState>) {
      return {
        ...state,
        winnerModalActive: !state.winnerModalActive,
        pointsWon: state.winnerModalActive === false ? action.payload.pointsWon : 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startStream.fulfilled, (state, action) => state);
    builder.addCase(startStream.rejected, (state, action) => ({
      ...state,
      error: action.error,
    }));
    builder.addCase(endStream.fulfilled, (state) => state);
    builder.addCase(startFuku.rejected, (state, action) => ({
      ...state,
      error: action.error,
    }));
  },
});

export const { actions } = gameSlice;

export default gameSlice.reducer;
