import api from './authMiddleware.ts';
import { UserCredentials } from '../types/type.ts';

export const methods = {
	auth: {
		async login({ email, password }: UserCredentials) {
			return await api.post('/auth/login', {
				email,
				password,
			});
		},
		async register(user: UserCredentials) {
			return await api.post('/auth/register', user);
		},
		async deleteUser(userId: number) {
			return await api.delete(`/auth/users/${userId}`);
		},
		async logout() {
			return await api.post(`/auth/logout`);
		},
		async getUserInfo(userId: number) {
			return await api.get(`/auth/user/${userId}`);
		},
		async updateUser(user: UserCredentials) {
			console.log(user);
			return await api.put(`/auth/users/${user?.id}`, user);
		}
	},
};