import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function useActions<T>(actions: T): T {
  const dispatch = useDispatch();
  return useMemo(() => {
    if (Array.isArray(actions)) {
      return ((actions as unknown) as ActionCreatorsMapObject).map((a) => bindActionCreators(a, dispatch));
    }
    return bindActionCreators((actions as unknown) as ActionCreatorsMapObject, dispatch);
  }, [actions, dispatch]);
}
