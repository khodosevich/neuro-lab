import { Box, CircularProgress, Grid, Typography, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ModelsData } from '../types/type.ts';
import ModelCard from '../components/models/ModelCard.tsx';
import { AppDispatch, RootState } from '../store';
import { fetchModelsList } from '../store/slices/modelsSlice.ts';
import CreateNewModel from '../components/models/CreateNewModel.tsx';
import AddIcon from '@mui/icons-material/Add';

const Models = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { models, loading } = useSelector((state: RootState) => state.models);
	const isAdmin = useSelector((state: RootState) => state.user?.user?.role) === 'admin';
	const [newModel, setNewModel] = useState(false);

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	return (
		<Box sx={{ minHeight: '100%' }}>
			<Box className="container" sx={{ paddingBlock: 5 }}>
				<Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
					Список моделей
				</Typography>
				{
					loading
					? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress/>
					</Box>
					: <Grid container spacing={2} sx={{
						justifyContent: 'center',
					}}>
						{
							models.map((model: ModelsData) => (
								<Grid item key={model.id}>
									<ModelCard model={model}/>
								</Grid>
							))
						}

						{
							isAdmin &&
							<Grid item>
								<Card onClick={() => setNewModel(true)} sx={{
									width: 345,
									height: '100%',
									minHeight: '190px',
									display: 'flex',
									flexDirection: 'column',
									cursor: 'pointer',
								}}>
									<CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<AddIcon/>
									</CardContent>
								</Card>
							</Grid>
						}
					</Grid>
				}
			</Box>
			<CreateNewModel newModel={newModel} setNewModel={setNewModel}/>
		</Box>
	);
};

export default Models;