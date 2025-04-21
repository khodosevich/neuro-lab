import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Divider, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logout } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

const BurgerMenu = ({ menuOpen, toggleMenu, links, isAuth }: {
	menuOpen: boolean;
	toggleMenu: () => void;
	links: { path: string; name: string }[];
	isAuth: boolean;
}) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
		toggleMenu();
	};

	const itemVariants = {
		open: {
			opacity: 1,
			x: 0,
			transition: { type: "spring", stiffness: 300, damping: 24 }
		},
		closed: { opacity: 0, x: 20 }
	};

	return (
		<Drawer
			anchor="right"
			open={menuOpen}
			onClose={toggleMenu}
			sx={{
				'& .MuiDrawer-paper': {
					width: { xs: '100%', sm: 350 },
					background: theme.palette.background.default,
				},
			}}
		>
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					p: 3,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 3,
					}}
				>
					<Typography variant="h6" color="text.primary">
						Меню
					</Typography>
					<motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
						<IconButton
							onClick={toggleMenu}
							sx={{
								color: theme.palette.text.primary,
							}}
						>
							<CloseIcon />
						</IconButton>
					</motion.div>
				</Box>

				<List sx={{ flexGrow: 1 }}>
					{links.map((link) => (
						<motion.div
							key={link.path}
							variants={itemVariants}
							whileHover={{ x: 5 }}
							whileTap={{ scale: 0.95 }}
						>
							<ListItem
								component={NavLink}
								to={link.path}
								onClick={toggleMenu}
								sx={{
									borderRadius: 2,
									mb: 1,
									'&.active': {
										background: theme.palette.action.selected,
										'& .MuiListItemText-primary': {
											color: theme.palette.primary.main,
											fontWeight: 500,
										},
									},
								}}
							>
								<ListItemText
									primary={link.name}
									primaryTypographyProps={{
										color: 'text.primary',
									}}
								/>
							</ListItem>
						</motion.div>
					))}
				</List>

				<Box>
					<Divider sx={{ my: 2 }} />
					{isAuth ? (
						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								fullWidth
								variant="outlined"
								color="error"
								onClick={handleLogout}
								sx={{
									py: 1.5,
									borderRadius: 2,
									textTransform: 'none',
									fontWeight: 500,
								}}
							>
								Выйти
							</Button>
						</motion.div>
					) : (
						 <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							 <Button
								 fullWidth
								 variant="contained"
								 component={NavLink}
								 to="/login"
								 onClick={toggleMenu}
								 sx={{
									 py: 1.5,
									 borderRadius: 2,
									 textTransform: 'none',
									 fontWeight: 500,
								 }}
							 >
								 Войти
							 </Button>
						 </motion.div>
					 )}
				</Box>
			</Box>
		</Drawer>
	);
};

export default BurgerMenu;