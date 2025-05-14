import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';
import { fetchModelsList } from '../store/slices/modelsSlice.ts';
import ModelsComments from '../components/models/ModelsComments.tsx';
import CreateModelComment from '../components/models/CreateModelComment.tsx';
import ModelDescription from '../components/models/ModelDescription.tsx';
import ModelTrainingTime from '../components/models/ModelTrainingTime.tsx';
import ModelProductive from '../components/models/ModelProductive.tsx';
import { methods } from '../api/methods.ts';
import ModelUsageStats from '../components/models/ModelUsageStats.tsx';

const ModelPage = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { models, loading } = useSelector((state: RootState) => state.models);
	const [stats, setStats] = useState<any>(null);
	const [statsLoading, setStatsLoading] = useState(true);
	const model = models.find(m => id && m.id === parseInt(id));

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	useEffect(() => {
		const loadStats = async () => {
			if (!id) return;
			setStatsLoading(true);
			try {
				const response = await methods.model.modelMetrics(parseInt(id));
				setStats(response.data);
			} catch (error) {
				console.error('Failed to load stats:', error);
			} finally {
				setStatsLoading(false);
			}
		};

		loadStats();
	}, [id]);

	if (loading || !model) {
		return (
			<Box display="flex" justifyContent="center" mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	const chartData = stats?.map((item: any, index: number) => ({
		name: `Window ${index + 1}`,
		time: item.avg_response_time / 1000,
		accuracy: item.success_count / (item.success_count + item.error_count),
		...item
	})) || [];

	return (
		<Box className="container" sx={{ py: 4 }}>
			<ModelDescription {...model} />
			<Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
				Статистика производительности
			</Typography>
			{statsLoading ? (
				<Box display="flex" justifyContent="center" py={4}>
					<CircularProgress />
				</Box>
			) : (
				 <>
					 <ModelUsageStats
						 data={chartData}
						 title="Использование модели"
					 />
					 <ModelProductive
						 performanceData={chartData}
						 title="Точность модели"
					 />
					 <ModelTrainingTime
						 trainingTimeData={chartData}
						 onRefresh={() => {
							 setStatsLoading(true);
							 methods.model.modelMetrics(parseInt(id!)).then(res => {
								 setStats(res.data);
								 setStatsLoading(false);
							 });
						 }}
						 title="Время ответа"
					 />
				 </>
			 )}
			<Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
				Обсуждение модели
			</Typography>
			<CreateModelComment modelId={id!} />
			<ModelsComments id={parseInt(id!)} />
		</Box>
	);
};

export default ModelPage;