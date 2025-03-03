import { useDispatch, useSelector } from 'react-redux';
import {
	Box, Card, useTheme, CardContent,
	Typography, TextField, CardActions, Button,
} from '@mui/material';
import { RootState } from '../store';
import { useEffect } from 'react';
import { methods } from '../api/methods.ts';
import { AlertType } from '../types/type.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { logout, setUserProfile, updateUser } from '../store/slices/userSlice.ts';

const Profile = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (field: keyof typeof user, value: string) => {
		dispatch(updateUser({ [field]: value }));
	};

	const handleUpdateProfile = async () => {
		try {
			if (!user) return;

			const response = await methods.auth.updateUser({
				username: user.username,
				email: user.email,
				id: user.id
			});

			console.log(response);

			if (response?.status === 200) {
				dispatch(showAlert({ isShowAlert: true, message: 'Профиль обновлен', type: AlertType.SUCCESS }));
			}

		} catch (error: any) {
			dispatch(showAlert({ isShowAlert: true, message: 'Ошибка при обновлении профиля', type: AlertType.ERROR }));
		}
	};

	const handleDeleteAccount = async () => {
		try {
			const response = await methods.auth.deleteUser(user?.id);
			if (response?.status === 200) {
				logoutHandler();
				dispatch(showAlert({ isShowAlert: true, message: response.data.message, type: AlertType.SUCCESS }));
			}
		} catch (error: any) {
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
			const response = await methods.auth.getUserInfo(user?.id);
			if (response?.status === 200) {
				dispatch(setUserProfile(response.data));
			}
		} catch (error: any) {
			dispatch(showAlert({ isShowAlert: true, message: 'Ошибка загрузки профиля', type: AlertType.ERROR }));
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default, height: '100%' }}>
			<Box className="container">
				<Box sx={{ paddingTop: 4 }}>
					<Card>
						<CardContent>
							<Typography variant="h5" gutterBottom>
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
						</CardContent>
						<CardActions>
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
			</Box>
		</Box>
	);
};

export default Profile;