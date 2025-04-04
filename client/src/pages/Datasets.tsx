import { Box, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { methods } from '../api/methods.ts';
import { setDatasets } from '../store/slices/datasetsSlice.ts';

const Datasets = () => {
	const { datasets } = useSelector((state: RootState) => state.datasets);
	const dispatch = useDispatch();

	useEffect(() => {
		const load = async () => {
			try {
				const response = await methods.datasets.getDatasets();
				dispatch(setDatasets(response.data));
			}
			catch {
				console.log('Error getting datasets');
			}
		};

		load();
	}, []);

	return (
		<Box className="container" sx={{ paddingBlock: 5 }}>
			<Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
				Список датасетов
			</Typography>
			<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
				{datasets.map((dataset) => (
					<Grid item key={dataset.id}>
						{/*в диаграмме DatasetsCARD*/}
						<Card sx={{ minWidth: 300, maxWidth: 350, height: '100%' }}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									{dataset.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{dataset.description}
								</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'flex-end' }}>
								<NavLink to={`/datasets/${dataset.id}`}>
									<Button size="small" variant="contained" color="primary">
										Подробнее
									</Button>
								</NavLink>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Datasets;