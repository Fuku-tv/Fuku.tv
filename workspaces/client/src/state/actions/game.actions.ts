import { createAsyncThunk, EnhancedStore } from '@reduxjs/toolkit';
import * as fukuService from 'src/services/fukuService';

interface Stats {
  watch: number;
  credits: number;
  queue: number;
}

export const startFuku = createAsyncThunk('START_FUKU', async () => {
  fukuService.startFukuClass();
});

export const endFuku = createAsyncThunk('END_FUKU', async () => {
  fukuService.endFukuClass();
});

export const startStream = createAsyncThunk('START_STREAM', async (canvasRef: HTMLElement) => {
  fukuService.mountCanvas(canvasRef);
});

export const startStore = createAsyncThunk('MOUNT_STORE', async (store: EnhancedStore) => {
  fukuService.mountStore(store);
});

export const endStream = createAsyncThunk('END_STREAM', async () => {
  fukuService.unmountCanvas();
});

export const setStats = createAsyncThunk('SET_GAME_STATS', async (stats: Stats) => stats);

// export const setChat = createAsyncThunk('SET_GAME_CHAT', async (stats: Stats) => chat);

export const enterQueue = createAsyncThunk('ENTER_QUEUE', async () => {
  fukuService.enterQueue();
});

export const buttonDown = createAsyncThunk('BUTTON_DOWN', async (type: string) => {
  fukuService.buttonDownEvent(type);
});

export const buttonUp = createAsyncThunk('BUTTON_UP', async (type: string) => {
  fukuService.buttonUpEvent(type);
});
export const sendMessage = createAsyncThunk('SEND_CHAT_MESSAGE', async (message: Record<string, unknown>) => {
  fukuService.sendChatMessage(message);
});

export const setCurrentlyPlaying = createAsyncThunk('UPDATE_CURRENTLY_PLAYING', async (player: Record<string, unknown>) => {
  fukuService.setCurrentlyPlaying(player);
});
