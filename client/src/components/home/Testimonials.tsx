import { Box, Typography, Avatar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const Testimonials = () => {
	const testimonials = [
		{
			name: "Иван Петров",
			role: "Ученик",
			text: "Платформа значительно упростила наш workflow по использованию моделей",
			avatar: "/path/to/avatar1.jpg"
		},
		{
			name: "Петр",
			role: "Ученик",
			text: "Написал весь курсач с платформой!!!",
			avatar: "/path/to/avatar1.jpg"
		},
		{
			name: "Матвей",
			role: "Преподаватель",
			text: "Платформа помогает студентом понять работу с моделями ONNX",
			avatar: "/path/to/avatar1.jpg"
		},
	];

	return (
		<Box sx={{ py: 8, bgcolor: 'background.paper', borderRadius: 4 }}>
			<Box className="container">
				<Typography variant="h3" align="center" gutterBottom>
					Что говорят наши пользователи
				</Typography>
				<Swiper
					modules={[ Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true
					}}
					breakpoints={{
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 }
					}}
					style={{ padding: '40px 0' }}
				>
					{testimonials.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<Box sx={{ p: 3, textAlign: 'center' }}>
								<Avatar src={testimonial.avatar} sx={{ width: 80, height: 80, mx: 'auto' }} />
								<Typography variant="h6" sx={{ mt: 2 }}>{testimonial.name}</Typography>
								<Typography color="text.secondary">{testimonial.role}</Typography>
								<Typography sx={{ mt: 2 }}>{testimonial.text}</Typography>
							</Box>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Box>
	);
};

export default Testimonials;