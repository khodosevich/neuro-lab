import { Box, Button, TextField, Typography, useTheme, Paper, Divider, Avatar, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { deleteModel, updateModel } from '../store/slices/modelsSlice.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { AlertType, ModelsData } from '../types/type.ts';
import { useDispatch } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';

const UpdateModelData = () => {
	const { id } = useParams();
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		}
		// else if (!/^https?:\/\/.+/i.test(newModelData.model_url)) {
		// 	newErrors.model_url = 'URL должен начинаться с http:// или https://';
		// 	isValid = false;
		// }

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

			console.log(response);

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
		<Box sx={{
			maxWidth: 1200,
			margin: '0 auto',
			p: { xs: 2, md: 4 }
		}}>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				mb: 4,
				gap: 2
			}}>
				<Avatar sx={{
					bgcolor: theme.palette.primary.main,
					width: 56,
					height: 56
				}}>
					<PsychologyIcon fontSize="large" />
				</Avatar>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 600 }}>
						Редактирование модели
					</Typography>
					<Typography variant="body1" color="text.secondary">
						ID: {newModelData?.id} | Последнее обновление: {new Date(newModelData?.updated_at).toLocaleDateString()}
					</Typography>
				</Box>
			</Box>

			<Paper sx={{
				p: { xs: 2, md: 4 },
				borderRadius: 4,
				boxShadow: theme.shadows[2]
			}}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box sx={{ mb: 4 }}>
							<Typography variant="h6" sx={{
								mb: 2,
								display: 'flex',
								alignItems: 'center',
								gap: 1
							}}>
								<DescriptionIcon color="primary" /> Основная информация
							</Typography>

							<TextField
								label="Название модели"
								variant="outlined"
								fullWidth
								margin="normal"
								value={newModelData?.name || ''}
								onChange={(e) => handleInputChange('name', e.target.value)}
								error={!!errors.name}
								helperText={errors.name}
								required
								sx={{ mb: 3 }}
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
						</Box>
					</Grid>

					<Grid item xs={12} md={6}>
						<Box sx={{ mb: 4 }}>
							<Typography variant="h6" sx={{
								mb: 2,
								display: 'flex',
								alignItems: 'center',
								gap: 1
							}}>
								<LinkIcon color="primary" /> Ссылки и параметры
							</Typography>

							<TextField
								label="URL модели"
								variant="outlined"
								fullWidth
								margin="normal"
								value={newModelData?.model_url || ''}
								onChange={(e) => handleInputChange('model_url', e.target.value)}
								error={!!errors.model_url}
								helperText={errors.model_url}
								required
								sx={{ mb: 3 }}
							/>

							<TextField
								label="URL датасета"
								variant="outlined"
								fullWidth
								margin="normal"
								value={newModelData?.dataset_url || ''}
								onChange={(e) => handleInputChange('dataset_url', e.target.value)}
								error={!!errors.dataset_url}
								helperText={errors.dataset_url}
								required
								sx={{ mb: 3 }}
							/>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Box>
							<Typography variant="h6" sx={{
								mb: 2,
								display: 'flex',
								alignItems: 'center',
								gap: 1
							}}>
								<CodeIcon color="primary" /> Параметры модели (JSON)
							</Typography>

							<TextField
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
								rows={8}
								sx={{
									'& textarea': {
										fontFamily: 'monospace',
										fontSize: '0.875rem'
									}
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }} />

				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					gap: 2
				}}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
						onClick={handleUpdateModel}
						sx={{ minWidth: 200 }}
					>
						Сохранить изменения
					</Button>

					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button
							variant="outlined"
							startIcon={<CancelIcon />}
							onClick={handleCancel}
						>
							Отменить
						</Button>

						<Button
							variant="outlined"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={handleDeleteModel}
						>
							Удалить модель
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default UpdateModelData;