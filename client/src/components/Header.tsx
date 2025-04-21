import { Box, Button, useTheme, IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { RootState } from '../store';
import { useMediaQuery } from '@mui/material';
import { logout } from '../store/slices/userSlice.ts';
import { motion } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BurgerMenu from './BurgerMenu.tsx';

const Header = ({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [menuOpen, setMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const links = [
		{ path: '/models', name: 'Модели' },
		{ path: '/datasets', name: 'Датасеты' },
		{ path: '/chat', name: 'Чат' },
		{ path: '/profile', name: 'Профиль' },
	];

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const logoutHandler = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		dispatch(logout());
		navigate('/login');
	};

	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.primary,
				borderBottom: `1px solid ${theme.palette.divider}`,
				py: 1,
			}}
		>
			<Toolbar sx={{
				display: 'flex',
				justifyContent: 'space-between',
				maxWidth: 'xl',
				mx: 'auto',
				width: '100%',
			}}>
				<motion.div whileHover={{ scale: 1.05 }}>
					<NavLink
						to="/"
						style={{
							textDecoration: 'none',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 700,
								color: theme.palette.primary.main,
								letterSpacing: 1,
							}}
						>
							NEURO-LAB
						</Typography>
					</NavLink>
				</motion.div>

				{!isMobile && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
						<Box sx={{ display: 'flex', gap: 3 }}>
							{links.map((link) => (
								<motion.div key={link.path} whileHover={{ y: -2 }}>
									<NavLink
										to={link.path}
										style={({ isActive }) => ({
											textDecoration: 'none',
											color: isActive
											       ? theme.palette.primary.main
											       : theme.palette.text.primary,
											fontWeight: isActive ? 600 : 400,
											transition: 'all 0.3s ease',
										})}
									>
										<Typography variant="body1">
											{link.name}
										</Typography>
									</NavLink>
								</motion.div>
							))}
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<IconButton onClick={onToggleTheme} color="inherit">
								{isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
							</IconButton>

							{isAuth ? (
								<motion.div whileHover={{ scale: 1.05 }}>
									<Button
										variant="outlined"
										color="primary"
										onClick={logoutHandler}
										sx={{
											borderRadius: 2,
											textTransform: 'none',
											px: 3,
										}}
									>
										Выйти
									</Button>
								</motion.div>
							) : (
								 <motion.div whileHover={{ scale: 1.05 }}>
									 <Button
										 variant="contained"
										 color="primary"
										 component={NavLink}
										 to="/login"
										 sx={{
											 borderRadius: 2,
											 textTransform: 'none',
											 px: 3,
										 }}
									 >
										 Войти
									 </Button>
								 </motion.div>
							 )}
						</Box>
					</Box>
				)}

				{isMobile && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<IconButton onClick={onToggleTheme} color="inherit">
							{isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>

						<IconButton
							edge="end"
							color="inherit"
							aria-label="menu"
							onClick={toggleMenu}
							sx={{
								transition: 'transform 0.3s',
								transform: menuOpen ? 'rotate(90deg)' : 'rotate(0)',
							}}
						>
							<MenuIcon />
						</IconButton>

						<BurgerMenu menuOpen={menuOpen} toggleMenu={toggleMenu} isAuth={isAuth} links={links} />
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;