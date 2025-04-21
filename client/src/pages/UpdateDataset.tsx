import { Box, Button, TextField, Typography, useTheme, Paper, Divider, Avatar, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { deleteDataset, updateDataset } from '../store/slices/datasetsSlice.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { AlertType, DatasetsType } from '../types/type.ts';
import { useDispatch } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import DatasetIcon from '@mui/icons-material/Dataset';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';
import NumbersIcon from '@mui/icons-material/Numbers';

const UpdateDataset = () => {
	const { id } = useParams();
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [currentDataset, setCurrentDataset] = useState<DatasetsType>({
		id: 0,
		name: '',
		description: '',
		data_url: '',
		model_id: 0,
		created_at: '',
		updated_at: '',
	});

	const [newDatasetData, setNewDatasetData] = useState<DatasetsType>({
		id: 0,
		name: '',
		description: '',
		data_url: '',
		model_id: 0,
		created_at: '',
		updated_at: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		dataset_url: '',
		model_id: '',
	});

	useEffect(() => {
		const fetchDataset = async () => {
			if (!id) return;

			try {
				const response = await methods.datasets.getDatasetById(Number(id));
				setCurrentDataset(response.data);
				setNewDatasetData(response.data);
			}
			catch (error: any) {
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
	}, [id, dispatch]);

	const validateFields = () => {
		let isValid = true;
		const newErrors = {
			name: '',
			description: '',
			dataset_url: '',
			model_id: '',
		};

		if (!newDatasetData.name.trim()) {
			newErrors.name = 'Название обязательно';
			isValid = false;
		}

		if (!newDatasetData.description.trim()) {
			newErrors.description = 'Описание обязательно';
			isValid = false;
		}

		if (!newDatasetData.data_url.trim()) {
			newErrors.dataset_url = 'Ссылка обязательна';
			isValid = false;
		} else if (!/^https?:\/\/.+/i.test(newDatasetData.data_url)) {
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
		}
		catch (error: any) {
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
		}
		catch (error: any) {
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
		<Box sx={{
			maxWidth: 1200,
			margin: '0 auto',
			p: { xs: 2, md: 4 },
		}}>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				mb: 4,
				gap: 2,
			}}>
				<Avatar sx={{
					bgcolor: theme.palette.secondary.main,
					width: 56,
					height: 56,
				}}>
					<DatasetIcon fontSize="large"/>
				</Avatar>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 600 }}>
						Редактирование датасета
					</Typography>
					<Typography variant="body1" color="text.secondary">
						ID: {newDatasetData?.id} | Последнее обновление:{new Date(newDatasetData?.updated_at).toLocaleDateString()}
					</Typography>
				</Box>
			</Box>

			<Paper sx={{
				p: { xs: 2, md: 4 },
				borderRadius: 4,
				boxShadow: theme.shadows[2],
			}}>
				<Grid container spacing={4}>
					{/* Основная информация */}
					<Grid item xs={12} md={6}>
						<Box sx={{ mb: 4 }}>
							<Typography variant="h6" sx={{
								mb: 2,
								display: 'flex',
								alignItems: 'center',
								gap: 1,
							}}>
								<DescriptionIcon color="secondary"/> Описание датасета
							</Typography>

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
								sx={{ mb: 3 }}
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
								rows={4}
							/>
						</Box>
					</Grid>

					{/* Ссылки и ID модели */}
					<Grid item xs={12} md={6}>
						<Box sx={{ mb: 4 }}>
							<Typography variant="h6" sx={{
								mb: 2,
								display: 'flex',
								alignItems: 'center',
								gap: 1,
							}}>
								<LinkIcon color="secondary"/> Ссылки и привязки
							</Typography>

							<TextField
								label="URL датасета"
								variant="outlined"
								fullWidth
								margin="normal"
								value={newDatasetData?.data_url || ''}
								onChange={(e) => handleInputChange('data_url', e.target.value)}
								error={!!errors.dataset_url}
								helperText={errors.dataset_url}
								required
								sx={{ mb: 3 }}
							/>

							<TextField
								label="ID связанной модели"
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
								InputProps={{
									startAdornment: (
										<NumbersIcon sx={{
											color: theme.palette.action.active,
											mr: 1,
										}}/>
									),
								}}
							/>
						</Box>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }}/>

				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					gap: 2,
				}}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon/>}
						onClick={handleUpdateDataset}
						sx={{ minWidth: 200 }}
					>
						Сохранить изменения
					</Button>

					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button
							variant="outlined"
							startIcon={<CancelIcon/>}
							onClick={handleCancel}
						>
							Отменить
						</Button>

						<Button
							variant="outlined"
							color="error"
							startIcon={<DeleteIcon/>}
							onClick={handleDeleteDataset}
						>
							Удалить датасет
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default UpdateDataset;