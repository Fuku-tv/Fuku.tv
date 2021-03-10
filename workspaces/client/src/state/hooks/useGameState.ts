import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { actions } from 'src/state/slices/game.slice';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';

import { gameActions } from '../actions';

/**
 * A hook to access the game state/actions in redux
 */
const useGameState = () => {
  const state = useSelector((root) => root.game);
  const store = useStore();
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

  const startStream = (ref) => {
    dispatch(gameActions.startStream(ref));
  };

  const mountStore = () => {
    dispatch(gameActions.startStore(store));
  };

  const endStream = () => {
    dispatch(gameActions.endStream());
  };

  const buttonDownEvent = (event: React.PointerEvent<HTMLButtonElement>) => {
    const buttonType = event.currentTarget.getAttribute('data-type');
    dispatch(gameActions.buttonDown(buttonType));
  };

  const buttonUpEvent = (event: React.PointerEvent<HTMLButtonElement>) => {
    const buttonType = event.currentTarget.getAttribute('data-type');
    dispatch(gameActions.buttonUp(buttonType));
  };

  const toggleCamera = () => {
    dispatch(actions.toggleCameraDirection());
  };

  const toggleWinnerModal = () => {
    dispatch(actions.toggleWinnerModal());
  };

  const startFuku = () => {
    dispatch(gameActions.startFuku());
  };

  const endFuku = () => {
    dispatch(gameActions.endFuku());
  };

  return {
    state,
    actions: {
      startStream,
      endStream,
      mountStore,
      buttonDownEvent,
      buttonUpEvent,
      toggleCamera,
      toggleWinnerModal,
      startFuku,
      endFuku,
    },
  };
};

export default useGameState;
