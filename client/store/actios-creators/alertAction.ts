import { AlertDate } from '../../src/types/type';
import { HIDE_ALERT, SHOW_ALERT } from '../reducers/alertReducer.ts';

export const showAlert = (payload: AlertDate) => ({
	type: SHOW_ALERT,
	payload
});

export const hideAlert = () => ({
	type: HIDE_ALERT,
	payload: false
})