import type { AnyAction, Store } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { createStoreHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import type { RootDispatch, RootState } from 'src/state/store';

interface TypedHooks<S, D> {
  useSelector: TypedUseSelectorHook<S>;
  useDispatch: () => D;
  useStore: () => Store<S, AnyAction>;
}

export interface StateHook<T> {
  state: T;
  actions: Record<string, unknown>;
}

const CreateTypedHooks = <S, D>(): TypedHooks<S, D> => ({
  useSelector: useReduxSelector,
  useDispatch: () => useReduxDispatch<D>(),
  useStore: createStoreHook<S>(),
});

export const { useSelector, useDispatch, useStore } = CreateTypedHooks<RootState, RootDispatch>();
