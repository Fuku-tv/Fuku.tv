import { createAsyncThunk, EnhancedStore } from '@reduxjs/toolkit';
import {
  mountCanvas,
  buttonDownEvent,
  buttonUpEvent,
  mountStore,
  unmountCanvas,
  startFukuClass,
  endFukuClass,
  sendChatMessage,
} from 'src/services/fukuService';

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

export const setStats = createAsyncThunk('SET_GAME_STATS', async (stats: Stats) => stats);

// export const setChat = createAsyncThunk('SET_GAME_CHAT', async (stats: Stats) => chat);

export const buttonDown = createAsyncThunk('BUTTON_DOWN', async (type: string) => {
  buttonDownEvent(type);
});

export const buttonUp = createAsyncThunk('BUTTON_UP', async (type: string) => {
  buttonUpEvent(type);
});
export const sendMessage = createAsyncThunk('SEND_CHAT_MESSAGE', async (message: Record<string, unknown>) => {
  sendChatMessage(message);
});

export const updateChatList = createAsyncThunk('UPDATE_CHAT_LIST', async (message: Record<string, unknown>) => {});
