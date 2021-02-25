import { createAsyncThunk, EnhancedStore } from '@reduxjs/toolkit';
import { mountCanvas, buttonDownEvent, buttonUpEvent, mountStore, unmountCanvas, startFukuClass, endFukuClass } from 'src/services/fukuService';

interface Stats {
  watch: number;
  credits: number;
  queue: number;
}

export const startFuku = createAsyncThunk('START_FUKU', async () => {
  startFukuClass();
});

export const endFuku = createAsyncThunk('END_FUKU', async () => {
  endFukuClass();
});

export const startStream = createAsyncThunk('START_STREAM', async (canvasRef: HTMLElement) => {
  mountCanvas(canvasRef);
});

export const startStore = createAsyncThunk('MOUNT_STORE', async (store: EnhancedStore) => {
  mountStore(store);
});

export const endStream = createAsyncThunk('END_STREAM', async () => {
  unmountCanvas();
});

export const setStats = createAsyncThunk('SET_GAME_STATS', async (stats: Stats) => {
  return stats;
});

export const buttonDown = createAsyncThunk('BUTTON_DOWN', async (type: string) => {
  buttonDownEvent(type);
});

export const buttonUp = createAsyncThunk('BUTTON_UP', async (type: string) => {
  buttonUpEvent(type);
});
