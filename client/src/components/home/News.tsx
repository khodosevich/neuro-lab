import { Box, Card, CardContent, Typography } from '@mui/material';

const News = () => {
	const news = [
		{
			title: "Новый функционал",
			date: "22 апреля 2025",
			summary: "Добавлена модель GPT2"
		},
		{
			title: "Новый функционал",
			date: "15 апреля 2025",
			summary: "Добавлена модель перевода с английского на русский"
		},
		{
			title: "Новый функционал",
			date: "15 марта 2025",
			summary: "Добавлена поддежка темной темы"
		},
	];

	return (
		<Box sx={{ py: 8 }}>
			<Box className="container">
				<Typography variant="h3" align="center" gutterBottom>
					Новости и обновления
				</Typography>
				<Box sx={{ display: 'flex', gap: 3, mt: 4, flexWrap: 'wrap' }}>
					{news.map((item, index) => (
						<Card key={index} sx={{ minWidth: 300, flex: 1 }}>
							<CardContent>
								<Typography variant="h5">{item.title}</Typography>
								<Typography color="text.secondary" sx={{ mb: 1 }}>{item.date}</Typography>
								<Typography>{item.summary}</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default News;