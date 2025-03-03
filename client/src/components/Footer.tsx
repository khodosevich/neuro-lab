import { Box, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Footer = () => {
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
	];

	return (
		<footer style={{ backgroundColor: "#202020", paddingBlock: "60px" }}>
			<Box className='container' sx={{ color: theme.palette.background.default }}>
				<Box sx={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
				}}>
					<Box>
						<NavLink to="/">
							neuro-lab
						</NavLink>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
						{
							links.map((link) => (
								<NavLink to={link.path} key={link.path}>
									{link.name}
								</NavLink>
							))
						}
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
					Make something awesome
				</Box>
			</Box>
		</footer>
	);
};

export default Footer;