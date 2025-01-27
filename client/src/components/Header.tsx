import { Box, Button, Switch } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actios-creators/userAction.ts';

const Header = ({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) => {

	const isAuth = useSelector((state: any) => state.user.isAuth);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box className="header">
			<Box className="container" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Box className="header__logo">
					neuro-lab
				</Box>

				<Box className="header__menu" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<NavLink to="/">
						home
					</NavLink>
					<NavLink to="/auth/sign-in">
						Войти
					</NavLink>
					<NavLink to="/auth/sign-up">
						Регистрация
					</NavLink>
					<NavLink to="/profile">
						Профиль
					</NavLink>
				</Box>

				{
					isAuth &&
					<Box>
						<Button onClick={logoutHandler}>
							logout
						</Button>
					</Box>
				}

				<Box>
					<Switch checked={isDarkMode} onChange={onToggleTheme} />
				</Box>
			</Box>
		</Box>
	);
};

export default Header;