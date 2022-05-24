import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import gameReducer from './game.slice';
import navigationReducer from './navigation.slice';
import leaderboardReducer from './leaderboard.sice';

export const rootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
  navigation: navigationReducer,
  leaderboard: leaderboardReducer,
});

export default rootReducer;
