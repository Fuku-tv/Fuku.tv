import { createSelectorHook, createDispatchHook, createStoreHook } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppThunk } from 'src/state/actions/helpers/appThunk';
import { RootState } from 'src/state/slices';

function CreateTypedHooks<T>() {
  return {
    useSelector: createSelectorHook<T>(),
    useDispatch: createDispatchHook<T>(),
    useStore: createStoreHook<T>(),
  };
}

export const { useSelector, useDispatch, useStore } = CreateTypedHooks<RootState>();
