import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CallToAction = () => {
	return (
		<Box
			component="section"
			sx={{
				py: 8,
				bgcolor: 'primary.main',
				color: 'primary.contrastText',
			}}
		>
			<Box className="container" sx={{ textAlign: 'center' }}>
				<Typography variant="h3" component="h2" gutterBottom>
					Готовы начать?
				</Typography>
				<Typography variant="h6" sx={{ mb: 4 }}>
					Зарегистрируйтесь и получите доступ ко всем возможностям платформы
				</Typography>

				<Button
					component={Link}
					to="/register"
					variant="contained"
					color="secondary"
					size="large"
					sx={{
						color: 'text.primary',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: 3,
						},
					}}
				>
					Начать бесплатно
				</Button>
			</Box>
		</Box>
	);
};

export default CallToAction;