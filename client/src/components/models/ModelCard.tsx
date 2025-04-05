import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { AlertType, ModelsData } from '../../types/type.ts';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { methods } from '../../api/methods.ts';
import { deleteModel } from '../../store/slices/modelsSlice.ts';
import { showAlert } from '../../store/slices/alertSlice.ts';

const ModelCard = ({ model }: { model: ModelsData }) => {
	const isAdmin = useSelector((state: RootState) => state.user?.user?.role) === 'admin';
	const dispatch = useDispatch();

	const handleDeleteModel = async () => {
		try {
			const response = await methods.model.deleteModel(model?.id);
			dispatch(deleteModel(model?.id));

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

	const navigate = useNavigate();
	const handleUpdateModel = () => {
		navigate(`/update-model/${model.id}`);
	};

	return (
		<Card sx={{
			minWidth: 345, maxWidth: 345, height: '100%',
			display: 'flex', flexDirection: 'column',
		}}
		>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{model.name}
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>
					{model.description}
				</Typography>
			</CardContent>
			<CardActions sx={{ flexGrow: 1, alignItems: 'end' }}>
				{
					isAdmin
					? <>
						<Button variant="contained" color="success" onClick={handleUpdateModel}>
							Обновить
						</Button>
						<Button variant="contained" color="secondary" onClick={handleDeleteModel}>
							Удалить
						</Button>
					</>
					: <>
						<Button component={Link}
						        to={`/chat/${model.id}`}
						        size="small"
						        variant="contained"
						        color="primary">
							Попробовать
						</Button>
						<Button component={Link}
						        to={`/models/${model.id}`}
						        size="small"
						        variant="contained"
						        color="primary">
							Подробнее
						</Button>
					</>
				}
			</CardActions>
		</Card>
	);
};

export default ModelCard;