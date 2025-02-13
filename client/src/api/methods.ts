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
		async signIn(user: UserCredentials) {
			return await api.post('/auth/sign-in', user);
		},
		async signUp(user: UserCredentials) {
			return await api.post('/auth/sign-up', user);
		},
		async deleteUser(userId: number) {
			return await api.delete(`/auth/delete/${userId}`);
		}
	},
	models: {
		async getModelsList() {
			return await api.get('/models/list');
		}
	}
};