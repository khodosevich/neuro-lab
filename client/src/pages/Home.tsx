import { Box } from '@mui/material';
import Landing from '../components/Landing.tsx';
import Technologies from '../components/Technologies.tsx';
import Features from '../components/home/Features.tsx';
import HowItWorks from '../components/home/HowItWork.tsx';
import Testimonials from '../components/home/Testimonials.tsx';
import CallToAction from '../components/home/CallToAction.tsx';
import News from '../components/home/News.tsx';


const Home = () => {
	return (
		<Box>
			<Box className="container" sx={{
				display: 'flex', flexDirection: 'column', gap: 2
			}}>
				<Landing/>
				<Features/>
				<HowItWorks/>
				<Technologies/>
				<Testimonials/>
				<News/>
			</Box>
			<CallToAction/>
		</Box>
	);
};

export default Home;