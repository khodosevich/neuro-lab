import { AlertDate } from '../../src/types/type';

export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";

const inittialState = {
	isShowAlert: false,
	type: "info",
	message: "",
}

export const alertReducer = (state = inittialState, action: { type: string, payload: AlertDate }) => {
	switch (action.type) {
		case SHOW_ALERT:
			return {
				isShowAlert: action.payload.isShowAlert,
				type: action.payload.type,
				message: action.payload.message,
			};
		case HIDE_ALERT:
			return {
				isShowAlert: action.payload,
			};
		default: {
			return state;
		}
	}
}