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
	const dispatch = useDispatch<AppDispatch>();

	const handleClose = () => setNewModel(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setModelData({ ...modelData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			const response = await methods.model.createModel(modelData);

			dispatch(addModel(response.data.model));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: response.data.message,
					type: AlertType.SUCCESS,
				})
			);
		} catch (error: any) {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: error.response.data.error,
					type: AlertType.ERROR,
				})
			);
		} finally {
			setNewModel(false);
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

					<TextField label="Название" name="name" fullWidth onChange={handleChange} />
					<TextField label="Описание" name="description" fullWidth multiline onChange={handleChange} />
					<TextField label="Ссылка на модель" name="modelUrl" fullWidth onChange={handleChange} />
					<TextField label="Ссылка на датасет" name="datasetUrl" fullWidth onChange={handleChange} />
					<TextField label="Параметры" name="parameters" fullWidth onChange={handleChange} />

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
