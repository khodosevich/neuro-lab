import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { AppDispatch, RootState } from '../store';
import { useEffect } from 'react';
import { fetchModelsList } from '../store/slices/modelsSlice.ts';
import ModelsComments from '../components/models/ModelsComments.tsx';
import CreateModelComment from '../components/models/CreateModelComment.tsx';
import ModelDescription from '../components/models/ModelDescription.tsx';
import ModelTrainingTime from '../components/models/ModelTrainingTime.tsx';
import ModelProductive from '../components/models/ModelProductive.tsx';

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
			<ModelDescription {...model}/>
			<ModelProductive performanceData={performanceData}/>
			<ModelTrainingTime trainingTimeData={trainingTimeData}/>
			<CreateModelComment modelId={model.id.toString()} />
			<ModelsComments id={model.id} />
		</Box>
	);
};

export default ModelPage;