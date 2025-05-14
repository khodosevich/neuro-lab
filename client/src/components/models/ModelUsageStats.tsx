import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const ModelUsageStats = ({ data, title }: { title: string, data: []}) => {
	return (
		<Paper elevation={0} sx={{ p: 4, mb: 4 }}>
			<Typography variant="h5" gutterBottom>
				{ title }
			</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="request_count" fill="#8884d8" name="Количество запросов" />
					<Bar dataKey="success_count" fill="#82ca9d" name="Успешные" />
					<Bar dataKey="error_count" fill="#ff8042" name="Ошибки" />
				</BarChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default ModelUsageStats;