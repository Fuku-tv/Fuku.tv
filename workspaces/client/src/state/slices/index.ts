import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import gameReducer from './game.slice';
import navigationReducer from './navigation.slice';

export const rootReducer = combineReducers({game: gameReducer, auth: authReducer, navigation: navigationReducer});

export type RootState = ReturnType < typeof rootReducer >;
