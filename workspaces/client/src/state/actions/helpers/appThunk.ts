import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'src/state/slices';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<unknown>>;
