import { jwtDecode } from 'jwt-decode';
import api from '../api/authMiddleware.ts';

export const checkAuth = async (dispatch: any, login: any) => {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');

	if (!accessToken || !refreshToken) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return;
	}

	try {
		const decoded: any = jwtDecode(accessToken);
		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
			const { data } = await api.post('/auth/refresh', { token: refreshToken });

			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);

			const userData = jwtDecode(data.accessToken);
			dispatch(login(userData));
		} else {
			dispatch(login(decoded));
		}
	} catch (error) {
		console.error('Ошибка при проверке токена:', error);
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}
};
