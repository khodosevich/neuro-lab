import { Box, Typography, TextField, Button } from '@mui/material';
import { Modal } from '@mui/base';
import { Dispatch, SetStateAction, useState } from 'react';
import { AlertType, NewModelData } from '../../types/type.ts';
import { methods } from '../../api/methods.ts';
import { showAlert } from '../../store/slices/alertSlice.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addModel } from '../../store/slices/modelsSlice.ts';

const CreateNewModel = ({ newModel, setNewModel }: {
	newModel: boolean,
	setNewModel: Dispatch<SetStateAction<boolean>>,
}) => {
	const [modelData, setModelData] = useState<NewModelData>({
		name: '',
		description: '',
		modelUrl: '',
		datasetUrl: '',
		parameters: {}
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		modelUrl: '',
		datasetUrl: '',
	});

	const dispatch = useDispatch<AppDispatch>();

	const handleClose = () => {
		setNewModel(false);
		setErrors({
			name: '',
			description: '',
			modelUrl: '',
			datasetUrl: '',
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setModelData({ ...modelData, [e.target.name]: e.target.value });
		setErrors(prev => ({ ...prev, [e.target.name]: '' }));
	};

	const validateFields = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (!modelData.name.trim()) {
			newErrors.name = 'Название модели обязательно';
			isValid = false;
		}

		if (!modelData.description.trim()) {
			newErrors.description = 'Описание модели обязательно';
			isValid = false;
		}

		if (!modelData.modelUrl.trim()) {
			newErrors.modelUrl = 'Ссылка на модель обязательна';
			isValid = false;
		}
		// else if (!/^https?:\/\/.+/i.test(modelData.modelUrl)) {
		// 	newErrors.modelUrl = 'Некорректный URL (должен начинаться с http/https)';
		// 	isValid = false;
		// }

		if (!modelData.datasetUrl.trim()) {
			newErrors.datasetUrl = 'Ссылка на датасет обязательна';
			isValid = false;
		} else if (!/^https?:\/\/.+/i.test(modelData.datasetUrl)) {
			newErrors.datasetUrl = 'Некорректный URL (должен начинаться с http/https)';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async () => {
		if (!validateFields()) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Пожалуйста, заполните все поля корректно',
					type: AlertType.ERROR,
				})
			);
			return;
		}

		try {
			const response = await methods.model.createModel({
				...modelData,
				name: modelData.name.trim(),
				description: modelData.description.trim(),
				modelUrl: modelData.modelUrl.trim(),
				datasetUrl: modelData.datasetUrl.trim()
			});

			dispatch(addModel(response.data.model));
			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Модель успешно создана',
					type: AlertType.SUCCESS,
				})
			);
			handleClose();
		} catch (error: any) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response?.data?.error || 'Ошибка при создании модели',
					type: AlertType.ERROR,
				})
			);
		}
	};

	return (
		<Modal open={newModel} onClose={handleClose}>
			<Box sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				bgcolor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Box sx={{
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 2
				}}>
					<Typography variant="h6">Создать новую модель</Typography>

					<TextField
						label="Название"
						name="name"
						fullWidth
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
						required
					/>
					<TextField
						label="Описание"
						name="description"
						fullWidth
						multiline
						rows={3}
						onChange={handleChange}
						error={!!errors.description}
						helperText={errors.description}
						required
					/>
					<TextField
						label="Ссылка на модель"
						name="modelUrl"
						fullWidth
						onChange={handleChange}
						error={!!errors.modelUrl}
						helperText={errors.modelUrl}
						required
					/>
					<TextField
						label="Ссылка на датасет"
						name="datasetUrl"
						fullWidth
						onChange={handleChange}
						error={!!errors.datasetUrl}
						helperText={errors.datasetUrl}
						required
					/>
					<TextField
						label="Параметры (JSON)"
						name="parameters"
						fullWidth
						onChange={handleChange}
						multiline
						rows={3}
					/>

					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
						<Button onClick={handleClose} variant="outlined">Отмена</Button>
						<Button onClick={handleSubmit} variant="contained">Создать</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default CreateNewModel;