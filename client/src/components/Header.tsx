import { Box, Button, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomNavLink } from '../UI/StyledNavLink.tsx';
import { RootState } from '../store';
import ThemeSwitch from '../UI/ThemeSwitch.tsx';

const Header = ({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const theme = useTheme();

	const links = [
		{
			path: '/models',
			name: 'Модели',
		},
		{
			path: '/datasets',
			name: 'Датасеты',
		},
		{
			path: '/chat',
			name: 'Чат',
		},
		{
			path: '/profile',
			name: 'Профиль',
		},
	];

	return (
		<header style={{ backgroundColor: theme.palette.background.default, paddingTop: '20px' }}>
			<Box className="container"
			     sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between', }}>
				<NavLink to="/">
					neuro-lab
				</NavLink>

				<Box className="header__menu" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					{
						links.map((link) => (
							<CustomNavLink to={link.path} key={link.path}>
								{link.name}
							</CustomNavLink>
						))
					}
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					{
						!isAuth &&
						<Box>
							<Button variant="contained">
								<NavLink to="/login">
									Войти
								</NavLink>
							</Button>
						</Box>
					}

					<ThemeSwitch isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}/>
				</Box>
			</Box>
		</header>
	);
};

export default Header;