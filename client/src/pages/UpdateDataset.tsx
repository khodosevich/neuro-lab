import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { deleteDataset, updateDataset } from '../store/slices/datasetsSlice.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { AlertType, DatasetsType } from '../types/type.ts';
import { useDispatch } from 'react-redux';

const UpdateDataset = () => {
	const { id } = useParams();
	const [currentDataset, setCurrentDataset] = useState<DatasetsType>({
		id: 0,
		name: '',
		description: '',
		dataset_url: '',
		model_id: 0,
		created_at: '',
		updated_at: ''
	});

	const [newDatasetData, setNewDatasetData] = useState<DatasetsType>({
		id: 0,
		name: '',
		description: '',
		dataset_url: '',
		model_id: 0,
		created_at: '',
		updated_at: ''
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		dataset_url: '',
		model_id: ''
	});

	useEffect(() => {
		const fetchDataset = async () => {
			if (!id) return;

			try {
				const response = await methods.datasets.getDatasetById(Number(id));
				setCurrentDataset(response.data);
				setNewDatasetData(response.data);
			} catch (error: any) {
				dispatch(
					showAlert({
						isShowAlert: true,
						message: error.response?.data?.error || 'Ошибка при загрузке датасета',
						type: AlertType.ERROR,
					}),
				);
			}
		};

		fetchDataset();
	}, [id]);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const validateFields = () => {
		let isValid = true;
		const newErrors = {
			name: '',
			description: '',
			dataset_url: '',
			model_id: ''
		};

		if (!newDatasetData.name.trim()) {
			newErrors.name = 'Название обязательно';
			isValid = false;
		}

		if (!newDatasetData.description.trim()) {
			newErrors.description = 'Описание обязательно';
			isValid = false;
		}

		if (!newDatasetData.dataset_url.trim()) {
			newErrors.dataset_url = 'Ссылка обязательна';
			isValid = false;
		} else if (!/^https?:\/\/.+/i.test(newDatasetData.dataset_url)) {
			newErrors.dataset_url = 'Некорректный URL (должен начинаться с http/https)';
			isValid = false;
		}

		if (newDatasetData.model_id <= 0) {
			newErrors.model_id = 'ID модели должно быть положительным числом';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleDeleteDataset = async () => {
		try {
			const response = await methods.datasets.deleteDataset(Number(id));
			dispatch(deleteDataset(Number(id)));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: response.data.message || 'Датасет успешно удален',
					type: AlertType.SUCCESS,
				}),
			);

			navigate('/datasets');
		} catch (error: any) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response?.data?.error || 'Ошибка при удалении датасета',
					type: AlertType.ERROR,
				}),
			);
		}
	};

	const handleUpdateDataset = async () => {
		if (!validateFields()) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Пожалуйста, заполните все поля корректно',
					type: AlertType.ERROR,
				}),
			);
			return;
		}

		try {
			const response = await methods.datasets.updateDataset(newDatasetData);

			dispatch(updateDataset(response.data));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Датасет обновлен успешно!',
					type: AlertType.SUCCESS,
				}),
			);
		} catch (error: any) {
			setNewDatasetData(currentDataset);
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response?.data?.error || 'Ошибка при обновлении датасета',
					type: AlertType.ERROR,
				}),
			);
		}
	};

	const handleInputChange = (field: keyof DatasetsType, value: string | number) => {
		setNewDatasetData(prevState => ({ ...prevState, [field]: value }));
		setErrors(prev => ({ ...prev, [field]: '' }));
	};

	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<Box className={'container'} sx={{ padding: 4 }}>
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Обновление датасета: {newDatasetData?.name}
			</Typography>
			<Card>
				<CardContent>
					<TextField
						label="Название датасета"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newDatasetData?.name || ''}
						onChange={(e) => handleInputChange('name', e.target.value)}
						error={!!errors.name}
						helperText={errors.name}
						required
					/>
					<TextField
						label="Описание датасета"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newDatasetData?.description || ''}
						onChange={(e) => handleInputChange('description', e.target.value)}
						error={!!errors.description}
						helperText={errors.description}
						required
						multiline
						rows={3}
					/>
					<TextField
						label="Ссылка на датасет"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newDatasetData?.dataset_url || ''}
						onChange={(e) => handleInputChange('dataset_url', e.target.value)}
						error={!!errors.dataset_url}
						helperText={errors.dataset_url}
						required
					/>
					<TextField
						label="ID модели"
						variant="outlined"
						fullWidth
						margin="normal"
						type="number"
						value={newDatasetData?.model_id || 0}
						onChange={(e) => handleInputChange('model_id', Number(e.target.value))}
						error={!!errors.model_id}
						helperText={errors.model_id}
						required
						inputProps={{ min: 1 }}
					/>
				</CardContent>
				<CardActions sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					gap: '10px',
				}}>
					<Button variant="contained" color="success" onClick={handleUpdateDataset}>
						Обновить данные
					</Button>
					<Button variant="contained" color="info" onClick={handleCancel}>
						Отменить
					</Button>
					<Button variant="contained" color="error" onClick={handleDeleteDataset}>
						Удалить
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default UpdateDataset;