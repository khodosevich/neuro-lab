import { Box, Button, Card, CardActions, CardContent, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { methods } from '../../api/methods.ts';
import { deleteModel } from '../../store/slices/modelsSlice.ts';
import { showAlert } from '../../store/slices/alertSlice.ts';
import ScienceIcon from '@mui/icons-material/Science';
import InfoIcon from '@mui/icons-material/Info';
import { AlertType, ModelsData } from '../../types/type.ts';

const ModelCard = ({ model }: { model: ModelsData }) => {
	const theme = useTheme();
	const isAdmin = useSelector((state: RootState) => state.user?.user?.role) === 'admin';
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		} catch {
			dispatch(
				showAlert({
					isShowAlert: true,
					message: 'Не удалось удалить модель',
					type: AlertType.ERROR,
				}),
			);
		}
	};

	return (
		<Card sx={{
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			borderRadius: 3,
			overflow: 'hidden',
			boxShadow: theme.shadows[2],
			transition: 'all 0.3s ease',
			'&:hover': {
				boxShadow: theme.shadows[6],
			}
		}}>
			<CardContent sx={{ flexGrow: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
					<ScienceIcon color="primary" sx={{ mr: 1 }} />
					<Typography
						variant="h6"
						component="div"
						sx={{
							fontWeight: 600,
							color: theme.palette.text.primary,
						}}
					>
						{model.name}
					</Typography>
				</Box>

				<Typography
					variant="body2"
					sx={{
						color: theme.palette.text.secondary,
						mb: 2,
					}}
				>
					{model.description || 'Описание отсутствует'}
				</Typography>
			</CardContent>

			<CardActions sx={{
				justifyContent: isAdmin ? 'space-between' : 'center',
				bgcolor: theme.palette.background.paper,
				flexGrow: 1, alignItems: 'end'
			}}>
				{isAdmin ? (
					<>
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={() => navigate(`/update-model/${model.id}`)}
							sx={{ borderRadius: 2 }}
						>
							Редактировать
						</Button>
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={handleDeleteModel}
							sx={{ borderRadius: 2 }}
						>
							Удалить
						</Button>
					</>
				) : (
					 <>
						 <Button
							 component={Link}
							 to={`/chat/${model.id}`}
							 variant="contained"
							 color="primary"
							 size="small"
							 startIcon={<ScienceIcon />}
							 sx={{ borderRadius: 2 }}
						 >
							 Тестировать
						 </Button>
						 <Button
							 component={Link}
							 to={`/models/${model.id}`}
							 variant="outlined"
							 color="primary"
							 size="small"
							 startIcon={<InfoIcon />}
							 sx={{ borderRadius: 2 }}
						 >
							 Подробнее
						 </Button>
					 </>
				 )}
			</CardActions>
		</Card>
	);
};

export default ModelCard;