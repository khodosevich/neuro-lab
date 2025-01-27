import { Box } from '@mui/material';
import Input from '../../ui/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Button from '../../ui/Button.tsx';
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
		<Box className="auth-page">
			<Box className="auth-page__wrapper">
				<Box className="auth-page__title">
					<h1>{isSignIn ? 'Вход' : 'Регистрация'}</h1>
				</Box>

				<Box className="auth-page__box">
					<Input placeholder="Введите email" type="email"
					       onChange={ (e) => { setEmail(e.target.value) }}
					       label="Email" required value={email} />
					{
						!isSignIn &&
						<Input placeholder="Введите имя" type="text"
						       onChange={ (e) => { setUsername(e.target.value) }}
						       label="Имя" required value={username} />
					}
					<Input placeholder="Введите пароль" type="password"
					       onChange={ (e) => { setPassword(e.target.value) }}
					       label="Пароль" required value={password} />
				</Box>

				<Box className="auth-page__box" onClick={ authHandler }>
					<Button label={isSignIn ? 'Войти' : 'Зарегистрироваться'}/>
				</Box>

				<Box sx={{ textAlign: 'center' }}>
					{
						isSignIn
						? <NavLink to="/auth/sign-up">Зарегистрироваться</NavLink>
						: <Fragment>
							Уже есть аккаунт?&nbsp;
							<NavLink to="/auth/sign-in">Войти</NavLink>
						</Fragment>
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