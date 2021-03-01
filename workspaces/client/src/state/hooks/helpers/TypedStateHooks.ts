import { AnyAction, Store } from '@reduxjs/toolkit';
import { createStoreHook, TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { RootDispatch, RootState } from 'src/state/store';

interface TypedHooks<S, D> {
  useSelector: TypedUseSelectorHook<S>;
  useDispatch: () => D;
  useStore: () => Store<S, AnyAction>;
}

const CreateTypedHooks = <S, D>(): TypedHooks<S, D> => {
  return {
    useSelector: useReduxSelector,
    useDispatch: () => useReduxDispatch<D>(),
    useStore: createStoreHook<S>(),
  };
};

export const { useSelector, useDispatch, useStore } = CreateTypedHooks<RootState, RootDispatch>();
