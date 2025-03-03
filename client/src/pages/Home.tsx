import { Box, useTheme } from '@mui/material';
import Landing from '../components/Landing.tsx';
import Technologies from '../components/Technologies.tsx';

const Home = () => {
	const theme = useTheme();

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default }}>
			<Box className="container" sx={{
				display: 'flex', flexDirection: 'column', gap: 2
			}}>
				<Landing/>
				<Technologies/>
			</Box>
		</Box>
	);
};

export default Home;