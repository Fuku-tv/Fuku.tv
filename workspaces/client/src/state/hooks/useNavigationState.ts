import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { actions } from 'src/state/slices/navigation.slice';
import { useDispatch, useSelector, useStore } from './helpers/TypedStateHooks';

/**
 * A hook to access the game state/actions in redux
 */
const useNavigationState = () => {
	const state = useSelector((root) => root.navigation);
	const store = useStore();
	const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch();

	const switchTab = (tab) => {
		dispatch(actions.switchTab(tab));
	};

	// const startStream = (ref) => {   dispatch(gameActions.startStream(ref)); };

	return {
		state,
		actions: {
			switchTab
		}
	};
};

export default useNavigationState;
