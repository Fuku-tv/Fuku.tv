import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { prizeActions } from '../actions';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';
import useActions from './helpers/useActions';

/**
 * A hook to access the game state/actions in redux
 */
const usePrizeState = () => {
  const state = useSelector((root) => root.prize);

  const boundActions = useActions(prizeActions);
  const getPrizeList = () => {
    boundActions.getPrizeList(null);
  };

  const redeemPoints = (amount: number) => {
    boundActions.redeemGiftCard(amount);
  };

  return {
    state,
    actions: {
      getPrizeList,
      redeemPoints,
    },
  };
};

export default usePrizeState;
