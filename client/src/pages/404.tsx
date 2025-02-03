import { Box, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
	const theme = useTheme();

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: theme.palette.text.primary }}>
			<Typography variant='h1' sx={{ fontSize:'80px' }}>Not found! - 404</Typography>
			<NavLink style={{ fontSize: '30px', color: '#506ada' }} to='/'>Home</NavLink>
		</Box>
	);
};

export default NotFound;