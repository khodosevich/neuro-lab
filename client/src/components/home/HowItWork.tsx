import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

const HowItWorks = () => {
	const steps = [
		"Зарегистрируйтесь",
		"Выберите или создайте модель",
		"Перейдите в чат",
		"Напишите свой запрос для модели"
	];

	return (
		<Box sx={{ py: 8 }}>
			<Box className="container">
				<Typography variant="h3" align="center" gutterBottom>
					Как это работает
				</Typography>
				<Stepper alternativeLabel sx={{ mt: 6 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</Box>
		</Box>
	);
};

export default HowItWorks;