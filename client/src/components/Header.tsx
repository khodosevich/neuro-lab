import { Box, Button, useTheme, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomNavLink } from '../UI/StyledNavLink.tsx';
import { RootState } from '../store';
import ThemeSwitch from '../UI/ThemeSwitch.tsx';
import { useMediaQuery } from '@mui/material';
import BurgerMenu from './BurgerMenu.tsx';

const Header = ({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [menuOpen, setMenuOpen] = useState(false);

	const links = [
		{ path: '/models', name: 'Модели' },
		{ path: '/datasets', name: 'Датасеты' },
		{ path: '/chat', name: 'Чат' },
		{ path: '/profile', name: 'Профиль' },
	];

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<header style={{ padding: '10px 0', borderBottom: "1px solid #e4e4e4" }}>
			<Box className="container" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<NavLink to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>neuro-lab</NavLink>

				{isMobile ? (
					<Box sx={{
						display: 'flex',
					}}>
						<IconButton onClick={toggleMenu}>
							<MenuIcon/>
						</IconButton>

						<ThemeSwitch isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}/>

						<BurgerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} isAuth={isAuth} links={links} />
					</Box>
				) : (
					 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						 {links.map((link) => (
							 <CustomNavLink to={link.path} key={link.path}>
								 {link.name}
							 </CustomNavLink>
						 ))}
					 </Box>
				 )}

				{
					!isMobile && <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{!isAuth && (
							<Button variant="contained" component={NavLink} to="/login">
								Войти
							</Button>
						)}
						<ThemeSwitch isDarkMode={isDarkMode} onToggleTheme={onToggleTheme}/>
					</Box>
				}
			</Box>
		</header>
	);
};

export default Header;
