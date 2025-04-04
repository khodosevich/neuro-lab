import React from 'react';
import { Typography } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ModelTrainingTimeType } from '../../types/type.ts';

const ModelTrainingTime = ({ trainingTimeData }: { trainingTimeData: ModelTrainingTimeType[] }) => {
	return (
		<>
			<Typography variant="h5" style={{ marginTop: '20px' }}>
				Время обучения
			</Typography>

			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={trainingTimeData}>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip/>
					<Legend/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Line type="monotone" dataKey="time" stroke="#82ca9d"/>
				</LineChart>
			</ResponsiveContainer>
		</>
	);
};

export default ModelTrainingTime;