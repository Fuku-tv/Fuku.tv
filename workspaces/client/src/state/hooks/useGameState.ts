import { actions } from 'src/state/slices/game.slice';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';

import { gameActions } from '../actions';
import useActions from './helpers/useActions';

/**
 * A hook to access the game state/actions in redux
 */
const useGameState = () => {
  const state = useSelector((root) => root.game);
  const store = useStore();
  const boundActions = useActions({ ...actions, ...gameActions });
  const startStream = (ref) => {
    boundActions.startStream(ref);
  };

  const mountStore = () => {
    boundActions.startStore(store);
  };

  const endStream = () => {
    boundActions.endStream();
  };

  const enterQueue = () => {
    boundActions.enterQueue();
  };

  const buttonDownEvent = (type: string) => {
    boundActions.buttonDown(type);
  };

  const buttonUpEvent = (type: string) => {
    boundActions.buttonUp(type);
  };

  const toggleCamera = () => {
    boundActions.toggleCameraDirection();
  };

  const toggleWinnerModal = () => {
    boundActions.toggleWinnerModal();
  };
  const sendChatMessage = (message) => {
    // dispatch(actions.sendChatMessage(message));
    boundActions.sendMessage(message);
  };
  const setCurrentlyPlaying = (player) => {
    boundActions.setCurrentlyPlaying(player);
  };

  const startFuku = () => {
    boundActions.startFuku();
  };

  const endFuku = () => {
    boundActions.endFuku();
  };

  return {
    state,
    actions: {
      startStream,
      endStream,
      mountStore,
      enterQueue,
      buttonDownEvent,
      buttonUpEvent,
      toggleCamera,
      toggleWinnerModal,
      sendChatMessage,
      startFuku,
      endFuku,
      setCurrentlyPlaying,
    },
  };
};

export default useGameState;
