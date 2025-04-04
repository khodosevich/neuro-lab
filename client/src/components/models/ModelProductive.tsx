import { Typography } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PerformanceDataType } from '../../types/type.ts';

const ModelProductive = ({ performanceData }: { performanceData: PerformanceDataType[] }) => {

	return (
		<>
			<Typography variant="h5" style={{ marginTop: '20px' }}>
				Статистика продуктивности
			</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={performanceData}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<CartesianGrid strokeDasharray="3 3" />
					<Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
};

export default ModelProductive;
