import { Box, useTheme, useMediaQuery, Typography, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';
import { Instagram } from '@mui/icons-material';

const Footer = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const links = [
		{ path: '/models', name: 'Модели' },
		{ path: '/datasets', name: 'Датасеты' },
		{ path: '/chat', name: 'Чат' },
		{ path: '/profile', name: 'Профиль' },
	];

	const socialLinks = [
		{ icon: <GitHubIcon />, url: 'https://github.com/khodosevich' },
		{ icon: <Instagram />, url: 'https://instagram.com' },
		{ icon: <LinkedInIcon />, url: 'https://linkedin.com' },
	];

	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.secondary,
				py: 6,
				px: 2,
				borderTop: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box
				sx={{
					maxWidth: 'lg',
					mx: 'auto',
					display: 'flex',
					flexDirection: isMobile ? 'column' : 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 4,
				}}
			>
				<Box sx={{ maxWidth: isMobile ? '100%' : 300 }}>
					<motion.div whileHover={{ scale: 1.05 }}>
						<NavLink
							to="/"
							style={{
								textDecoration: 'none',
								display: 'flex',
								alignItems: 'center',
								gap: 1,
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
					<Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
						Платформа для работы с нейронными моделями
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
						gap: 3,
					}}
				>
					{links.map((link) => (
						<motion.div key={link.path} whileHover={{ y: -2 }}>
							<NavLink
								to={link.path}
								style={({ isActive }) => ({
									textDecoration: 'none',
									color: isActive
									       ? theme.palette.primary.main
									       : theme.palette.text.secondary,
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

				<Box sx={{ display: 'flex', gap: 2 }}>
					{socialLinks.map((social, index) => (
						<motion.div
							key={index}
							whileHover={{ y: -5, scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<IconButton
								component="a"
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								sx={{
									color: theme.palette.text.secondary,
									'&:hover': {
										color: theme.palette.primary.main,
										backgroundColor: 'transparent',
									},
								}}
							>
								{social.icon}
							</IconButton>
						</motion.div>
					))}
				</Box>
			</Box>

			<Box
				sx={{
					mt: 6,
					pt: 3,
					borderTop: `1px solid ${theme.palette.divider}`,
					textAlign: 'center',
				}}
			>
				<Typography variant="body2" sx={{ opacity: 0.7 }}>
					© {new Date().getFullYear()} Neuro Lab. Все права защищены.
				</Typography>
				<Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.5 }}>
					Сделано с ❤️ для исследователей ИИ
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;