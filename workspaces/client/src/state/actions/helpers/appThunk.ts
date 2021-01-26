import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'src/state/reducers';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<any>>;
