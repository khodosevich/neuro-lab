import { Box } from '@mui/material';
import Input from '../../ui/Input';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Button from '../../ui/Button.tsx';


const AuthPage = ({ type }: { type: string }) => {
	return (
		<Box className="auth-page">
			<Box className="auth-page__wrapper">
				<Box className="auth-page__title">
					<h1>{type === 'sign-in' ? 'Вход' : 'Регистрация'}</h1>
				</Box>

				<Box className="auth-page__box">
					<Input placeholder="Введите email" type="email" label="Email" required/>
					<Input placeholder="Введите пароль" type="password" label="Пароль" required/>
				</Box>

				<Box className="auth-page__box">
					<Button label={type === 'sign-in' ? 'Войти' : 'Зарегистрироваться'}/>
				</Box>

				<Box sx={{ textAlign: 'center' }}>
					{
						type === 'sign-in'
						? <NavLink to="/auth/sign-up">Зарегистрироваться</NavLink>
						: <Fragment>
							Уже есть аккаунт?
							<NavLink to="/auth/sign-in">Войти</NavLink>
						</Fragment>
					}
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;