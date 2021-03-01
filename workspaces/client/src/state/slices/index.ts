import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import gameReducer from './game.slice';
import navigationReducer from './navigation.slice';
import commerceReducer from './commerce.slice';

export const rootReducer = combineReducers({ game: gameReducer, auth: authReducer, navigation: navigationReducer, commerce: commerceReducer });

export default rootReducer;
