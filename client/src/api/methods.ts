import axios from 'axios';
import { UserCredentials } from '../types/type.ts';

const api = axios.create({
	baseURL: 'http://localhost:5001',
	headers: {
		['Content-Type']: 'application/json; charset=utf8',
		['Access-Control-Allow-Origin']: '*',
	},
});

export const methods = {
	auth: {
		async signIn({ email, password, username }: UserCredentials) {
			try {
				return await api.post('/auth/sign-in', { email, password, username });
			}
			catch (error) {
				console.log(error);
			}
		},
		async signUp({ email, password, username }: UserCredentials) {
			try {
				return await api.post('/auth/sign-up', { email, password, username });
			}
			catch (error) {
				console.log(error);
			}
		},
	},
};