import { Box, CircularProgress, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ModelsData } from '../types/type.ts';
import ModelCard from '../components/models/ModelCard.tsx';
import { AppDispatch, RootState } from '../store';
import { fetchModelsList } from '../store/slices/modelsSlice.ts';

const Models = () => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const { models, loading } = useSelector((state: RootState) => state.models);

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100%' }}>
			<Box className="container" sx={{ paddingBlock: 5 }}>

				{
					loading
					? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress/>
					</Box>
					: <Grid container spacing={2}>
						{
							models.map((model: ModelsData) => (
								<Grid item key={model.id}>
									<ModelCard model={model}/>
								</Grid>
							))
						}
					</Grid>

				}
			</Box>
		</Box>
	);
};

export default Models;