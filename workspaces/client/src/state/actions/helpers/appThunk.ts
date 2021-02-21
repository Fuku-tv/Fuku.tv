import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'src/state/store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<unknown>>;

export declare function newFunction();
