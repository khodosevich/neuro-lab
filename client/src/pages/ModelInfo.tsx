import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { fetchModelsList } from '../store/slices/modelsSlice.ts';

const ModelPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const { models } = useSelector((state: RootState) => state.models);

	let model;
	if (typeof id === 'string') {
		model = models.find(model => model.id === parseInt(id));
	}

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	const performanceData = [
		{ name: 'Epoch 1', accuracy: 0.75 },
		{ name: 'Epoch 2', accuracy: 0.8 },
		{ name: 'Epoch 3', accuracy: 0.86 },
		{ name: 'Epoch 4', accuracy: 0.9 },
		{ name: 'Epoch 5', accuracy: 0.99 },
	];

	const trainingTimeData = [
		{ name: 'Epoch 1', time: 30 },
		{ name: 'Epoch 2', time: 20 },
		{ name: 'Epoch 3', time: 15 },
		{ name: 'Epoch 4', time: 10 },
		{ name: 'Epoch 5', time: 5 },
	];

	if (!model) {
		return 'Модели нет';
	}

	return (
		<Box className={'container'}>
			<Typography variant="h4" gutterBottom>
				{model.name}
			</Typography>
			<Card>
				<CardContent>
					<Typography>
						<strong>Описание:</strong> {model.description}
					</Typography>
					<Typography>
						<strong>Дата создания:</strong> {new Date(model.created_at).toLocaleDateString()}
					</Typography>
					<Typography>
						<strong>Последнее обновление:</strong> {new Date(model.updated_at).toLocaleDateString()}
					</Typography>
					<Typography>
						<strong>Ссылка на датасет:</strong>
						<a href={model.dataset_url} target="_blank" rel="noopener noreferrer"> {model.dataset_url}</a>
					</Typography>
					<Typography>
						<strong>Ссылка на модель:</strong>
						<a href={model.model_url} target="_blank" rel="noopener noreferrer"> {model.model_url}</a>
					</Typography>
				</CardContent>
			</Card>

			<Typography variant="h5" style={{ marginTop: '20px' }}>
				Статистика продуктивности
			</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={performanceData}>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip/>
					<Legend/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Line type="monotone" dataKey="accuracy" stroke="#8884d8"/>
				</LineChart>
			</ResponsiveContainer>

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
		</Box>
	);
};

export default ModelPage;