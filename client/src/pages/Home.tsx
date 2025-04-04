import { Box } from '@mui/material';
import Landing from '../components/Landing.tsx';
import Technologies from '../components/Technologies.tsx';

const Home = () => {
	return (
		<Box>
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