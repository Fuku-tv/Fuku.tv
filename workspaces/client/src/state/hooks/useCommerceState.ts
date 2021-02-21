import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { commerceActions } from '../actions';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';

/**
 * A hook to access the game state/actions in redux
 */
const useCommerceState = () => {
  const state = useSelector((root) => root.commerce);
  const store = useStore();
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

  const getProducts = () => {
    dispatch(commerceActions.getProductList());
  };

  const checkout = (items) => {
    dispatch(commerceActions.checkout(items));
  };

  // const startStream = (ref) => {   dispatch(gameActions.startStream(ref)); };

  return {
    state,
    actions: {
      getProducts,
      checkout,
    },
  };
};

export default useCommerceState;
