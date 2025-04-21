import { Box, Button, TextField } from '@mui/material';
import { Modal } from '@mui/base';
import { Dispatch, SetStateAction, useState } from 'react';
import { AlertType, NewDatasetType } from '../../types/type.ts';
import { methods } from '../../api/methods.ts';
import { useDispatch } from 'react-redux';
import { addDataset } from '../../store/slices/datasetsSlice.ts';
import { showAlert } from '../../store/slices/alertSlice.ts';

const CreateNewDataset = ({ newDataset, setNewDataset }: { newDataset: boolean, setNewDataset: Dispatch<SetStateAction<boolean>> }) => {
	const [datasetData, setDatasetData] = useState<NewDatasetType>({
		name: '',
		description: '',
		data_url: '',
		model_id: 0,
	});

	const handleClose = () => {
		setNewDataset(false);
		setDatasetData({
			name: '',
			description: '',
			data_url: '',
			model_id: 0,
		});
		setErrors({
			name: '',
			description: '',
			data_url: '',
			model_id: '',
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.name);
		setDatasetData({ ...datasetData, [e.target.name]: e.target.value });
		setErrors(prev => ({ ...prev, [e.target.name]: '' }));
	};

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		data_url: '',
		model_id: '',
	});

	const dispatch = useDispatch();

	const validateFields = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (!datasetData.name.trim()) {
			newErrors.name = 'Название не может быть пустым';
			isValid = false;
		}

		if (!datasetData.description.trim()) {
			newErrors.description = 'Описание не может быть пустым';
			isValid = false;
		}

		if (!datasetData.data_url.trim()) {
			newErrors.data_url = 'Ссылка не может быть пустой';
			isValid = false;
		} else if (!/^https?:\/\/.+/i.test(datasetData.data_url)) {
			newErrors.data_url = 'Введите корректную ссылку (начинается с http/https)';
			isValid = false;
		}

		if (datasetData.model_id <= 0) {
			newErrors.model_id = 'ID модели должно быть положительным числом';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async () => {
		if (!validateFields()) {
			dispatch(showAlert({
				isShowAlert: true,
				message: 'Пожалуйста, заполните все поля корректно',
				type: AlertType.ERROR
			}));
			return;
		}

		try {
			const response = await methods.datasets.createDataset({
				...datasetData,
				name: datasetData.name.trim(),
				description: datasetData.description.trim(),
				data_url: datasetData.data_url.trim()
			});

			dispatch(addDataset(response.data));
			dispatch(showAlert({
				isShowAlert: true,
				message: 'Датасет успешно создан',
				type: AlertType.SUCCESS
			}));
			handleClose();
		} catch {
			dispatch(showAlert({
				isShowAlert: true,
				message: 'Ошибка при создании датасета',
				type: AlertType.ERROR
			}));
		}
	};

	return (
		<Modal open={newDataset} onClose={handleClose}>
			<Box sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				bgcolor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<Box sx={{
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}>
					<TextField
						label="Название датасета"
						name="name"
						value={datasetData.name}
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
						required
					/>
					<TextField
						label="Описание датасета"
						name="description"
						value={datasetData.description}
						onChange={handleChange}
						error={!!errors.description}
						helperText={errors.description}
						required
						multiline
						rows={3}
					/>
					<TextField
						label="Ссылка на датасет"
						name="data_url"
						value={datasetData.data_url}
						onChange={handleChange}
						error={!!errors.data_url}
						helperText={errors.data_url}
						required
					/>
					<TextField
						label="Номер модели для датасета"
						name="model_id"
						type="number"
						value={datasetData.model_id || ''}
						onChange={handleChange}
						error={!!errors.model_id}
						helperText={errors.model_id}
						required
						inputProps={{ min: 1 }}
					/>

					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
						<Button variant="outlined" onClick={handleClose}>
							Отменить
						</Button>
						<Button variant="contained" onClick={handleSubmit}>
							Создать
						</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default CreateNewDataset;