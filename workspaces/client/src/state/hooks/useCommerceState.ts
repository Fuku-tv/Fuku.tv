import { AnyAction, bindActionCreators, ThunkDispatch } from '@reduxjs/toolkit';
import { commerceActions } from '../actions';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';
import useActions from './helpers/useActions';

/**
 * A hook to access the game state/actions in redux
 */
const useCommerceState = () => {
  const state = useSelector((root) => root.commerce);

  const boundActions = useActions(commerceActions);

  const getProducts = () => {
    boundActions.getProductList();
  };

  const checkout = (items) => {
    boundActions.checkout(items);
  };

  return {
    state,
    actions: {
      getProducts,
      checkout,
    },
  };
};

export default useCommerceState;
