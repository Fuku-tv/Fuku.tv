import { EnhancedStore } from '@reduxjs/toolkit';
import Fuku from './fukuClass';

const fuku = new Fuku();

export const startFukuClass = (): void => {
  fuku.start();
};

export const endFukuClass = (): void => {
  fuku.end();
};

export const login = (token: string): void => {
  fuku.login(token);
};

export const logout = (): void => {
  fuku.logout();
};

export const enterQueue = (): void => {
  fuku.enterQueue();
};

export const buttonDownEvent = (type: string): void => {
  fuku.buttonStartEvent(type);
};

export const buttonUpEvent = (type: string): void => {
  fuku.buttonEndEvent(type);
};

export const sendChatMessage = (message: Record<string, unknown>): void => {
  fuku.sendChatMessage(message);
};

/**
 * subscribes to the fukuClass
 * @param stats
 */
export const onNewGameStats = (stats): void => {};

/**
 * Mount canvas for videofeed
 */
export const mountCanvas = (canvasRef: HTMLElement): void => {
  fuku.bootstrapVideo(canvasRef);
};

/**
 * Unmount canvas for videofeed
 */
export const unmountCanvas = (): void => {
  fuku.disconnectVideo();
};

/**
 * Mounts redux store to fuku for socket subscriptions
 * @param store
 */
export const mountStore = (store: EnhancedStore): void => {
  fuku.bootstrapStore(store);
};

export const unmountTimer = (): void => {};
