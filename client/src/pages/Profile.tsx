import { useDispatch, useSelector } from 'react-redux';
import {
	Box, Card, CardContent,
	Typography, TextField, CardActions, Button,
} from '@mui/material';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { AlertType, UserCredentials, UserProfile } from '../types/type.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { logout, setUserProfile, updateUser } from '../store/slices/userSlice.ts';

const Profile = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const [currentUser, setCurrentUser] = useState<UserProfile>({
		email: '',
		username: '',
		password: '',
		role: '',
		id: 0,
		exp: 0,
		iat: 0,
		created_at: '',
	});

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleInputChange = (field: keyof UserCredentials, value: string) => {
		dispatch(updateUser({ [field]: value }));
	};

	const handleUpdateProfile = async () => {
		if (!user) return;

		const payload: Partial<UserCredentials> = {
			username: user.username,
			email: user.email,
			id: user.id,
		};

		if (oldPassword && newPassword) {
			payload.oldPassword = oldPassword;
			payload.password = newPassword;
		}

		try {
			const response = await methods.auth.updateUser(payload);

			if (response?.status === 200) {
				dispatch(showAlert({ isShowAlert: true, message: 'Профиль обновлен', type: AlertType.SUCCESS }));
			}
		}
		catch {
			dispatch(showAlert({ isShowAlert: true, message: 'Ошибка при обновлении профиля', type: AlertType.ERROR }));
			dispatch(setUserProfile(currentUser));
		}
		finally {
			setOldPassword('');
			setNewPassword('');
		}
	};

	const handleDeleteAccount = async () => {
		try {
			const response = await methods.auth.deleteUser(user!.id);
			if (response?.status === 200) {
				logoutHandler();
				dispatch(showAlert({ isShowAlert: true, message: response.data.message, type: AlertType.SUCCESS }));
			}
		}
		catch {
			dispatch(showAlert({ isShowAlert: true, message: 'Ошибка при удалении аккаунта', type: AlertType.ERROR }));
		}
	};

	const logoutHandler = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		dispatch(logout());
	};

	const fetchUserProfile = async () => {
		try {
			const response = await methods.auth.getUserInfo(user!.id);
			if (response?.status === 200) {
				dispatch(setUserProfile(response.data));
				setCurrentUser(response.data);
			}
		}
		catch {
			dispatch(showAlert({ isShowAlert: true, message: 'Ошибка загрузки профиля', type: AlertType.ERROR }));
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	return (
		<Box className="container" sx={{ padding: 4 }}>
			<Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
				Профиль пользователя
			</Typography>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Профиль
					</Typography>
					<TextField
						label="Имя пользователя"
						variant="outlined"
						fullWidth
						margin="normal"
						value={user?.username || ''}
						onChange={(e) => handleInputChange('username', e.target.value)}
					/>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						type="email"
						value={user?.email || ''}
						onChange={(e) => handleInputChange('email', e.target.value)}
					/>
					<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
						Смена пароля
					</Typography>
					<TextField
						label="Старый пароль"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<TextField
						label="Новый пароль"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</CardContent>
				<CardActions sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					gap: '10px',
				}}>
					<Button variant="contained" color="success" onClick={handleUpdateProfile}>
						Обновить данные
					</Button>
					<Button variant="contained" color="primary" onClick={logoutHandler}>
						Выйти
					</Button>
					<Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
						Удалить аккаунт
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default Profile;