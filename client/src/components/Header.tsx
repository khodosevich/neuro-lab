import { Box, Button, Switch, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actios-creators/userAction.ts';
import { CustomButton } from '../UI/CustomButton.tsx';
import { CustomNavLink } from '../UI/StyledNavLink.tsx';
import { RootState } from '../../store';

const Header = ({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) => {

	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const dispatch = useDispatch();
	const theme = useTheme();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default, paddingTop: '20px' }}>
			<Box className="container" sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
				<Box className="header__logo">
					neuro-lab
				</Box>

				<Box className="header__menu" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<CustomNavLink to="/">
						Home
					</CustomNavLink>
					<CustomNavLink to="/models">
						Models
					</CustomNavLink>
					<CustomNavLink to="/profile">
						Profile
					</CustomNavLink>
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					{
						isAuth ?
						<Box>
							<CustomButton sx={{ maxWidth: '100px', paddingBlock: '8px' }} onClick={logoutHandler}>
								Log out
							</CustomButton>
						</Box>
						       : <Box>
							<Button variant="contained">
								<NavLink style={{ color: '#fff' }} to="/auth/sign-in">
									Sign In
								</NavLink>
							</Button>
						</Box>
					}
					<Box>
						<Switch checked={isDarkMode} onChange={onToggleTheme}/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Header;