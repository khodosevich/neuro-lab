import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';

const BurgerMenu = ({ menuOpen, toggleMenu, links, isAuth }: {
	menuOpen: boolean,
	toggleMenu: () => void,
	links: { path: string; name: string; }[],
	isAuth: boolean
}) => {
	return (
		<Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
			<Box sx={{ width: '320px', padding: '20px' }}>
				<Box sx={{
					display: 'flex',
					justifyContent: 'end',
					width: '100%',
				}}>
					<IconButton onClick={toggleMenu}>
						<CloseIcon/>
					</IconButton>
				</Box>
				<List>
					{links.map((link) => (
						<ListItem key={link.path} component={NavLink} to={link.path} onClick={toggleMenu}>
							<ListItemText primary={link.name}/>
						</ListItem>
					))}
				</List>
				{!isAuth && (
					<Button variant="contained" fullWidth sx={{ mt: 2 }} component={NavLink} to="/login">
						Войти
					</Button>
				)}
			</Box>
		</Drawer>
	);
};

export default BurgerMenu;