import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertType } from '../../types/type.ts';

type AlertState = {
	isShowAlert: boolean;
	message: string;
	type: AlertType;
}

const initialState: AlertState = {
	isShowAlert: false,
	type: AlertType.INFO,
	message: '',
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert: (state, action: PayloadAction<AlertState>) => {
			state.isShowAlert = true;
			state.type = action.payload.type;
			state.message = action.payload.message;
		},
		hideAlert: (state) => {
			state.isShowAlert = false;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;