import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { actions } from 'src/state/slices/leaderboard.sice';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';
import useActions from './helpers/useActions';

/**
 * A hook to access the game state/actions in redux
 */
const useLeaderboardState = () => {
  const state = useSelector((root) => root.leaderboard);

  const boundActions = useActions(actions);

  const updateLeaderboards = (playerList = []) => {
    boundActions.updateLeaderboards(playerList);
  };

  // const startStream = (ref) => {   dispatch(gameActions.startStream(ref)); };

  return {
    state,
    actions: {
      updateLeaderboards,
    },
  };
};

export default useLeaderboardState;
