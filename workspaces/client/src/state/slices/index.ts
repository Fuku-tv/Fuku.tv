import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import gameReducer from './game.slice';
import navigationReducer from './navigation.slice';
import commerceReducer from './commerce.slice';
import prizeReducer from './prize.slice';

export const rootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
  navigation: navigationReducer,
  commerce: commerceReducer,
  prize: prizeReducer,
});

export default rootReducer;
