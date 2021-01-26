import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	tab: 'Play'
};

const navigationSlice = createSlice({
	name: 'NAVIGATION',
	initialState,
	reducers: {
		switchTab(state, action) {
			return {
				...state,
				tab: action.payload
			};
		}
	}
});

export const { actions } = navigationSlice;

export default navigationSlice.reducer;
