import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getLeaderboards } from 'src/state/actions/leaderboard.actions';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';
import useActions from './helpers/useActions';

/**
 * A hook to access the game state/actions in redux
 */
const useLeaderboardState = () => {
  const state = useSelector((root) => root.leaderboard);

  const boundActions = useActions({ getLeaderboards });

  const getLeaderboard = () => {
    boundActions.getLeaderboards();
  };

  // const startStream = (ref) => {   dispatch(gameActions.startStream(ref)); };

  return {
    state,
    actions: {
      getLeaderboard,
    },
  };
};

export default useLeaderboardState;
