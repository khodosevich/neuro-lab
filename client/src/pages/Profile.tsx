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
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errors, setErrors] = useState({
		username: '',
		email: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	});

	const validateFields = () => {
		let isValid = true;
		const newErrors = {
			username: '',
			email: '',
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		};

		if (!user?.username.trim()) {
			newErrors.username = 'Имя пользователя обязательно';
			isValid = false;
		} else if (user.username.length < 3) {
			newErrors.username = 'Имя пользователя должно быть не менее 3 символов';
			isValid = false;
		}

		if (!user?.email.trim()) {
			newErrors.email = 'Email обязателен';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
			newErrors.email = 'Введите корректный email';
			isValid = false;
		}

		if (oldPassword || newPassword || confirmPassword) {
			if (!oldPassword) {
				newErrors.oldPassword = 'Введите текущий пароль';
				isValid = false;
			}

			if (!newPassword) {
				newErrors.newPassword = 'Введите новый пароль';
				isValid = false;
			} else if (newPassword.length < 6) {
				newErrors.newPassword = 'Пароль должен быть не менее 6 символов';
				isValid = false;
			}

			if (newPassword !== confirmPassword) {
				newErrors.confirmPassword = 'Пароли не совпадают';
				isValid = false;
			}
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleInputChange = (field: keyof UserCredentials, value: string) => {
		dispatch(updateUser({ [field]: value }));
		setErrors(prev => ({ ...prev, [field]: '' }));
	};

	const handleUpdateProfile = async () => {
		if (!user || !validateFields()) {
			dispatch(showAlert({
				isShowAlert: true,
				message: 'Пожалуйста, заполните все поля корректно',
				type: AlertType.ERROR
			}));
			return;
		}

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
			const response = await methods.user.updateUser(payload);

			if (response?.status === 200) {
				dispatch(showAlert({
					isShowAlert: true,
					message: 'Профиль успешно обновлен',
					type: AlertType.SUCCESS
				}));
				setCurrentUser(response.data);
			}
		} catch (error: any) {
			dispatch(setUserProfile(currentUser));
			dispatch(showAlert({
				isShowAlert: true,
				message: error.response?.data?.error || 'Ошибка при обновлении профиля',
				type: AlertType.ERROR
			}));
		} finally {
			setOldPassword('');
			setNewPassword('');
			setConfirmPassword('');
		}
	};

	const handleDeleteAccount = async () => {
		try {
			const response = await methods.user.deleteUser(user!.id);
			if (response?.status === 200) {
				logoutHandler();
				dispatch(showAlert({
					isShowAlert: true,
					message: response.data.message || 'Аккаунт успешно удален',
					type: AlertType.SUCCESS
				}));
			}
		} catch (error: any) {
			dispatch(showAlert({
				isShowAlert: true,
				message: error.response?.data?.error || 'Ошибка при удалении аккаунта',
				type: AlertType.ERROR
			}));
		}
	};

	const logoutHandler = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		dispatch(logout());
	};

	const fetchUserProfile = async () => {
		try {
			const response = await methods.user.getUserInfo(user!.id);
			if (response?.status === 200) {
				dispatch(setUserProfile(response.data));
				setCurrentUser(response.data);
			}
		} catch (error: any) {
			dispatch(showAlert({
				isShowAlert: true,
				message: error.response?.data?.error || 'Ошибка загрузки профиля',
				type: AlertType.ERROR
			}));
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
						error={!!errors.username}
						helperText={errors.username}
						required
					/>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						type="email"
						value={user?.email || ''}
						onChange={(e) => handleInputChange('email', e.target.value)}
						error={!!errors.email}
						helperText={errors.email}
						required
					/>
					<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
						Смена пароля
					</Typography>
					<TextField
						label="Текущий пароль"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={oldPassword}
						onChange={(e) => {
							setOldPassword(e.target.value);
							setErrors(prev => ({ ...prev, oldPassword: '' }));
						}}
						error={!!errors.oldPassword}
						helperText={errors.oldPassword}
					/>
					<TextField
						label="Новый пароль"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={newPassword}
						onChange={(e) => {
							setNewPassword(e.target.value);
							setErrors(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
						}}
						error={!!errors.newPassword}
						helperText={errors.newPassword}
					/>
					<TextField
						label="Подтвердите новый пароль"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
							setErrors(prev => ({ ...prev, confirmPassword: '' }));
						}}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword}
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
					<Button variant="contained" color="error" onClick={handleDeleteAccount}>
						Удалить аккаунт
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default Profile;