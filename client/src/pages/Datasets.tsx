import { Box, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
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

const Datasets = () => {
	const { datasets } = useSelector((state: RootState) => state.datasets);
	const dispatch = useDispatch();
	const isAdmin = useSelector((state: RootState) => state.user?.user?.role) === 'admin';

	useEffect(() => {
		const load = async () => {
			try {
				const response = await methods.datasets.getDatasets();
				dispatch(setDatasets(response.data));
			}
			catch {
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
			dispatch(showAlert({ isShowAlert: true, message: 'Датасет удален успешно', type: AlertType.SUCCESS }));

		}
		catch {
			dispatch(showAlert({ isShowAlert: true, message: 'Ошибка при удалении датасета', type: AlertType.ERROR }));
		}
	};

	return (
		<Box className="container" sx={{ paddingBlock: 5 }}>
			<Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
				Список датасетов
			</Typography>
			<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
				{datasets.map((dataset) => (
					<Grid item key={dataset.id}>
						{/*в диаграмме DatasetsCARD*/}
						<Card sx={{
							minWidth: 300, maxWidth: 350, height: '100%',
							display: 'flex', flexDirection: 'column',
						}}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									{dataset.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{dataset.description}
								</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'flex-end', flexGrow: 1, alignItems: 'end' }}>
								{
									isAdmin
									?
									<>
										<Button variant="contained" color="success" onClick={() => handleUpdateDataset(dataset.id)}>
											Обновить
										</Button>
										<Button variant="contained" color="secondary" onClick={() => handleDeleteDataset(dataset.id)}>
											Удалить
										</Button>
									</>
									:
									<NavLink to={`/datasets/${dataset.id}`}>
										<Button size="small" variant="contained" color="primary">
											Подробнее
										</Button>
									</NavLink>
								}
							</CardActions>
						</Card>
					</Grid>
				))}

				{
					isAdmin &&
					<Grid item>
						<Grid item>
							<Card onClick={() => setNewDataset(true)} sx={{
								minWidth: 300, maxWidth: 350,
								height: '100%', minHeight: '150px',
								display: 'flex',
								flexDirection: 'column',
								cursor: 'pointer',
							}}>
								<CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<AddIcon/>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				}
			</Grid>

			<CreateNewDataset newDataset={newDataset} setNewDataset={setNewDataset}/>
		</Box>
	);
};

export default Datasets;