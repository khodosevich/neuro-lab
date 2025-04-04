import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { deleteModel, updateModel } from '../store/slices/modelsSlice.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { AlertType, ModelsData } from '../types/type.ts';
import { useDispatch } from 'react-redux';

const UpdateModelData = () => {
	const { id } = useParams();
	const [currentModel, setCurrentModel] = useState<ModelsData>({
		id: 0,
		name: '',
		description: '',
		model_url: '',
		dataset_url: '',
		parameters: [],
		created_at: '',
		updated_at: '',
	});

	const [newModelData, setNewModelData] = useState<ModelsData>({
		id: 0,
		name: '',
		description: '',
		model_url: '',
		dataset_url: '',
		parameters: [],
		created_at: '',
		updated_at: '',
	});

	useEffect(() => {
		const fetchModel = async () => {
			if (!id) return;

			try {
				const response = await methods.model.getModelById(Number(id));
				setCurrentModel(response.data);
				setNewModelData(response.data);
			}
			catch (error) {
				dispatch(
					showAlert({
						isShowAlert: true,
						message: error.response.data.error,
						type: AlertType.ERROR,
					}),
				);
			}
		};

		fetchModel();
	}, [id]);

	const dispatch = useDispatch();
	const handleDeleteModel = async () => {
		try {
			const response = await methods.model.deleteModel(Number(id));
			dispatch(deleteModel(Number(id)));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: response.data.message,
					type: AlertType.SUCCESS,
				}),
			);
		}
		catch (error) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response.data.error,
					type: AlertType.ERROR,
				}),
			);
		}
	};

	const handleUpdateModel = async () => {
		try {
			const response = await methods.model.updateModel(Number(id), newModelData);

			dispatch(updateModel(response.data.model));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Модель обновлена успешно!',
					type: AlertType.SUCCESS,
				}),
			);
		}
		catch (error) {
			setNewModelData(currentModel);
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response.data.error,
					type: AlertType.ERROR,
				}),
			);
		}
	};

	const handleInputChange = (field: keyof ModelsData, value: string) => {
		setNewModelData(prevState => ({ ...prevState, [field]: value }));
	};

	return (
		<Box className={'container'} sx={{ padding: 4 }}>
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Обновление модели: { newModelData?.name }
			</Typography>
			<Card>
				<CardContent>
					<TextField
						label="Имя модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.name || ''}
						onChange={(e) => handleInputChange('name', e.target.value)}
					/>
					<TextField
						label="Описание модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.description || ''}
						onChange={(e) => handleInputChange('description', e.target.value)}
					/>
					<TextField
						label="Путь до модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.model_url || ''}
						onChange={(e) => handleInputChange('model_url', e.target.value)}
					/>
					<TextField
						label="Датасет модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.dataset_url || ''}
						onChange={(e) => handleInputChange('dataset_url', e.target.value)}
					/>
					{/*сделать обновление параметров*/}
					<TextField
						label="Параметры модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={JSON.stringify(newModelData?.parameters, null, 2) || ''}
						onChange={(e) => {
							try {
								const parsed = JSON.parse(e.target.value);
								handleInputChange('parameters', parsed);
							}
							catch (error) {
								console.log(error);
							}
						}}
						multiline
					/>
				</CardContent>
				<CardActions sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					gap: '10px',
				}}>
					<Button variant="contained" color="success" onClick={handleUpdateModel}>
						Обновить данные
					</Button>
					<Button variant="contained" color="secondary" onClick={handleDeleteModel}>
						Удалить
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default UpdateModelData;