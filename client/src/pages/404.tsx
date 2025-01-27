import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white' }}>
			<Typography variant='h1' sx={{ fontSize:'80px' }}>Такой страницы нет! - 404</Typography>
			<Typography sx={{ fontSize:'35px' }}>Немного не туда зашел!)</Typography>
			<NavLink to='/'>Вернутся на главную</NavLink>
		</Box>
	);
};

export default NotFound;