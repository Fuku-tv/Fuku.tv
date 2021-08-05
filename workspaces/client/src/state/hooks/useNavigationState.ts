import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { actions } from 'src/state/slices/navigation.slice';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';
import useActions from './helpers/useActions';

/**
 * A hook to access the game state/actions in redux
 */
const useNavigationState = () => {
  const state = useSelector((root) => root.navigation);

  const boundActions = useActions(actions);

  const switchTab = (tab) => {
    boundActions.switchTab(tab);
  };

  // const startStream = (ref) => {   dispatch(gameActions.startStream(ref)); };

  return {
    state,
    actions: {
      switchTab,
    },
  };
};

export default useNavigationState;
