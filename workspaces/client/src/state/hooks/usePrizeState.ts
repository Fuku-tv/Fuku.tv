import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { prizeActions } from '../actions';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';

/**
 * A hook to access the game state/actions in redux
 */
const usePrizeState = () => {
  const state = useSelector((root) => root.prize);
  const store = useStore();
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

  const getPrizeList = () => {
    dispatch(prizeActions.getPrizeList(null));
  };

  const redeemPoints = (amount: number) => {
    dispatch(prizeActions.redeemGiftCard(amount));
  };

  // const startStream = (ref) => {   dispatch(gameActions.startStream(ref)); };

  return {
    state,
    actions: {
      getPrizeList,
      redeemPoints,
    },
  };
};

export default usePrizeState;
