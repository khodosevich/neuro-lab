import { Box, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import reactSvg from '../assets/icons/react.svg';
import nodeJs from '../assets/icons/nodejs.svg';
import docker from '../assets/icons/docker.svg';
import gitlab from '../assets/icons/gitlab.svg';
import mui from '../assets/icons/mui.svg';
import pg from '../assets/icons/pg.svg';
import python from '../assets/icons/python.svg';
import reduxSvg from '../assets/icons/redux.svg';
import ts from '../assets/icons/ts.svg';


const Technologies = () => {
	const theme = useTheme();

	const technologies = [
		{ name: 'React', logo: reactSvg },
		{ name: 'TypeScript', logo: ts },
		{ name: 'Redux', logo: reduxSvg },
		{ name: 'MUI', logo: mui },
		{ name: 'Node.js', logo: nodeJs },
		{ name: 'Python', logo: python },
		{ name: 'Docker', logo: docker },
		{ name: 'Postgresql', logo: pg },
		{ name: 'Gitlab', logo: gitlab },
	];

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default }}>
			<Box className='container' sx={{ paddingBlock: '60px' }}>
				<Swiper
					modules={[ Autoplay]}
					autoplay={{
						delay: 1000,
						disableOnInteraction: false
					}}
					spaceBetween={30}
					slidesPerView={3}
					navigation
					loop={true}
					breakpoints={{
						640: {
							slidesPerView: 1,
							centeredSlides: true,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 5,
						},
					}}
					style={{ padding: '20px' }}
				>
					{technologies.map((tech, index) => (
						<SwiperSlide key={index} style={{ textAlign: 'center' }}>
							<img src={tech.logo} alt={tech.name} style={{ width: '80px', height: '80px' }} />
							<h3>{tech.name}</h3>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Box>
	);
};

export default Technologies;