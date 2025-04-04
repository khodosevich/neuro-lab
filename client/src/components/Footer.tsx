import { Box, useTheme, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Footer = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const links = [
		{ path: '/models', name: 'Модели' },
		{ path: '/datasets', name: 'Датасеты' },
		{ path: '/chat', name: 'Чат' },
		{ path: '/profile', name: 'Профиль' },
	];

	return (
		<footer style={{ backgroundColor: '#202020', padding: '40px 0', color: theme.palette.background.default }}>
			<Box className="container" sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				textAlign: isMobile ? 'center' : 'left',
			}}>
				<NavLink to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
					neuro-lab
				</NavLink>

				<Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 5, mt: isMobile ? 3 : 0 }}>
					{links.map((link) => (
						<NavLink to={link.path} key={link.path} style={{ fontSize: '1rem' }}>
							
							{link.name}
						</NavLink>
					))}
				</Box>
			</Box>

			<Box sx={{ textAlign: 'center', marginTop: 4, fontSize: '0.9rem' }}>
				Make something awesome
			</Box>
		</footer>
	);
};

export default Footer;