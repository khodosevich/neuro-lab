import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar, Divider, Chip, useTheme, Tab, Tabs, Paper, Grid, Link, } from '@mui/material';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { AlertType, UserCredentials, UserProfile } from '../types/type.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { logout, setUserProfile, updateUser } from '../store/slices/userSlice.ts';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import { deepPurple } from '@mui/material/colors';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Profile = () => {

	const theme = useTheme();
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
	const [activeTab, setActiveTab] = useState(0);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({
		username: '',
		email: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const validateFields = () => {
		let isValid = true;
		const newErrors = {
			username: '',
			email: '',
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
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
				type: AlertType.ERROR,
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
					type: AlertType.SUCCESS,
				}));
			}
		}
		catch (error: any) {
			dispatch(setUserProfile(currentUser));
			dispatch(showAlert({
				isShowAlert: true,
				message: error.response?.data?.error || 'Ошибка при обновлении профиля',
				type: AlertType.ERROR,
			}));
		}
		finally {
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
					type: AlertType.SUCCESS,
				}));
			}
		}
		catch (error: any) {
			dispatch(showAlert({
				isShowAlert: true,
				message: error.response?.data?.error || 'Ошибка при удалении аккаунта',
				type: AlertType.ERROR,
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
		}
		catch (error: any) {
			dispatch(showAlert({
				isShowAlert: true,
				message: error.response?.data?.error || 'Ошибка загрузки профиля',
				type: AlertType.ERROR,
			}));
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	return (
		<Box className="container" sx={{
			padding: { xs: 2, md: 4 },
			maxWidth: '1200px',
			margin: '0 auto',
		}}>
			<Typography variant="h4" sx={{
				marginBottom: 4,
				textAlign: 'center',
				fontWeight: '600',
				color: theme.palette.text.primary,
			}}>
				Мой профиль
			</Typography>

			<Grid container spacing={4}>
				<Grid item xs={12} md={4}>
					<Card sx={{
						borderRadius: '12px',
						boxShadow: theme.shadows[3],
						height: '100%',
					}}>
						<CardContent sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
							padding: '32px 16px',
						}}>
							<Avatar sx={{
								width: 120,
								height: 120,
								fontSize: '3rem',
								bgcolor: deepPurple[500],
								marginBottom: 3,
							}}>
								{user?.username?.charAt(0).toUpperCase()}
							</Avatar>

							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								{user?.username}
							</Typography>

							<Chip
								label={user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
								color={user?.role === 'admin' ? 'primary' : 'default'}
								size="small"
								sx={{ mt: 1, mb: 2 }}
							/>

							<Box sx={{
								width: '100%',
								textAlign: 'left',
								mt: 2,
								'& > div': {
									display: 'flex',
									alignItems: 'center',
									mb: 2,
								},
							}}>
								<Box>
									<EmailIcon color="action" sx={{ mr: 1 }}/>
									<Typography variant="body2" color="text.secondary">
										{user?.email}
									</Typography>
								</Box>

								<Box>
									<PersonIcon color="action" sx={{ mr: 1 }}/>
									<Typography variant="body2" color="text.secondary">
										ID: {user?.id}
									</Typography>
								</Box>

								<Box>
									<CalendarTodayIcon color="action" sx={{ mr: 1 }}/>
									<Typography variant="body2" color="text.secondary">
										Зарегистрирован: {new Date(user?.created_at ?? '').toLocaleDateString()}
									</Typography>
								</Box>

								{
									user?.role === 'admin' &&
									<Box>
										<Link
											href={'/admin'}
											rel="noopener noreferrer"
											sx={{
												display: 'flex',
												alignItems: 'center',
												textDecoration: 'none',
												'&:hover': {
													textDecoration: 'underline',
												},
											}}
										>
											<Chip
												label="Список пользователей"
												size="small"
												color="primary"
												sx={{ mr: 1 }}
											/>
										</Link>
									</Box>
								}
							</Box>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} md={8}>
					<Paper sx={{
						borderRadius: '12px',
						overflow: 'hidden',
						boxShadow: theme.shadows[3],
					}}>
						<Tabs
							value={activeTab}
							onChange={(_, newValue) => setActiveTab(newValue)}
							variant="fullWidth"
							sx={{
								backgroundColor: theme.palette.mode === 'dark'
								                 ? theme.palette.grey[800]
								                 : theme.palette.grey[100],
							}}
						>
							<Tab label="Основные данные"/>
							<Tab label="Безопасность"/>
						</Tabs>

						<Box sx={{ p: { xs: 2, md: 4 } }}>
							{activeTab === 0 && (
								<Box component="form">
									<Typography variant="h6" sx={{ mb: 3 }}>
										Основная информация
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
										InputProps={{
											startAdornment: (
												<PersonIcon sx={{
													color: theme.palette.action.active,
													mr: 1,
												}}/>
											),
										}}
										sx={{ mb: 3 }}
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
										InputProps={{
											startAdornment: (
												<EmailIcon sx={{
													color: theme.palette.action.active,
													mr: 1,
												}}/>
											),
										}}
									/>
								</Box>
							)}

							{activeTab === 1 && (
								<Box component="form">
									<Typography variant="h6" sx={{ mb: 3 }}>
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
										InputProps={{
											startAdornment: (
												<LockIcon sx={{
													color: theme.palette.action.active,
													mr: 1,
												}}/>
											),
										}}
										sx={{ mb: 3 }}
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
										InputProps={{
											startAdornment: (
												<LockIcon sx={{
													color: theme.palette.action.active,
													mr: 1,
												}}/>
											),
										}}
										sx={{ mb: 3 }}
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
										InputProps={{
											startAdornment: (
												<LockIcon sx={{
													color: theme.palette.action.active,
													mr: 1,
												}}/>
											),
										}}
									/>
								</Box>
							)}

							<Divider sx={{ my: 4 }}/>

							<Box sx={{
								display: 'flex',
								justifyContent: 'space-between',
								flexWrap: 'wrap',
								gap: 2,
							}}>
								<Button
									variant="contained"
									color="primary"
									startIcon={<SaveIcon/>}
									onClick={handleUpdateProfile}
									sx={{ flex: 1 }}
								>
									Сохранить изменения
								</Button>

								<Button
									variant="outlined"
									color="error"
									startIcon={<LogoutIcon/>}
									onClick={logoutHandler}
								>
									Выйти
								</Button>

								<Button
									variant="text"
									color="error"
									startIcon={<DeleteForeverIcon/>}
									onClick={handleDeleteAccount}
									sx={{ ml: 'auto' }}
								>
									Удалить аккаунт
								</Button>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Profile;