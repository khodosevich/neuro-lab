import { Box, Typography, useTheme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { methods } from '../../api/methods.ts';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actios-creators/userAction.ts';
import { AlertType, UserCredentials, UserProfile } from '../../types/type.ts';
import { jwtDecode } from 'jwt-decode';
import CustomInput from '../../UI/CustomInput.tsx';
import { CustomButton } from '../../UI/CustomButton.tsx';
import { hideAlert, showAlert } from '../../../store/actios-creators/alertAction.ts';

const AuthPage = ({ type }: { type: string }) => {
	const isSignIn = type === 'sign-in';
	const dispatch = useDispatch();
	const theme = useTheme();
	const navigate = useNavigate();

	const [userFormData, setUserFormData] = useState<UserCredentials>({
		email: '',
		password: '',
		username: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const authHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (type === 'sign-in') {
			await signInHandler(userFormData);
		} else if (type === 'sign-up') {
			await signUpHandler(userFormData);
		}
	};

	const signInHandler = async (userFormData: UserCredentials) => {
		try {
			const response = await methods.auth.signIn(userFormData);

			if (!response) return;

			const userData: UserProfile = jwtDecode(response?.data.token);

			dispatch(login(userData));
			dispatch(showAlert({isShowAlert: true, message: response.data.message, type: AlertType.SUCCESS}));
			navigate('/profile');
		}
		catch (e) {
			dispatch(showAlert({isShowAlert: true, message: e.response.data.error, type: AlertType.ERROR}));
		} finally {
			setTimeout(() => dispatch(hideAlert()), 3000);
		}
	};

	const signUpHandler = async (userFormData: UserCredentials) => {
		try {
			const response = await methods.auth.signUp(userFormData);
			const userData: UserProfile = jwtDecode(response?.data.token);

			if (response?.status === 201) {
				dispatch(login(userData));
				navigate('/profile');
			}
		}
		catch (e) {
			console.log(e);
		}
	};

	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: '100vh',
			backgroundColor: theme.palette.background.default,
		}}>
			<Box sx={{
				maxWidth: '700px',
				maxHeight: '680px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: theme.palette.background.paper,
				padding: '180px 64px',
				borderRadius: '32px',
			}}>
				<Box className="auth-page__title">
					<Typography sx={{ textAlign: 'center' }} variant="h4">{isSignIn ? 'Sign In' : 'Sign Up'}</Typography>
				</Box>

				<form style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}
				      onSubmit={(e: FormEvent) => authHandler(e)}>
					<CustomInput
						label="Email"
						placeholder="Enter email"
						type="email"
						name="email"
						onChange={handleChange}
						value={userFormData.email}
					/>
					{!isSignIn && (
						<CustomInput
							label="Username"
							placeholder="Enter username"
							type="text"
							name="username"
							onChange={handleChange}
							value={userFormData.username}
						/>
					)}
					<CustomInput
						label="Password"
						placeholder="Enter password"
						type="password"
						name="password"
						onChange={handleChange}
						value={userFormData.password}
					/>
					<CustomButton type="submit">
						{isSignIn ? 'Sign In' : 'Sign Up'}
					</CustomButton>
				</form>

				<Box sx={{ marginTop: '20px' }}>
					{
						isSignIn
						? <NavLink style={{ color: '#9f9ff8' }} to="/auth/sign-up">Sign Up</NavLink>
						: <NavLink style={{ color: '#9f9ff8' }} to="/auth/sign-in">Sign In</NavLink>
					}
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;