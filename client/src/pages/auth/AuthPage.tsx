import { Box, Button, Input, InputLabel, Typography, useTheme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { methods } from '../../api/methods.ts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actios-creators/userAction.ts';
import { UserCredentials, UserProfile } from '../../types/type.ts';
import { jwtDecode } from 'jwt-decode';
import CustomInput from '../../UI/CustomInput.tsx';
import { CustomButton } from '../../UI/CustomButton.tsx';

const AuthPage = ({ type }: { type: string }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const theme = useTheme();

	const navigate = useNavigate();

	const isSignIn = type === 'sign-in';

	const authHandler = async () => {
		console.log('AuthPage');

		const profile: UserCredentials = {
			email,
			password,
			username,
		}

		if (type === 'sign-in') {
			await signInHandler(profile);
		} else if (type === 'sign-up') {
			await signUpHandler(profile);
		}
	}

	const signInHandler = async (profile: UserCredentials) => {
		try {
			const response = await methods.auth.signIn(profile);

			if (!response) {
				return;
			}

			const token  = jwtDecode(response?.data.token);

			dispatch(login(token.email));
			navigate('/profile');
		} catch (e) {
			console.log(e);
		}
	}

	const signUpHandler = async (profile: UserCredentials) => {
		try {
			const response = await methods.auth.signIn(profile);

			const userData: UserProfile = {
				email: response?.data.data.user.email
			}

			if (response?.status === 201) {
				dispatch(login(userData));
				navigate('/profile');
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
			<Box sx={{ maxWidth: '700px', maxHeight: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  backgroundColor: theme.palette.background.paper, padding: '180px 64px', borderRadius: '32px' }}>
				<Box className="auth-page__title">
					<Typography sx={{ textAlign: 'center' }} variant='h4'>{isSignIn ? 'Sign In' : 'Sign Up'}</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
					<CustomInput
						label="Email"
						placeholder="Enter email"
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					{
						!isSignIn &&
						<CustomInput
							label="Username"
							placeholder="Enter username"
							type="text"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>
					}
					<CustomInput
						label="Password"
						placeholder="Enter password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</Box>

				<Box sx={{ marginTop: '20px' }} onClick={ authHandler }>
					<CustomButton>
						{isSignIn ? 'Sign In' : 'Sign Up'}
					</CustomButton>
				</Box>

				<Box sx={{ marginTop: '20px'}}>
					{
						isSignIn
						? <NavLink style={{ color: '#9F9FF8' }} to="/auth/sign-up">Sign Up</NavLink>
						: <NavLink style={{ color: '#9F9FF8' }} to="/auth/sign-in">Sign In</NavLink>
					}
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;