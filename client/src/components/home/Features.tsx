import { Box, Grid, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const Features = () => {
	const features = [
		{
			title: "Простота использования",
			description: "Интуитивно понятный интерфейс для работы с моделями"
		},
		{
			title: "Мощные инструменты",
			description: "Все необходимое для обучения и развертывания моделей"
		},
		{
			title: "Современные технологии",
			description: "Используем передовые инструменты и фреймворки для максимальной эффективности"
		},
		{
			title: "Безопасность",
			description: "Защита ваших данных и моделей"
		}
	];

	return (
		<Box sx={{ py: 8, bgcolor: 'background.default' }}>
			<Box className="container">
				<Typography variant="h3" align="center" gutterBottom>
					Почему выбирают нашу платформу
				</Typography>
				<Grid container spacing={4} sx={{ mt: 4 }}>
					{features.map((feature, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
								<CheckCircle color="primary" sx={{ fontSize: 60, mb: 2 }} />
								<Typography variant="h6" gutterBottom>{feature.title}</Typography>
								<Typography textAlign="center">{feature.description}</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default Features;