import { EnhancedStore } from '@reduxjs/toolkit';
import Fuku from './fukuClass';

const fuku = new Fuku();

// TODO add event listeners here
export const startGame = (): void => {};

// TODO end current game
export const endGame = (): void => {};

export const buttonDownEvent = (type: string): void => {
  fuku.buttonStartEvent(type);
};

export const buttonUpEvent = (type: string): void => {
  fuku.buttonEndEvent(type);
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

export const mountStore = (store: EnhancedStore): void => {
  fuku.bootstrapStore(store);
};

export const unmountTimer = (): void => {};
