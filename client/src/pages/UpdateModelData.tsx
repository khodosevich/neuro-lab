import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		model_url: '',
		dataset_url: '',
		parameters: ''
	});

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchModel = async () => {
			if (!id) return;

			try {
				const response = await methods.model.getModelById(Number(id));
				setCurrentModel(response.data);
				setNewModelData(response.data);
			} catch (error: any) {
				dispatch(
					showAlert({
						isShowAlert: true,
						message: error.response?.data?.error || 'Ошибка загрузки модели',
						type: AlertType.ERROR,
					}),
				);
			}
		};

		fetchModel();
	}, [id, dispatch]);

	const navigate = useNavigate();

	const validateFields = () => {
		let isValid = true;
		const newErrors = {
			name: '',
			description: '',
			model_url: '',
			dataset_url: '',
			parameters: ''
		};

		if (!newModelData.name.trim()) {
			newErrors.name = 'Название модели обязательно';
			isValid = false;
		} else if (newModelData.name.length < 3) {
			newErrors.name = 'Название должно быть не менее 3 символов';
			isValid = false;
		}

		if (!newModelData.description.trim()) {
			newErrors.description = 'Описание модели обязательно';
			isValid = false;
		} else if (newModelData.description.length < 10) {
			newErrors.description = 'Описание должно быть не менее 10 символов';
			isValid = false;
		}

		if (!newModelData.model_url.trim()) {
			newErrors.model_url = 'URL модели обязателен';
			isValid = false;
		} else if (!/^https?:\/\/.+/i.test(newModelData.model_url)) {
			newErrors.model_url = 'URL должен начинаться с http:// или https://';
			isValid = false;
		}

		if (!newModelData.dataset_url.trim()) {
			newErrors.dataset_url = 'URL датасета обязателен';
			isValid = false;
		} else if (!/^https?:\/\/.+/i.test(newModelData.dataset_url)) {
			newErrors.dataset_url = 'URL должен начинаться с http:// или https://';
			isValid = false;
		}

		try {
			JSON.parse(JSON.stringify(newModelData.parameters));
		} catch (e) {
			newErrors.parameters = 'Некорректный формат параметров';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleDeleteModel = async () => {
		try {
			const response = await methods.model.deleteModel(Number(id));
			dispatch(deleteModel(Number(id)));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: response.data.message || 'Модель успешно удалена',
					type: AlertType.SUCCESS,
				}),
			);

			navigate('/models');
		} catch (error: any) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response?.data?.error || 'Ошибка при удалении модели',
					type: AlertType.ERROR,
				}),
			);
		}
	};

	const handleUpdateModel = async () => {
		if (!validateFields()) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Пожалуйста, исправьте ошибки в форме',
					type: AlertType.ERROR,
				}),
			);
			return;
		}

		try {
			const response = await methods.model.updateModel(Number(id), {
				...newModelData,
				name: newModelData.name.trim(),
				description: newModelData.description.trim(),
				model_url: newModelData.model_url.trim(),
				dataset_url: newModelData.dataset_url.trim()
			});

			dispatch(updateModel(response.data.model));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Модель успешно обновлена!',
					type: AlertType.SUCCESS,
				}),
			);
		} catch (error: any) {
			setNewModelData(currentModel);
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response?.data?.error || 'Ошибка при обновлении модели',
					type: AlertType.ERROR,
				}),
			);
		}
	};

	const handleInputChange = (field: keyof ModelsData, value: string | object) => {
		setNewModelData(prevState => ({ ...prevState, [field]: value }));
		setErrors(prev => ({ ...prev, [field]: '' }));
	};

	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<Box className={'container'} sx={{ padding: 4 }}>
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Обновление модели: {newModelData?.name}
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
						error={!!errors.name}
						helperText={errors.name}
						required
					/>
					<TextField
						label="Описание модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.description || ''}
						onChange={(e) => handleInputChange('description', e.target.value)}
						error={!!errors.description}
						helperText={errors.description}
						required
						multiline
						rows={4}
					/>
					<TextField
						label="Путь до модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.model_url || ''}
						onChange={(e) => handleInputChange('model_url', e.target.value)}
						error={!!errors.model_url}
						helperText={errors.model_url}
						required
					/>
					<TextField
						label="Датасет модели"
						variant="outlined"
						fullWidth
						margin="normal"
						value={newModelData?.dataset_url || ''}
						onChange={(e) => handleInputChange('dataset_url', e.target.value)}
						error={!!errors.dataset_url}
						helperText={errors.dataset_url}
						required
					/>
					<TextField
						label="Параметры модели (JSON)"
						variant="outlined"
						fullWidth
						margin="normal"
						value={JSON.stringify(newModelData?.parameters, null, 2) || ''}
						onChange={(e) => {
							try {
								const parsed = JSON.parse(e.target.value);
								handleInputChange('parameters', parsed);
								setErrors(prev => ({ ...prev, parameters: '' }));
							} catch (error) {
								setErrors(prev => ({ ...prev, parameters: 'Некорректный JSON' }));
							}
						}}
						error={!!errors.parameters}
						helperText={errors.parameters || 'Введите валидный JSON'}
						multiline
						rows={6}
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
					<Button variant="contained" color="info" onClick={handleCancel}>
						Отменить
					</Button>
					<Button variant="contained" color="error" onClick={handleDeleteModel}>
						Удалить
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default UpdateModelData;