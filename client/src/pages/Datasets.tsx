import { Box, Grid, Card, CardContent, Typography, CardActions, Button, Chip, Avatar, CardMedia, useTheme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { deleteDataset, setDatasets } from '../store/slices/datasetsSlice.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { AlertType } from '../types/type.ts';
import AddIcon from '@mui/icons-material/Add';
import CreateNewDataset from '../components/datasets/CreateNewDataset.tsx';
import DatasetIcon from '@mui/icons-material/Dataset';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Datasets = () => {
	const { datasets } = useSelector((state: RootState) => state.datasets);
	const dispatch = useDispatch();
	const isAdmin = useSelector((state: RootState) => state.user?.user?.role) === 'admin';
	const theme = useTheme();

	useEffect(() => {
		const load = async () => {
			try {
				const response = await methods.datasets.getDatasets();
				dispatch(setDatasets(response.data));
			} catch {
				dispatch(showAlert({ isShowAlert: true, message: 'Ошибка сервера', type: AlertType.ERROR }));
			}
		};
		load();
	}, []);

	const [newDataset, setNewDataset] = useState(false);
	const navigate = useNavigate();
	const handleUpdateDataset = (id: number) => {
		navigate(`/update-dataset/${id}`);
	};

	const handleDeleteDataset = async (id: number) => {
		try {
			await methods.datasets.deleteDataset(id);
			dispatch(deleteDataset(id));
			dispatch(showAlert({
				isShowAlert: true,
				message: 'Датасет удален успешно',
				type: AlertType.SUCCESS
			}));
		} catch {
			dispatch(showAlert({
				isShowAlert: true,
				message: 'Ошибка при удалении датасета',
				type: AlertType.ERROR
			}));
		}
	};

	return (
		<Box className="container" sx={{
			paddingBlock: 5,
			maxWidth: '1400px',
			margin: '0 auto'
		}}>
			<Typography variant="h4" sx={{
				marginBottom: 4,
				textAlign: 'center',
				fontWeight: '600',
				color: theme.palette.text.primary
			}}>
				Список датасетов
			</Typography>

			<Grid container spacing={3} sx={{ justifyContent: 'center' }}>
				{datasets.map((dataset) => (
					<Grid item key={dataset.id} xs={12} sm={6} md={4} lg={3}>
						<Card sx={{
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							borderRadius: '12px',
							boxShadow: theme.shadows[3],
							transition: 'transform 0.2s, box-shadow 0.2s',
							'&:hover': {
								transform: 'translateY(-4px)',
								boxShadow: theme.shadows[6]
							}
						}}>
							<CardMedia
								component="div"
								sx={{
									height: 140,
									backgroundColor: theme.palette.primary.light,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: theme.palette.primary.contrastText
								}}
							>
								<DatasetIcon sx={{ fontSize: 60 }} />
							</CardMedia>

							<CardContent sx={{ flexGrow: 1 }}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
									<Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
										{dataset.name}
									</Typography>
									<Chip
										label={`ID: ${dataset.id}`}
										size="small"
										variant="outlined"
									/>
								</Box>

								<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
									{dataset.description || 'Описание отсутствует'}
								</Typography>

								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
									<Chip
										icon={<CalendarTodayIcon fontSize="small" />}
										label={new Date(dataset.created_at).toLocaleDateString()}
										size="small"
										variant="outlined"
									/>
									<Chip
										icon={<AccessTimeIcon fontSize="small" />}
										label={`Обновлен: ${new Date(dataset.updated_at).toLocaleDateString()}`}
										size="small"
										variant="outlined"
									/>
								</Box>
							</CardContent>

							<CardActions sx={{
								justifyContent: 'space-between',
								padding: '16px',
								borderTop: `1px solid ${theme.palette.divider}`
							}}>
								{isAdmin ? (
									<>
										<Button
											variant="outlined"
											color="primary"
											size="small"
											onClick={() => handleUpdateDataset(dataset.id)}
											sx={{ flex: 1 }}
										>
											Редактировать
										</Button>
										<Button
											variant="outlined"
											color="error"
											size="small"
											onClick={() => handleDeleteDataset(dataset.id)}
											sx={{ flex: 1, ml: 1 }}
										>
											Удалить
										</Button>
									</>
								) : (
									 <Button
										 component={NavLink}
										 to={`/datasets/${dataset.id}`}
										 variant="contained"
										 color="primary"
										 size="small"
										 fullWidth
										 sx={{
											 py: 1,
											 borderRadius: '6px'
										 }}
									 >
										 Подробнее
									 </Button>
								 )}
							</CardActions>
						</Card>
					</Grid>
				))}

				{isAdmin && (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Card
							onClick={() => setNewDataset(true)}
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
								borderRadius: '12px',
								border: `2px dashed ${theme.palette.divider}`,
								transition: 'all 0.2s',
								'&:hover': {
									borderColor: theme.palette.primary.main,
									backgroundColor: theme.palette.action.hover
								}
							}}
						>
							<CardContent sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								textAlign: 'center'
							}}>
								<Avatar sx={{
									bgcolor: theme.palette.primary.light,
									width: 56,
									height: 56,
									mb: 2
								}}>
									<AddIcon fontSize="large" />
								</Avatar>
								<Typography variant="subtitle1" color="text.primary">
									Добавить новый датасет
								</Typography>
								<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
									Загрузите новый набор данных для обучения моделей
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				)}
			</Grid>

			<CreateNewDataset newDataset={newDataset} setNewDataset={setNewDataset} />
		</Box>
	);
};

export default Datasets;