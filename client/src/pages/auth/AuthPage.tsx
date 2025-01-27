import { Box, Button, Input, InputLabel, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { methods } from '../../api/methods.ts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actios-creators/userAction.ts';
import { UserCredentials, UserProfile } from '../../types/type.ts';
import { jwtDecode } from 'jwt-decode';

const AuthPage = ({ type }: { type: string }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();

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
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap:'32px', padding: '32px', borderRadius: '12px' }}>
				<Box className="auth-page__title">
					<Typography sx={{ textAlign: 'center' }} variant='h4'>{isSignIn ? 'Вход' : 'Регистрация'}</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
					<Box>
						<InputLabel required={true}>
							Email
						</InputLabel>
						<Input placeholder="Введите email" type="email"
						       onChange={ (e) => { setEmail(e.target.value) }}
						       value={email}/>
					</Box>
					{
						!isSignIn &&
						<Box>
							<InputLabel required={true}>
								Имя
							</InputLabel>
							<Input placeholder="Введите имя" type="text"
							       onChange={ (e) => { setUsername(e.target.value) }}
							       value={username}/>
						</Box>
					}
					<Box>
						<InputLabel required={true}>
							Пароль
						</InputLabel>
						<Input placeholder="Введите пароль" type="password"
						       onChange={ (e) => { setPassword(e.target.value) }}
						       value={password}/>
					</Box>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onClick={ authHandler }>
					<Button>
						{isSignIn ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</Box>

				<Box sx={{ textAlign: 'center' }}>
					{
						isSignIn
						? <Typography>
							<NavLink to="/auth/sign-up">Зарегистрироваться</NavLink>
						</Typography>
						: <Typography>
							Уже есть аккаунт?&nbsp;
							<NavLink to="/auth/sign-in">Войти</NavLink>
						</Typography>
					}
				</Box>

				<Box sx={{textAlign: 'center'}}>
					<NavLink to="/">На главную</NavLink>
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;