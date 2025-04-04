import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column',
			alignItems: 'center', justifyContent: 'center',
			height: '100vh' }}
		>
			<Typography variant='h1' sx={{ fontSize:'80px' }}>
				Такой страницы нет! - 404
			</Typography>
			<NavLink style={{ fontSize: '30px', color: '#506ada' }} to='/'>
				На главную
			</NavLink>
		</Box>
	);
};

export default NotFound;